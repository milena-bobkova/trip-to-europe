var HIDDEN = 'hidden';
var SLIDE = 'slider__item';
var TOGGLE = 'slider__toggle';

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
