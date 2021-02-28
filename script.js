'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to'); // Learn more btn
const section1 = document.querySelector('#section--1'); // Section 1

const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

const section4 = document.querySelector('.section--sign-up');

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
// Lazy Loading Images

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

// Options for all section enter effects, so for the 3 tab sections highlighting their tabs in the navbar as well as the sections themselves appearing when they get close enough
const sectionOptions = {
  root: null,
  threshold: 0.275,
};

// Function to highlight the tab in the nav as its section intersects
const sectionHighlight = function (entries) {
  const [{ isIntersecting, target: section }] = entries;
  const sectionNum = section.id[section.id.length - 1]; // Section number
  const navLinks = document.querySelectorAll('.nav__link'); // navlinks Nodelist
  if (isIntersecting) {
    // When a new section is intersected, scale all to default (so that there is never 2 tabs being scaled up)
    navLinks.forEach((link) => (link.style.transform = 'scale(1)'));
    // The one that was intersected should be the only one scaled up
    navLinks[sectionNum - 1].style.transform = 'scale(1.2)';
    // Else is for the case of the last section, when there are no more intersections to take place, which would leave the last tab scaled up even when left, so target the tab that is NO longer intersecting, and scale it back down
  } else navLinks[sectionNum - 1].style.transform = 'scale(1)';
};

// Select all tab sections (not the contact section) by targetting all sections with id's prefixed with section (since contact doesn't have an id and all the other sections do, but with different suffixes/BEM modifiers)
const allTabSections = document.querySelectorAll("[id^='section']");

// Observer for each of the tabbed sections
const tabSectionObserver = new IntersectionObserver(
  sectionHighlight,
  sectionOptions
);
// Observe each of the tabbed sections
allTabSections.forEach((section) => {
  tabSectionObserver.observe(section);
});

///////////////////////////////////////
// Intersection Observer for Sections Animating In

// All sections, tabbed ones and also the last contact one
const allSections = [
  ...allTabSections,
  document.querySelector('.section--sign-up'),
];

const revealSection = (entries, observer) => {
  const [{ isIntersecting, target: section }] = entries;
  // Guard clause to do nothing if not intersecting
  if (!isIntersecting) return;
  // Remove the hidden as entry intersects
  section.classList.remove('section--hidden');
  // Detach the observer once it has been unhidden
  observer.unobserve(section);
};

const sectionObserver = new IntersectionObserver(revealSection, sectionOptions);
// For each section, add an observer observing that specific section
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden'); // Also add hidden class here instead of as a default in HTML so that users who disable JavaScript can still see it
});
