/* Your JS here. */
var nav = document.getElementById('navbar');
var prog = document.getElementById('progress');
var links = [].slice.call(document.querySelectorAll('#menu a'));
var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });

function markActive(){
  var nr = nav.getBoundingClientRect();
  var y = nr.bottom + 1;
  var i = secs.length - 1;
  for (var k=0; k<secs.length; k++){
    var r = secs[k].getBoundingClientRect();
    if (r.top <= y && r.bottom > y){ i = k; break; }
  }
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1)) i = secs.length - 1;
  links.forEach(function(a,idx){ a.classList.toggle('active', idx===i); });
}

function onScroll(){
  var t = window.scrollY || document.documentElement.scrollTop || 0;
  var h = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
  var p = h>0 ? (t/h)*100 : 0;
  prog.style.width = p + '%';

  if (t < 10) nav.classList.add('at-top'); else nav.classList.remove('at-top');
  if (t > 60) nav.classList.add('shrink'); else nav.classList.remove('shrink');

  markActive();
}

var slides = document.getElementById('slides');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var idx = 0;
var total = slides ? slides.children.length : 0;

function go(n){
  if (!slides) return;
  idx = (n + total) % total;
  slides.style.transform = 'translateX(' + (-idx*100) + '%)';
}

if (prev) prev.addEventListener('click', function(){ go(idx-1); });
if (next) next.addEventListener('click', function(){ go(idx+1); });

var openBtn = document.getElementById('openModal');
var closeBtn = document.getElementById('closeModal');
var back = document.getElementById('backdrop');

function openM(){ document.body.classList.add('modal-open'); }
function closeM(){ document.body.classList.remove('modal-open'); }

if (openBtn) openBtn.addEventListener('click', openM);
if (closeBtn) closeBtn.addEventListener('click', closeM);
if (back) back.addEventListener('click', function(e){ if(e.target===back) closeM(); });

var obs = new IntersectionObserver(function(es){
  for (var i=0;i<es.length;i++){ if (es[i].isIntersecting) es[i].target.classList.add('in'); }
},{threshold:0.2});

[].forEach.call(document.querySelectorAll('[data-animate]'), function(x){ obs.observe(x); });

var yEl = document.getElementById('year');
if (yEl) yEl.textContent = (new Date()).getFullYear();

onScroll();
window.addEventListener('scroll', onScroll, { passive:true });