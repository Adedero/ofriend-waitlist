const loader = document.querySelector('#loader');

window.addEventListener('load', () => {
  loader.classList.add('close');
});

document.addEventListener('DOMContentLoaded', () => {
  loader.classList.add('close');
});

window.addEventListener('beforeunload', () => {
  loader.classList.add('close');
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    loader.classList.add('close');
  }
});

//Button that scrolls to the top of the page
const scrollTop = document.getElementById("scroll-top");
scrollTop.onclick = () => scrollToTop();
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


function useLoader(loader) {
  if (loader) {
    return {
      open() {
        loader.classList.remove('close');
      },
      close() {
        loader.classList.add('close');
      }
    }
  } else {
    return {
      open() {},
      close() {}
    }
  }
}

const waitlistForm = document.querySelector('#waitlist-form');
const waitlistSubmitBtn = document.querySelector('#waitlist-btn');
const waitlistName = document.querySelector('#w-name');
const waitlistEmail = document.querySelector('#w-email');

waitlistForm.addEventListener('submit', handleSubmit);

function handleSubmit() {
  useLoader(loader).open();
  //waitlistName.value = '';
  //waitlistEmail.value = '';
}


//Hiver effect on the images on the home page hero section
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
const links_sm = document.querySelectorAll('.nav-sm');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navbar.classList.toggle('open');
});

links_lg.forEach((link) => setActiveLink(link));
links_sm.forEach((link) => setActiveLink(link));

function setActiveLink(link) {
  const currentPath = window.location.pathname;
  const linkPath = new URL(link.href, window.location.origin).pathname;
  if (currentPath === linkPath) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
}


const backBtn = document.querySelectorAll('.back-btn');
backBtn.forEach(btn => {
  btn.onclick = () => window.history.back();
});




