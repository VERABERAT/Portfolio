#target photoshop

/* ============================================================
   CASE TEMPLATE — Photoshop ExtendScript (.jsx)
   Berat Erdoğan · marka başına Behance case + site kapağı üretir
   ------------------------------------------------------------
   KULLANIM
   1. Aşağıdaki CONFIG bloğunu doldur (marka adı, renk, modüller)
   2. Photoshop → File > Scripts > Browse… → bu dosyayı seç
   3. Açılan PSD'de gri kutular yer tutucu. Görselini kutunun
      üstüne sürükle, kutuyu gizle/sil.
   4. Behance için: File > Export > Export As > JPG, kalite 80
   5. Site kapağı için: ayrı açılan kapak PSD'sini 1200x1500
      olarak dışa aktar, repoda images/<slug>.jpg olarak kaydet

   NOT: Bu script test edilmeden yazıldı. İlk çalıştırmada boş bir
   Photoshop'ta dene. Hata alırsan hangi satırda olduğunu söyle,
   düzeltirim.
   ============================================================ */

// ============================================================
// CONFIG — her marka için burayı değiştir
// ============================================================
var CONFIG = {
  brand:    "D'S DAMAT",              // marka adı (kapakta büyük yazı)
  slug:     "ds-damat",               // dosya adı için: kucuk-harf-tire
  subtitle: "Reels & Editorial · 2026",
  accent:   "1B1B3A",                 // vurgu rengi, # olmadan
  ink:      "2B2B2B",                 // metin rengi
  paper:    "F3EFE6",                 // arka plan (sitenin cream'i)

  // Hangi modüller olsun? İstemediğini false yap.
  modules: {
    cover:      true,   // 1400x1050 kapak
    intro:      true,   // brief / rol metni
    fullBleed:  true,   // tam genişlik tek görsel
    twoUp:      true,   // yan yana 2 görsel
    threeUp:    true,   // yan yana 3 görsel
    reels:      true,   // 3 adet 9:16 dikey video karesi
    statement:  true,   // büyük alıntı / iddia
    credits:    true    // künye
  },

  makeSiteCover: true   // ayrıca 1200x1500 site kapağı PSD'si üret
};

// ============================================================
// SABİTLER
// ============================================================
var W = 1400;           // Behance içerik genişliği
var MARGIN = 100;       // kenar boşluğu
var GAP = 24;           // görseller arası boşluk
var COL = W - MARGIN * 2;

// ============================================================
// YARDIMCILAR
// ============================================================

function hexColor(hex) {
  var c = new SolidColor();
  c.rgb.hexValue = hex;
  return c;
}

/** Sitede kullanılan yazı tipini dene, yoksa sessizce varsayılana düş. */
function applyFont(textItem) {
  var candidates = [
    "ShantellSans-Bold",
    "ShantellSans-Regular",
    "ComicSansMS-Bold",
    "HelveticaNeue-Bold"
  ];
  for (var i = 0; i < candidates.length; i++) {
    try { textItem.font = candidates[i]; return; } catch (e) {}
  }
  // hiçbiri yoksa Photoshop varsayılanı kalır
}

/** Dolu dikdörtgen çizer — görsel yer tutucusu. */
function placeholder(doc, group, name, x, y, w, h, hex) {
  var layer = doc.artLayers.add();
  layer.name = name;
  doc.selection.select([
    [x, y], [x + w, y], [x + w, y + h], [x, y + h]
  ]);
  doc.selection.fill(hexColor(hex));
  doc.selection.deselect();
  layer.move(group, ElementPlacement.INSIDE);
  return layer;
}

/** Metin katmanı ekler. */
function textLayer(doc, group, name, content, x, y, size, hex, boxW) {
  var layer = doc.artLayers.add();
  layer.name = name;
  layer.kind = LayerKind.TEXT;
  var ti = layer.textItem;
  applyFont(ti);
  if (boxW) {
    ti.kind = TextType.PARAGRAPHTEXT;
    ti.width = boxW;
    ti.height = size * 6;
  }
  ti.contents = content;
  ti.size = size;
  ti.color = hexColor(hex);
  ti.position = [x, y];
  layer.move(group, ElementPlacement.INSIDE);
  return layer;
}

function newGroup(doc, name) {
  var g = doc.layerSets.add();
  g.name = name;
  return g;
}

/** Sol/sağ kenar ve sütun kılavuzları. */
function addGuides(doc, cols) {
  try {
    doc.guides.add(Direction.VERTICAL, MARGIN);
    doc.guides.add(Direction.VERTICAL, W - MARGIN);
    if (cols > 1) {
      var colW = (COL - GAP * (cols - 1)) / cols;
      for (var i = 1; i < cols; i++) {
        var x = MARGIN + colW * i + GAP * (i - 1);
        doc.guides.add(Direction.VERTICAL, x);
        doc.guides.add(Direction.VERTICAL, x + GAP);
      }
    }
  } catch (e) {}
}

// ============================================================
// YÜKSEKLİK HESABI — sadece açık modüller kadar tuval
// ============================================================
function computeHeight(m) {
  var h = 0;
  if (m.cover)     h += 1050 + 80;
  if (m.intro)     h += 420;
  if (m.fullBleed) h += Math.round(COL * 0.62) + 80;
  if (m.twoUp)     h += Math.round((COL - GAP) / 2 * 1.25) + 80;
  if (m.threeUp)   h += Math.round((COL - GAP * 2) / 3 * 1.25) + 80;
  if (m.reels)     h += Math.round((COL - GAP * 2) / 3 * (16 / 9)) + 140;
  if (m.statement) h += 380;
  if (m.credits)   h += 360;
  return Math.max(h, 1200);
}

// ============================================================
// ANA ÜRETİM
// ============================================================
function buildCase(cfg) {
  var m = cfg.modules;
  var H = computeHeight(m);

  var doc = app.documents.add(
    W, H, 72, cfg.slug + "-case",
    NewDocumentMode.RGB, DocumentFill.WHITE
  );

  // zemin
  var bg = newGroup(doc, "00 · ZEMIN");
  placeholder(doc, bg, "paper", 0, 0, W, H, cfg.paper);

  addGuides(doc, 3);

  var y = 0;

  // ---------- KAPAK ----------
  if (m.cover) {
    var g = newGroup(doc, "01 · KAPAK");
    placeholder(doc, g, "[GORSEL] kapak 1400x1050", 0, y, W, 1050, "D8D2C6");
    textLayer(doc, g, "marka", cfg.brand, MARGIN, y + 760, 92, cfg.paper);
    textLayer(doc, g, "altbaslik", cfg.subtitle, MARGIN, y + 880, 30, cfg.paper);
    y += 1050 + 80;
  }

  // ---------- BRIEF / ROL ----------
  if (m.intro) {
    var g2 = newGroup(doc, "02 · BRIEF");
    textLayer(doc, g2, "baslik", "brief", MARGIN, y, 40, cfg.accent);
    textLayer(doc, g2, "metin",
      "Markanın ihtiyacı neydi, ne istendi. 2-3 cümle.\n\n" +
      "ROL: Art Direction, AI Üretim, Post-Production\n" +
      "ARAÇLAR: Higgsfield, Kling, After Effects\n" +
      "YIL: 2026",
      MARGIN, y + 80, 24, cfg.ink, COL * 0.7);
    y += 420;
  }

  // ---------- TAM GENİŞLİK ----------
  if (m.fullBleed) {
    var g3 = newGroup(doc, "03 · TAM GENISLIK");
    var fh = Math.round(COL * 0.62);
    placeholder(doc, g3, "[GORSEL] tam genislik", MARGIN, y, COL, fh, "C9C2B4");
    y += fh + 80;
  }

  // ---------- 2'Lİ ----------
  if (m.twoUp) {
    var g4 = newGroup(doc, "04 · IKILI");
    var w2 = Math.round((COL - GAP) / 2);
    var h2 = Math.round(w2 * 1.25);
    placeholder(doc, g4, "[GORSEL] sol",  MARGIN, y, w2, h2, "C9C2B4");
    placeholder(doc, g4, "[GORSEL] sag",  MARGIN + w2 + GAP, y, w2, h2, "C9C2B4");
    y += h2 + 80;
  }

  // ---------- 3'LÜ ----------
  if (m.threeUp) {
    var g5 = newGroup(doc, "05 · UCLU");
    var w3 = Math.round((COL - GAP * 2) / 3);
    var h3 = Math.round(w3 * 1.25);
    for (var i = 0; i < 3; i++) {
      placeholder(doc, g5, "[GORSEL] " + (i + 1),
        MARGIN + (w3 + GAP) * i, y, w3, h3, "C9C2B4");
    }
    y += h3 + 80;
  }

  // ---------- REELS 9:16 ----------
  if (m.reels) {
    var g6 = newGroup(doc, "06 · REELS");
    textLayer(doc, g6, "baslik", "reels", MARGIN, y, 40, cfg.accent);
    var wr = Math.round((COL - GAP * 2) / 3);
    var hr = Math.round(wr * (16 / 9));
    for (var j = 0; j < 3; j++) {
      placeholder(doc, g6, "[VIDEO KARESI] reel " + (j + 1),
        MARGIN + (wr + GAP) * j, y + 60, wr, hr, "B8B1A3");
    }
    y += hr + 140;
  }

  // ---------- İDDİA ----------
  if (m.statement) {
    var g7 = newGroup(doc, "07 · IDDIA");
    placeholder(doc, g7, "zemin", 0, y, W, 380, cfg.accent);
    textLayer(doc, g7, "cumle",
      "İşin tek cümlelik özü.\nÜrün sabit kalır, dünya değişir.",
      MARGIN, y + 130, 52, cfg.paper, COL * 0.8);
    y += 380;
  }

  // ---------- KÜNYE ----------
  if (m.credits) {
    var g8 = newGroup(doc, "08 · KUNYE");
    textLayer(doc, g8, "baslik", "künye", MARGIN, y + 60, 32, cfg.accent);
    textLayer(doc, g8, "metin",
      "Ajans: Altavia Dekatlon\n" +
      "Art Direction: Berat Erdoğan\n" +
      "Yıl: 2026\n\n" +
      "beraterdogan.studio",
      MARGIN, y + 130, 22, cfg.ink, COL * 0.6);
  }

  return doc;
}

// ============================================================
// SİTE KAPAĞI — index kartı için 1200x1500 (4:5)
// ============================================================
function buildSiteCover(cfg) {
  var doc = app.documents.add(
    1200, 1500, 72, cfg.slug + "-cover",
    NewDocumentMode.RGB, DocumentFill.WHITE
  );
  var g = newGroup(doc, "KAPAK");
  placeholder(doc, g, "zemin", 0, 0, 1200, 1500, cfg.paper);
  placeholder(doc, g, "[GORSEL] buraya", 0, 0, 1200, 1500, "D8D2C6");
  textLayer(doc, g, "marka", cfg.brand.toLowerCase(), 80, 1280, 76, cfg.paper);
  try {
    doc.guides.add(Direction.HORIZONTAL, 1200); // alt üçte bir
    doc.guides.add(Direction.VERTICAL, 80);
    doc.guides.add(Direction.VERTICAL, 1120);
  } catch (e) {}
  return doc;
}

// ============================================================
// ÇALIŞTIR
// ============================================================
(function main() {
  var savedUnits = app.preferences.rulerUnits;
  app.preferences.rulerUnits = Units.PIXELS;

  try {
    buildCase(CONFIG);
    if (CONFIG.makeSiteCover) buildSiteCover(CONFIG);
    alert(
      CONFIG.brand + " şablonu hazır.\n\n" +
      "Gri kutular yer tutucu — görselini üstüne sürükle, kutuyu sil.\n" +
      "Behance: Export As > JPG, kalite 80.\n" +
      "Site kapağı: images/" + CONFIG.slug + ".jpg olarak kaydet."
    );
  } catch (e) {
    alert("Hata (satır " + e.line + "): " + e.message);
  } finally {
    app.preferences.rulerUnits = savedUnits;
  }
})();
