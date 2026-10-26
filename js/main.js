(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  function close(){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Open menu');}
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  // reveal
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add('in')});
  // lightbox
  var lb=document.getElementById('lb');
  document.querySelectorAll('.g').forEach(function(g){g.addEventListener('click',function(){
    var img=lb.querySelector('img');img.src=g.dataset.full;img.alt=g.querySelector('img').alt;
    if(lb.showModal)lb.showModal();else window.open(g.dataset.full,'_blank','noopener');});});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb__x'))lb.close()});
  // vimeo facade
  document.querySelectorAll('[data-vimeo]').forEach(function(f){f.querySelector('button').addEventListener('click',function(){
    f.innerHTML='<iframe src="https://player.vimeo.com/video/'+f.dataset.vimeo+'?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="An Intro to Fibercraft"></iframe>';});});
  // form
  var form=document.getElementById('quote'),msg=form.querySelector('.form__msg');
  form.addEventListener('submit',function(e){
    e.preventDefault();var bad=null;
    form.querySelectorAll('[required]').forEach(function(i){var ok=i.checkValidity()&&i.value.trim();i.classList.toggle('bad',!ok);if(!ok&&!bad)bad=i;});
    if(bad){msg.textContent='Please fill in the highlighted fields.';bad.focus();return;}
    if(form.action.indexOf('YOUR_FORM_ID')>-1){ // not connected yet: fall back to email
      var d=new FormData(form),body='';d.forEach(function(v,k){if(k[0]!=='_')body+=k+': '+v+'\n'});
      location.href='mailto:info@westwindows.on.ca?subject='+encodeURIComponent('Free estimate request')+'&body='+encodeURIComponent(body);
      msg.textContent='Opening your email app… or call us at 905 335 3751.';return;}
    msg.textContent='Sending…';
    fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}).then(function(r){
      if(r.ok){form.reset();msg.textContent='Thank you! We will be in touch shortly.';}else throw 0;
    }).catch(function(){msg.textContent='Sorry, something went wrong. Please call 905 335 3751.';});
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
