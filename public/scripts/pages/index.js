const scrollProgress = document.getElementById("scroll-progress");

if (scrollProgress) {

  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;

  window.addEventListener("scroll", () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
  });
}

const heroBoards = document.querySelectorAll('.hero-board');

heroBoards.forEach((board) => {
  board.addEventListener('mouseenter', (e) => {
    if (board.classList.contains('flex-grow')) return;

    heroBoards.forEach(b => {
      b.classList.remove('flex-grow')
      hideText(b);
    });
    board.classList.add('flex-grow');
    revealText(board);
  });

});

function revealText(board) {
  const largeText = board.querySelector('.hero-board__text');
  const smallText = board.querySelector('.hero-board__text-small');

  largeText.classList.remove('rotated');
  smallText.classList.remove('rotated');

  largeText.classList.add('normal');
  smallText.classList.add('normal');
}

function hideText(board) {
  const largeText = board.querySelector('.hero-board__text');
  const smallText = board.querySelector('.hero-board__text-small');

  largeText.classList.remove('normal');
  smallText.classList.remove('normal');

  largeText.classList.add('rotated');
  smallText.classList.add('rotated');
}

//NAVBAR FOR SMALL SCREENS
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('#nav-sm');
const links_lg = document.querySelectorAll('.nav');
const linkks_sm = document.querySelectorAll('.nav-sm');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navbar.classList.toggle('open');
});

links_lg.forEach((link, index) => {
  if (window.location.href.includes(link.href)) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
});


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior:'smooth'
  });
}