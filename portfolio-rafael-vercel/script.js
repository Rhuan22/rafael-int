(() => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;
  addEventListener('pointermove', e => { mx=e.clientX; my=e.clientY; });
  function cursorLoop(){
    cx += (mx-cx)*.18; cy += (my-cy)*.18;
    cursor.style.left = cx+'px'; cursor.style.top = cy+'px';
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  document.querySelectorAll('a,.work-image,.frame,.button').forEach(el=>{
    el.addEventListener('mouseenter',()=>cursor.classList.add('big'));
    el.addEventListener('mouseleave',()=>cursor.classList.remove('big'));
  });

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in');
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // staggered reveal inside each project
  document.querySelectorAll('.project').forEach(project=>{
    project.querySelectorAll('.work-image,.project-title,.brand-copy,.event-copy').forEach((el,i)=>{
      el.style.transitionDelay = Math.min(i*70,350)+'ms';
      el.classList.add('reveal');
      io.observe(el);
    });
  });

  // tiny magnetic interaction
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('pointermove', e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.12;
      const y=(e.clientY-r.top-r.height/2)*.12;
      el.style.transform=`translate(${x}px,${y}px)`;
    });
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });

  // Image tilt: intentionally subtle and angular, not a template-like card effect.
  document.querySelectorAll('.work-image').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(700px) rotateX(${y*-3}deg) rotateY(${x*3}deg)`;
    });
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });
})();

// Touch devices: images stay in their natural color state.
if (!matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.work-image img, .frame img, .about-photo img').forEach(img => {
    img.style.filter = 'none';
  });
}
