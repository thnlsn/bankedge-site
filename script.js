'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to'); // Learn more btn
const section1 = document.querySelector('#section--1'); // Section 1

const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

const header = document.querySelector('.header'); // Header section
const modal = document.querySelector('.modal'); // Greyed out background of modal
const overlay = document.querySelector('.overlay'); // Modal window itself
const btnCloseModal = document.querySelector('.btn--close-modal'); // Close modal btn
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // Both open modal btns

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

///////////////////////////////////////
// Navbar Menu Fade Effect
const nav = document.querySelector('.nav'); // Parent navbar

// Function to fire on mouseover and mouseout of navlinks
const handleHover = function (e) {
  const link = e.target; // The link element that is hovered
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');

  siblings.forEach((el) => {
    if (el !== link) el.style.opacity = this;
  });
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Navbar Sticky
/* document.addEventListener('scroll', function () {
  if (section1.getBoundingClientRect().top < nav.getBoundingClientRect().height)
    nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
}); */

///////////////////////////////////////
// Intersection Observer for Sticky Nav

// Observer options, requires a root and a threshold property
const stickyNavOptions = {
  // You can select an element or pass null to observe the entire viewport
  // The root property is the element you want to watch whether the observation target is intersecting, but null means it will be the viewport, so we are watching for whether section1 is intersecting the viewport
  root: null,
  // Percentage of intersection (percent that the target should be intersecting into the root), at which point the callback will be called
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};

// Whenever the observe target intersects the viewport at the threshhold percentage, run this callback function
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
headerObserver.observe(header);

///////////////////////////////////////
// Intersection Observer for Nav Highlights

const sectionOptions = {
  root: null,
  threshold: 0.3,
};

const sectionHighlight = function (entries) {
  const [{ isIntersecting, target: section }] = entries;
  const sectionNum = section.id[section.id.length - 1];
  const navLinks = document.querySelectorAll('.nav__link');

  if (isIntersecting) {
    navLinks.forEach((link) => {
      link.style.transform = 'scale(1)';
    });
    navLinks[sectionNum - 1].style.transform = 'scale(1.2)';
  } else navLinks[sectionNum - 1].style.transform = 'scale(1)';
};

console.log(section1);
console.log(section2);

const section1Observer = new IntersectionObserver(
  sectionHighlight,
  sectionOptions
);
section1Observer.observe(section1);

const section2Observer = new IntersectionObserver(
  sectionHighlight,
  sectionOptions
);
section2Observer.observe(section2);

const section3Observer = new IntersectionObserver(
  sectionHighlight,
  sectionOptions
);
section3Observer.observe(section3);
