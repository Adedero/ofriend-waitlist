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

/* window.addEventListener('scroll', () => {
  if (window.scrollY >= 160) {
    navbar.classList.add('top-16')
  } else {
    navbar.classList.remove('top-16')
  }
});
 */
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

//Countdown timer
const daysElement = document.querySelector('#days');
const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');


// Set the target date and time
const targetDate = new Date('November 10, 2024 23:59:59').getTime();

// Function to update the countdown every second
const countdown = setInterval(() => {
  const now = new Date().getTime();  // Current time
  const timeRemaining = targetDate - now;  // Time difference

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Update the HTML content
  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;

  // If the countdown is over, stop the interval and display a message
  if (timeRemaining < 0) {
    clearInterval(countdown);
  }
}, 1000); 


const cookieNotice = document.querySelector('.cookie-notice');
const acceptBtn = document.querySelectorAll('.accept-cookie-btn');

acceptBtn.forEach(btn => {
  btn.onclick = () => {
    cookieNotice.classList.add('hide');
  }
})



