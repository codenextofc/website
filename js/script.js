  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;

  window.addEventListener('wheel', (e) => {
    e.preventDefault(); 
    targetScroll += e.deltaY; 
  }, { passive: false });

  function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * 0.15; 
    window.scrollTo(0, currentScroll);
    requestAnimationFrame(smoothScroll);
  }

  smoothScroll();