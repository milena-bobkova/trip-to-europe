var slider = document.querySelector('.slider');
var sliderContainer = document.querySelector('.slider__container');
var toggles = Array.from(document.querySelectorAll('.slider__toggle'));
var controls = Array.from(document.querySelectorAll('.slider__control'));
var slides = Array.from(document.querySelectorAll('.slider__item'));

slider.classList.remove('slider--nojs');

num = 0;
slides[num].classList.add('slider__item--show');
