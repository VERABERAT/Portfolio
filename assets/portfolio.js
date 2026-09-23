'use strict';
const translations = {
  "tr": {
    "skip": "İşlere geç",
    "work": "İşler",
    "about": "Hakkımda",
    "contact": "İletişim",
    "edition": "PORTFOLYO",
    "intro": "Tasarımcı & Art Director",
    "selected": "Uygulamalar & görsel denemeler",
    "archive": "Kişisel projeler",
    "drag": "Sürükle",
    "note": "Kapak görselleri yapay zekâ ile üretildi.",
    "brandWork": "Marka işleri",
    "brandTitle": "Çalıştığım<br> markalar",
    "independentLink": "Kişisel projeler ↓",
    "apps": "Kendi uygulamam",
    "statement": "Tasarımcı &<br> Art Director",
    "bio": "Altavia’da Junior Art Director olarak çalışıyorum. Görsel tasarım, yapay zekâ ile görsel üretimi ve video işleri yapıyorum.",
    "bio2": "Kolpa AI ve Lumio, tasarlayıp geliştirdiğim kendi uygulamalarım.",
    "cv": "Özgeçmişi indir ↗",
    "experience": "Deneyim",
    "visual": "Görsel Tasarımcı",
    "digital": "Dijital Tasarımcı",
    "brand": "Freelance Marka Tasarımcısı",
    "brands": "Diğer marka işleri: Toshiba, Pek Food, Odeabank.",
    "practice": "Çalışma alanları",
    "art": "Sanat yönetimi",
    "ai": "AI görsel üretimi",
    "motion": "Hareketli grafik & kurgu",
    "products": "Uygulama tasarımı",
    "visualStudy": "Görsel deneme",
    "p1": "Kampanya ve sosyal medya tasarımı.",
    "p2": "Yapay zekâ ile görsel ve video üretimi.",
    "p3": "Hareketli grafik ve video kurgu.",
    "p4": "Arayüz tasarımı ve SwiftUI geliştirme.",
    "hello": "Bana yaz",
    "cvShort": "Özgeçmiş ↓",
    "top": "Başa dön ↑",
    "close": "Kapat ×",
    "next": "Sonraki proje →",
    "roleLabel": "Rolüm",
    "focusLabel": "Kapsam"
  },
  "en": {
    "skip": "Skip to work",
    "work": "Work",
    "about": "About",
    "contact": "Contact",
    "edition": "PORTFOLIO",
    "intro": "Designer & Art Director",
    "selected": "Apps & visual studies",
    "archive": "Personal projects",
    "drag": "Drag",
    "note": "Cover images were created with AI.",
    "brandWork": "Brand work",
    "brandTitle": "Brands I’ve<br> worked with",
    "independentLink": "Personal projects ↓",
    "apps": "My own app",
    "statement": "Designer &<br> Art Director",
    "bio": "I work as a Junior Art Director at Altavia. My work includes visual design, AI-generated imagery and video.",
    "bio2": "Kolpa AI and Lumio are my own apps, which I design and develop.",
    "cv": "Download résumé ↗",
    "experience": "Experience",
    "visual": "Visual Designer",
    "digital": "Digital Designer",
    "brand": "Freelance Brand Designer",
    "brands": "Other brand work: Toshiba, Pek Food, Odeabank.",
    "practice": "What I do",
    "art": "Art direction",
    "ai": "AI image creation",
    "motion": "Motion & editing",
    "products": "App design",
    "visualStudy": "Visual study",
    "p1": "Campaign and social media design.",
    "p2": "Images and video created with AI.",
    "p3": "Motion graphics and video editing.",
    "p4": "Interface design and SwiftUI development.",
    "hello": "Get in touch",
    "cvShort": "Résumé ↓",
    "top": "Back to top ↑",
    "close": "Close ×",
    "next": "Next project →",
    "roleLabel": "My role",
    "focusLabel": "Scope"
  }
};
const projects = [
  {
    "title": "Kolpa AI",
    "image": "assets/vinyl/kolpa-cover.webp",
    "tr": {
      "type": "Kendi uygulamam · 2026",
      "summary": "Yapay zekâ destekli mesaj analizi.",
      "description": "Yapay zekâ destekli mesaj analiz uygulamam. Arayüzünü tasarladım, uygulamayı geliştirdim ve lansman görsellerini hazırladım.",
      "role": "Tasarım & geliştirme",
      "focus": "UX/UI, uygulama geliştirme, lansman görselleri"
    },
    "en": {
      "type": "My own app · 2026",
      "summary": "AI-powered message analysis.",
      "description": "My AI-powered message analysis app. I designed the interface, developed the app and created its launch visuals.",
      "role": "Design & development",
      "focus": "UX/UI, app development, launch visuals"
    }
  },
  {
    "title": "Lumio",
    "image": "assets/vinyl/lumio-cover.webp",
    "tr": {
      "type": "Kendi uygulamam · 2026",
      "summary": "Yapay zekâ destekli günlük uygulaması.",
      "description": "Yapay zekâ destekli günlük uygulamam. Arayüz tasarımı, SwiftUI geliştirmesi ve lansman görselleri üzerinde çalıştım.",
      "role": "Tasarım & geliştirme",
      "focus": "UX/UI, SwiftUI, lansman görselleri"
    },
    "en": {
      "type": "My own app · 2026",
      "summary": "An AI journaling app.",
      "description": "My AI journaling app. I worked on the interface design, SwiftUI development and launch visuals.",
      "role": "Design & development",
      "focus": "UX/UI, SwiftUI, launch visuals"
    }
  },
  {
    "title": "Form & Motion",
    "image": "assets/vinyl/form-motion-cover.webp",
    "tr": {
      "type": "Görsel deneme · Konsept",
      "summary": "Yapay zekâ ile görsel denemeler.",
      "description": "Bu portfolyo için yapay zekâ ile hazırlanmış kişisel bir görsel deneme. Işık ve yüzey dokularına odaklanıyor.",
      "role": "AI ile görsel üretimi",
      "focus": "Işık, doku, kompozisyon"
    },
    "en": {
      "type": "Visual study · Concept",
      "summary": "Visual studies made with AI.",
      "description": "A personal visual study created with AI for this portfolio, focusing on light and surface textures.",
      "role": "AI image creation",
      "focus": "Light, texture, composition"
    }
  }
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const gs = window.gsap;
const scrollPlugin = window.ScrollTrigger;
const flip = window.Flip;
const splitPlugin = window.SplitText;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine) and (hover: hover)');
const canAnimate = () => !!gs && !reduceMotion.matches;
if (gs) {
  [scrollPlugin, flip, splitPlugin, window.CustomEase].filter(Boolean).forEach(p => gs.registerPlugin(p));
  window.CustomEase?.create('energy','.32,.72,0,1');
  document.documentElement.dataset.motionEngine = 'gsap';
}
const ease = window.CustomEase ? 'energy' : 'power3.out';
const stage = $('.project-stage');
const cards = $$('.project-card');
const dialog = $('#project-detail');
const pointer = $('.pointer');
let current = 0, language = 'tr', lenis, busy = false, returnFocus, drag, blockClickUntil = 0;
let galleryVisible = false, userPaused = false, motionReady = false, textScope, textSplits = [];
const rotations = gs ? cards.map(card => gs.to(card.querySelector('.record-platter'), {rotation:'+=360',duration:28,repeat:-1,ease:'none',paused:true})) : [];
try {
  const saved = localStorage.getItem('portfolio-language');
  if (saved === 'tr' || saved === 'en') language = saved;
} catch {}

function syncRotation() {
  const running = canAnimate() && galleryVisible && !userPaused && !document.hidden && !dialog.open && !drag?.active;
  rotations.forEach((tween,i) => running && i === current ? tween.play() : tween.pause());
  const button = $('.motion-toggle');
  button.disabled = reduceMotion.matches || !gs;
  button.setAttribute('aria-pressed',String(userPaused));
  button.textContent = userPaused ? '▷' : 'Ⅱ';
  const label = reduceMotion.matches
    ? (language === 'tr' ? 'Azaltılmış hareket açık' : 'Reduced motion is on')
    : (userPaused ? (language === 'tr' ? 'Plak hareketini başlat' : 'Resume record motion') : (language === 'tr' ? 'Plak hareketini durdur' : 'Pause record motion'));
  button.setAttribute('aria-label',label);
  button.title = label;
}
$('.motion-toggle').addEventListener('click',()=>{userPaused=!userPaused;syncRotation();});
new IntersectionObserver(entries => {galleryVisible=entries[0].isIntersecting;syncRotation();},{threshold:.05}).observe(stage);
document.addEventListener('visibilitychange',syncRotation);
function offsetFor(index) {
  let offset=index-current;
  if(offset>1)offset-=cards.length;
  if(offset< -1)offset+=cards.length;
  return offset;
}
function layoutCards(animate=true, displacement=0) {
  const gap=stage.clientWidth*(innerWidth<=600 ? .96 : .64);
  cards.forEach((card,index)=>{
    const offset=offsetFor(index), active=offset===0;
    const vars={xPercent:-50,x:offset*gap+displacement,scale:active?1:.64,
      rotation:offset*9,rotationY:innerWidth<=600?0:offset*-17,zIndex:active?3:1,
      duration:animate&&canAnimate()?.95:0,ease,overwrite:true};
    card.tabIndex=active?0:-1;
    card.setAttribute('aria-current',String(active));
    if(gs) {
      gs.to(card,vars);
      gs.to(card.querySelector('.sleeve'),{xPercent:active?(innerWidth<=600?0:-8):8,rotation:active?(innerWidth<=600?-5:-7):offset*4,
        duration:animate&&canAnimate()?.95:0,ease,overwrite:true});
    } else card.style.transform='translateX(calc(-50% + '+vars.x+'px)) scale('+vars.scale+')';
  });
  if(gs)gs.to('.gallery-track span',{xPercent:current*100,duration:animate&&canAnimate()?.7:0,ease,overwrite:true});
  else $('.gallery-track span').style.transform='translateX('+current*100+'%)';
}
function updateProject(animate=false) {
  const p=projects[current], data=p[language];
  $('.project-type').textContent=data.type;
  $('.project-open h3').textContent=p.title;
  $('.project-summary').textContent=data.summary;
  $('.project-number').textContent='0'+(current+1)+' / 03';
  $('.project-open').setAttribute('aria-label',p.title+(language==='tr'?' projesini aç':' — open project'));
  $$('[data-track]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.track)===current)));
  if(animate&&canAnimate())gs.fromTo('.active-project > *',{y:16,opacity:0},{y:0,opacity:1,duration:.6,stagger:.045,ease,overwrite:true});
}
function selectProject(index,animate=true) {
  current=(index+projects.length)%projects.length;
  layoutCards(animate);updateProject(animate);syncRotation();
}
function fillDetail() {
  const p=projects[current],data=p[language];
  $('.detail-image .sleeve-art').src=p.image;
  $('.detail-image .sleeve-art').alt=p.title+(language==='tr'?' — plak kapağı':' — record cover');
  $('.detail-vinyl .record-label img').src=p.image;
  $('.detail-image .sleeve-top strong').textContent=p.title;
  $('.detail-image .sleeve-top > span').textContent='BE—00'+(current+1);
  $('.detail-image .sleeve-bottom > span').textContent=current<2?translations[language].apps:translations[language].visualStudy;
  $('#detail-title').textContent=p.title;
  $('.detail-meta').textContent=data.type;
  $('.detail-description').textContent=data.description;
  $('.detail-role').textContent=data.role;
  $('.detail-focus').textContent=data.focus;
}
function clearTextMotion() {
  textScope?.revert();textScope=undefined;
  textSplits.forEach(split=>split.revert());textSplits=[];
}
function setupTextMotion() {
  clearTextMotion();
  if(!motionReady||!canAnimate()||!splitPlugin||!scrollPlugin)return;
  textScope=gs.context(()=>{
    $$('.statement, .contact h2, .gallery-header h2, .brand-intro h2, .about-copy p').forEach(element=>{
      const isBody=element.tagName==='P';
      const split=splitPlugin.create(element,{type:'lines,words',mask:'lines',linesClass:'split-line',autoSplit:true,
        onSplit:self=>gs.from(isBody?self.lines:self.words,{
          yPercent:115,rotation:0,duration:isBody?.9:1,stagger:isBody?.09:.06,ease,
          scrollTrigger:{trigger:element,start:'top 92%',once:true}
        })});
      textSplits.push(split);
    });
  });
}
function setLanguage(next) {
  clearTextMotion();language=next;document.documentElement.lang=next;
  $$('[data-t]').forEach(el=>{if(translations[next][el.dataset.t])el.innerHTML=translations[next][el.dataset.t];});
  $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===next)));
  $('.prev').setAttribute('aria-label',next==='tr'?'Önceki proje':'Previous project');
  $('.next').setAttribute('aria-label',next==='tr'?'Sonraki proje':'Next project');
  $('.round-action').setAttribute('aria-label',next==='tr'?'İşleri gör':'View work');
  $('nav').setAttribute('aria-label',next==='tr'?'Ana menü':'Main navigation');
  $('.gallery').setAttribute('aria-label',next==='tr'?'Kişisel projeler':'Personal projects');
  $('.brand-list').setAttribute('aria-label',next==='tr'?'Markalar':'Brands');
  stage.setAttribute('aria-label',next==='tr'?'Proje galerisi. Ok tuşlarıyla gezin, Enter ile açın.':'Project gallery. Use arrow keys to browse and Enter to open.');
  $('.record-nav').setAttribute('aria-label',next==='tr'?'Proje seç':'Select a project');
  $$('[data-track]').forEach((b,i)=>b.setAttribute('aria-label',projects[i].title+(next==='tr'?' plağını seç':' — select record')));
  cards.forEach((card,i)=>card.querySelector('.sleeve-art').alt=projects[i].title+(next==='tr'?' — plak kapağı':' — record cover'));
  $$('.record-texture').forEach(img=>img.alt=next==='tr'?'Siyah vinil plak':'Black vinyl record');
  const labels=next==='tr'?['01 / PROFİL','02 / DENEYİM','03 / ÜRETİM','04 / İLETİŞİM']:['01 / PROFILE','02 / EXPERIENCE','03 / PRACTICE','04 / CONTACT'];
  $$('.section .section-heading > span:last-child').forEach((el,i)=>el.textContent=labels[i]);
  $('.detail-nav > span').textContent='BERAT ERDOĞAN / '+(next==='tr'?'KİŞİSEL PROJELER':'PERSONAL PROJECTS');
  updateProject();if(dialog.open)fillDetail();syncRotation();
  try{localStorage.setItem('portfolio-language',next);}catch{}
  setupTextMotion();
  if(scrollPlugin)requestAnimationFrame(()=>scrollPlugin.refresh());
}
$$('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
$('.prev').addEventListener('click',()=>selectProject(current-1));
$('.next').addEventListener('click',()=>selectProject(current+1));
$$('[data-track]').forEach(b=>b.addEventListener('click',()=>selectProject(Number(b.dataset.track))));
stage.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
    event.preventDefault();selectProject(current+(event.key==='ArrowRight'?1:-1));
    if(event.target!==stage)cards[current].focus({preventScroll:true});
  }else if(event.key==='Enter'&&event.target===stage)openDetail();
});
cards.forEach((card,index)=>{
  card.addEventListener('click',()=>{
    if(performance.now()<blockClickUntil)return;
    if(index!==current)selectProject(index);else openDetail();
  });
  card.addEventListener('pointerenter',()=>{
    if(index===current&&canAnimate()&&finePointer.matches&&!drag?.active)
      gs.to(card.querySelector('.sleeve'),{xPercent:-17,rotation:-10,duration:.85,ease,overwrite:true});
  });
  card.addEventListener('pointerleave',()=>{if(!drag?.active)layoutCards();});
});
$('.project-open').addEventListener('click',openDetail);
stage.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  drag={id:event.pointerId,x:event.clientX,y:event.clientY,delta:0,active:false,frame:0};
});
stage.addEventListener('pointermove',event=>{
  if(!drag||event.pointerId!==drag.id)return;
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  if(!drag.active&&Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){drag=null;return;}
  if(!drag.active&&Math.abs(dx)>9){
    drag.active=true;stage.setPointerCapture(event.pointerId);stage.classList.add('dragging');
    blockClickUntil=performance.now()+500;syncRotation();
  }
  if(!drag.active)return;
  drag.delta=dx;if(event.cancelable)event.preventDefault();
  if(!drag.frame)drag.frame=requestAnimationFrame(()=>{
    if(drag){drag.frame=0;layoutCards(false,drag.delta*.85);}
  });
});
function endDrag(event) {
  if(!drag||event.pointerId!==drag.id)return;
  const finished=drag;cancelAnimationFrame(finished.frame);drag=null;stage.classList.remove('dragging');
  if(stage.hasPointerCapture(event.pointerId))stage.releasePointerCapture(event.pointerId);
  if(!finished.active)return;
  blockClickUntil=performance.now()+400;
  if(event.type!=='pointercancel'&&Math.abs(finished.delta)>Math.min(70,stage.clientWidth*.13))
    selectProject(current+(finished.delta<0?1:-1));
  else {layoutCards();syncRotation();}
}
stage.addEventListener('pointerup',endDrag);
stage.addEventListener('pointercancel',endDrag);
let wheelLock=0;
stage.addEventListener('wheel',event=>{
  if(Math.abs(event.deltaX)<Math.abs(event.deltaY)||Math.abs(event.deltaX)<10)return;
  event.preventDefault();if(performance.now()<wheelLock)return;
  wheelLock=performance.now()+750;selectProject(current+(event.deltaX>0?1:-1));
},{passive:false});
new ResizeObserver(()=>layoutCards(false)).observe(stage);

function cloneSleeve(source) {
  const rect=source.getBoundingClientRect(),clone=source.cloneNode(true);
  clone.removeAttribute('style');clone.className='sleeve flight';clone.setAttribute('aria-hidden','true');
  Object.assign(clone.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',padding:getComputedStyle(source).padding,visibility:'visible'});
  return clone;
}
function flySleeve(clone,destination,duration) {
  return new Promise(resolve=>{
    const finish=()=>{clone.remove();resolve();};
    if(!canAnimate()||!flip){finish();return;}
    try{flip.fit(clone,destination,{duration,ease,scale:false,onComplete:finish,onInterrupt:finish});}
    catch{finish();}
  });
}
async function openDetail() {
  if(busy||dialog.open)return;
  busy=true;returnFocus=document.activeElement;
  const clone=cloneSleeve(cards[current].querySelector('.sleeve'));
  fillDetail();lenis?.stop();document.body.style.overflow='hidden';
  dialog.showModal();dialog.scrollTop=0;dialog.append(clone);syncRotation();
  const destination=$('.detail-image');
  destination.style.visibility='hidden';$('.detail-close').focus({preventScroll:true});
  if(canAnimate()){
    gs.fromTo('.detail-copy > *',{y:25,opacity:0},{y:0,opacity:1,duration:.8,stagger:.055,delay:.2,ease,overwrite:true});
    gs.fromTo('.detail-vinyl',{rotation:-60,scale:.8},{rotation:0,scale:1,duration:1.15,ease});
  }
  await flySleeve(clone,destination,.95);destination.style.visibility='';busy=false;
}
async function closeDetail() {
  if(!dialog.open||busy)return;
  busy=true;const clone=cloneSleeve($('.detail-image'));
  dialog.close();document.body.style.overflow='';document.body.append(clone);
  const target=cards[current].querySelector('.sleeve');target.style.visibility='hidden';
  await flySleeve(clone,target,.8);target.style.visibility='';
  lenis?.start();returnFocus?.focus({preventScroll:true});busy=false;syncRotation();
}
$('.detail-close').addEventListener('click',closeDetail);
dialog.addEventListener('cancel',event=>{event.preventDefault();closeDetail();});
$('.detail-next').addEventListener('click',async()=>{
  if(busy)return;busy=true;
  if(canAnimate())await gs.to('.detail-copy, .detail-art',{opacity:0,y:-15,duration:.2});
  selectProject(current+1,false);fillDetail();dialog.scrollTop=0;
  if(canAnimate())await gs.fromTo('.detail-copy, .detail-art',{opacity:0,y:20},{opacity:1,y:0,duration:.65,stagger:.08,ease});
  else if(gs)gs.set('.detail-copy, .detail-art',{opacity:1,y:0});
  busy=false;
});

setLanguage(language);selectProject(0,false);
document.fonts.ready.then(()=>{
  motionReady=true;
  if(!gs||!scrollPlugin)return;
  const motionContext=gs.matchMedia();
  motionContext.add('(prefers-reduced-motion: no-preference)',()=>{
    const heroSplits=[];
    const timeline=gs.timeline({defaults:{ease}});
    if(splitPlugin){
      $$('.hero-word').forEach((el,index)=>{
        const split=splitPlugin.create(el,{type:'chars',charsClass:'hero-char'});
        heroSplits.push(split);
        timeline.from(split.chars,{yPercent:125,rotation:5,duration:1.1,stagger:.035},index*.16);
      });
    }else timeline.from('.name-line > span',{yPercent:120,duration:1.15,stagger:.1},.05);
    timeline.from('.nav, .edition',{y:-12,opacity:0,duration:.7,stagger:.08},.05)
      .from('.intro-bottom > *',{y:25,opacity:0,duration:.75,stagger:.06},.6);
    gs.utils.toArray('.reveal').forEach(element=>gs.from(element,{y:35,opacity:0,duration:.8,ease,
      scrollTrigger:{trigger:element,start:'top 93%',once:true}}));
    gs.fromTo('.reading-progress',{scaleX:0},{scaleX:1,ease:'none',
      scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:true}});
    gs.from('.record-set',{y:100,rotation:12,scale:.9,duration:1.2,stagger:.08,ease,
      scrollTrigger:{trigger:stage,start:'top 95%',once:true}});
    gs.fromTo('.intro h1',{x:0},{xPercent:-2,ease:'none',
      scrollTrigger:{trigger:'.intro',start:'top top',end:'bottom top',scrub:1}});
    setupTextMotion();
    let tick;
    if(window.Lenis){
      lenis=new window.Lenis({lerp:.1,smoothWheel:true,syncTouch:false,anchors:true});
      lenis.on('scroll',scrollPlugin.update);tick=time=>lenis?.raf(time*1000);
      gs.ticker.add(tick);gs.ticker.lagSmoothing(0);
      document.documentElement.dataset.smoothScroll='lenis';
    }
    syncRotation();
    return()=>{
      clearTextMotion();heroSplits.forEach(s=>s.revert());
      if(tick)gs.ticker.remove(tick);lenis?.destroy();lenis=undefined;
      delete document.documentElement.dataset.smoothScroll;syncRotation();
    };
  });
  scrollPlugin.refresh();
});
if(gs){
  const px=gs.quickTo(pointer,'x',{duration:.24,ease:'power3'});
  const py=gs.quickTo(pointer,'y',{duration:.24,ease:'power3'});
  let cursorFrame=0,mouse;
  document.addEventListener('pointermove',event=>{
    if(!finePointer.matches||!canAnimate()||event.pointerType==='touch')return;
    mouse={x:event.clientX,y:event.clientY,target:event.target};
    if(cursorFrame)return;
    cursorFrame=requestAnimationFrame(()=>{
      cursorFrame=0;
      pointer.classList.add('ready');pointer.classList.toggle('hidden',dialog.open);
      const onRecord=!!mouse.target.closest('.project-stage');
      pointer.classList.toggle('over',onRecord||!!mouse.target.closest('a,button'));
      pointer.classList.toggle('drag-cursor',onRecord);
      pointer.querySelector('span').textContent=onRecord?(language==='tr'?'SÜRÜKLE':'DRAG'):'↗';
      px(mouse.x);py(mouse.y);
    });
  },{passive:true});
  document.addEventListener('pointerleave',()=>pointer.classList.add('hidden'));
  $$('.round-action, .contact-headline').forEach(link=>{
    const target=link.matches('.contact-headline')?link.querySelector('.contact-arrow'):link;
    const mx=gs.quickTo(target,'x',{duration:.5,ease:'power3'});
    const my=gs.quickTo(target,'y',{duration:.5,ease:'power3'});
    let frame=0,position;
    link.addEventListener('pointermove',event=>{
      if(!finePointer.matches||!canAnimate())return;
      position={x:event.clientX,y:event.clientY};if(frame)return;
      frame=requestAnimationFrame(()=>{frame=0;const rect=link.getBoundingClientRect();
        mx((position.x-rect.left-rect.width/2)*.08);my((position.y-rect.top-rect.height/2)*.08);});
    });
    link.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;mx(0);my(0);});
  });
}
reduceMotion.addEventListener('change',()=>{
  pointer.classList.remove('ready');
  if(gs)gs.set('.detail-copy, .detail-art',{opacity:1,y:0});
  layoutCards(false);syncRotation();
});
