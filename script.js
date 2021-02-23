'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector('.header'); // Header section
const modal = document.querySelector('.modal'); // Greyed out background of modal
const overlay = document.querySelector('.overlay'); // Modal window itself
const btnCloseModal = document.querySelector('.btn--close-modal'); // Close modal btn
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // Both open modal btns

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// forEach is an array-like method, so forEach can be directly called from it
btnsOpenModal.forEach(
  // Add event to remove hidden on modal & overlay
  (btn) => btn.addEventListener('click', openModal)
);
btnCloseModal.addEventListener('click', closeModal); // Add hidden on click
overlay.addEventListener('click', closeModal); // Add hidden on click

document.addEventListener('keydown', function (e) {
  // On keydown, if the key is escape AND hidden is NOT applied (so it is visible), call closeModal
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Create a cookie alert
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML =
  'We use cookies to provide a better experience <button class="btn btn--close-cookie">Got it!</button>';
header.after(cookieMessage);

// Style the cookie alert
cookieMessage.style.backgroundColor = '#37383d';
cookieMessage.style.height =
  Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + 'px';

///////////////////////////////////////
// Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to'); // Learn more btn
const section1 = document.querySelector('#section--1'); // Section 1

btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();
  console.log(section1Coords);
  console.log(e.target.getBoundingClientRect());

  // Scrolling
  /*   window.scrollTo(
    section1Coords.x + window.pageXOffset,
    section1Coords.y + window.pageYOffset
  ); */

  // Old method
  /*   window.scrollTo({
    left: section1Coords.x + window.pageXOffset,
    top: section1Coords.y + window.pageYOffset,
    behavior: 'smooth',
  }); */

  section1.scrollIntoView({ behavior: 'smooth' });
});
