'use strict';

///////////////////////////////////////
// Modal window

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
btnsOpenModal.forEach((btn, i) => {
  btn.addEventListener('click', openModal); // Add event to remove hidden on modal & overlay

  btnCloseModal.addEventListener('click', closeModal); // Add hidden on click
  overlay.addEventListener('click', closeModal); // Add hidden on click

  document.addEventListener('keydown', function (e) {
    // On keydown, if the key is escape AND hidden is NOT applied (so it is visible), call closeModal
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
});
