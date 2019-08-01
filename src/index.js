	'use strict';

	import '@babel/polyfill';
	import 'nodelist-foreach-polyfill';
	import elementClosest from 'element-closest';
	elementClosest(window);
	import 'formdata-polyfill';
	import 'es6-promise';
	import 'fetch-polyfill';


	import countTimer from './modules/countTimert';
	import toggleMenu from './modules/toggleMenu';
	import togglePopUp from './modules/togglePopUp';
	import tabs from './modules/tabs';
	import slider from './modules/slider';
	import changeFotos from './modules/changeFotos';
	import calc from './modules/calc';
	import smothScroll from './modules/smothScroll';
	import sendForm from './modules/sendForm';


	// таймер 
	countTimer();
	// меню
	toggleMenu();
	// popup
	togglePopUp();
	// tabs
	tabs();
	// slider
	slider();
	// changeFotos
	changeFotos();
	// calculator
	calc(100);
	// scroll
	smothScroll();
	// send-ajax-form
	sendForm();