let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
let isScrollingWithWheel = false;

window.addEventListener('wheel', (e) => {
  if (!e.ctrlKey) {
    e.preventDefault(); // bloqueia apenas o scroll da roda do mouse
    targetScroll += e.deltaY;
    isScrollingWithWheel = true;
  }
}, { passive: false });

function smoothScroll() {
  if (isScrollingWithWheel) {
    currentScroll += (targetScroll - currentScroll) * 0.15;
    window.scrollTo(0, currentScroll);
  } else {
    // Se o usuário estiver usando outro método de scroll, atualiza os valores
    currentScroll = window.scrollY;
    targetScroll = window.scrollY;
  }

  requestAnimationFrame(smoothScroll);
}

smoothScroll();

function updateProgressBar(){
  const{scrollTop, scrollHeight} = document.documentElement;
  const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
  document.querySelector('#progress-bar').style.setProperty('--progress', scrollPercent);
}

document.addEventListener('scroll', updateProgressBar);