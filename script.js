'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to'); // Learn more btn
const section1 = document.querySelector('#section--1'); // Section 1

const header = document.querySelector('.header'); // Header section
const modal = document.querySelector('.modal'); // Greyed out background of modal
const overlay = document.querySelector('.overlay'); // Modal window itself
const btnCloseModal = document.querySelector('.btn--close-modal'); // Close modal btn
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // Both open modal btns

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Button Smooth Scrolling

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

// 1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. Determine what element originated the event
  document
    .querySelector(`${e.target.getAttribute('href')}`)
    ?.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Operations Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Delegate events on tabs with a listener on the tab container parent
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // The tab Node of the clicked tab
  if (!clicked) return; // Guard clause if the container is clicked

  // Add --active class to clicked tab and remove from the others
  tabs.forEach((tab, i) => {
    // If the current tab in the loop is NOT the one clicked...
    if (tab.dataset.tab !== clicked.dataset.tab) {
      // Remove the --active classes from the tab and content
      tab.classList.remove('operations__tab--active');
      tabsContent[i].classList.remove('operations__content--active');
    } else {
      // Otherwise, add --active to tab and content (the one clicked)
      clicked.classList.add('operations__tab--active'); // Add the active style
      tabsContent[i].classList.add('operations__content--active');
    }
  });
});
