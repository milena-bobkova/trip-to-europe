var HIDDEN = 'hidden';
var SLIDE = 'slider__item';
var TOGGLE = 'slider__toggle';

var navMenu = document.querySelector('.navigation__list');
var menuBurger = document.querySelector('.navigation__open');
var menuCross = document.querySelector('.navigation__close');

navMenu.classList.remove("navigation__list--nojs");

menuBurger.addEventListener("click", function (evt) {
  evt.preventDefault();
  navMenu.classList.remove("navigation__list--closed");
  navMenu.classList.add("navigation__list--opened");
});

menuCross.addEventListener("click", function (evt) {
  evt.preventDefault();
  navMenu.classList.add("navigation__list--closed");
  navMenu.classList.remove("navigation__list--opened");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (navMenu.classList.contains("navigation__list--opened")) {
      navMenu.classList.remove("navigation__list--opened");
      navMenu.classList.add("navigation__list--closed");
    }
  }
});

var slider = document.querySelector('.slider');
slider.classList.remove('slider--nojs');

var slideIdToShow = 1;

var startSlider = function () {
  var slides = getElementsHandler(SLIDE);
  var toggles = getElementsHandler(TOGGLE);

  toggles.forEach(function (toggleNode) {
    var toggleNodeId = extractIdHandler(toggleNode, TOGGLE);
    toggleNode.addEventListener('click', function () {
      showSlideHandler(slides, toggleNodeId)
    });
  });
  showSlideHandler(slides, slideIdToShow);
}

var getElementsHandler = function (type) {
  return [].slice.call(document.querySelectorAll('.' + type)).sort(function (slideNodeFirst, slideNodeSecond) {
    var slideNumFirst = extractIdHandler(slideNodeFirst, SLIDE);
    var slideNumSecond = extractIdHandler(slideNodeSecond, SLIDE);

    return slideNumFirst > slideNumSecond;
  });
}

var extractIdHandler = function (slideNode, baseClass) {
  var currentClassIndex = slideNode.classList.length;
  while (currentClassIndex--) {
    var currentClass = slideNode.classList.item(currentClassIndex);
    var possibleIdNum = parseInt(currentClass.split('-')[1]);
    if (isNaN(possibleIdNum)) {
      continue
    }
    var classStringToCheck = baseClass + '-' + possibleIdNum;
    if (classStringToCheck === currentClass) {
      return possibleIdNum;
    }
  }
}

var showSlideHandler = function (slides, slideId) {
  slides.forEach(function (slideNode) {
    var currentSlideNodeId = extractIdHandler(slideNode, SLIDE);
    if (currentSlideNodeId === slideId) {
      slideNode.classList.remove(HIDDEN);
    } else {
      slideNode.classList.add(HIDDEN);
    }
  });
}

startSlider();

var modalLinks = document.querySelectorAll('.prices__button');
var tourModal = document.querySelector('.prices__modal');
var modalClose = tourModal.querySelector('.prices__modal-toggle');
var modalForm = tourModal.querySelector('form');
var formFields = tourModal.querySelectorAll('input');
var modalTel = tourModal.querySelector('[name="user-tel"]');
var modalMail = tourModal.querySelector('[name="user-email"]');
var modalSubmit = tourModal.querySelector('.prices__modal-button');


var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
}

for (var i = 0; i < modalLinks.length; i++) {
  modalLinks[i].addEventListener('click', function () {
    openModal();
  });
}

var openModal = function () {
  tourModal.classList.add('modal--show');

  if (storage) {
    modalTel.value = storage;
    modalMail.focus();
  } else {
    modalTel.focus();
  }
};

modalClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  tourModal.classList.remove('modal--show');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    tourModal.classList.remove('modal--show');
  }
});

modalForm.addEventListener('submit', formSubmitHandler);

modalSubmit.addEventListener('click', submitButtonClickHandler);

var submitButtonClickHandler = function () {
  validateForm(formFields);
};

var formSubmitHandler = function () {
  evt.preventDefault();
  modalForm.reset();
  successSaveHandler;
}

var validateForm = function (fields) {
  fields.forEach(function (field) {
    if (!field.value) {
      evt.preventDefault();
      field.setCustomValidity('Данные не верны');
    } else if (isStorageSupport) {
      localStorage.setItem(field, field.value);
    }
  });
}

var successSaveHandler = function () {
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successMessageTemplate.cloneNode(true);
  document.querySelector('main').appendChild(successMessage);

  var successEscKeyDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successMessage.remove();
      document.removeEventListener('keydown', successEscKeyDownHandler);
      document.removeEventListener('click', successWindowClickHandler);
    }
  };

  var successWindowClickHandler = function () {
    successMessage.remove();
    document.removeEventListener('keydown', successEscKeyDownHandler);
    document.removeEventListener('click', successWindowClickHandler);
  };
  document.addEventListener('keydown', successEscKeyDownHandler);
  document.addEventListener('click', successWindowClickHandler);
};
