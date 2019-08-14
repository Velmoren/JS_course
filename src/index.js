'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';



import clickBtn from './modules/clickBtn';
import openModal from './modules/openModal';
import firstSlider from './modules/firstSlider';
import secondSlider from './modules/secondSlider';
import thirdSlider from './modules/thirdSlider';
import calc from './modules/calc';
import smothScrollCode from './modules/smothScrollCode';
import sendForm from './modules/sendForm';
import maskPhone from './modules/maskPhone';
import elemCSS from './modules/elemCSS';



// clickBtn
clickBtn();
// openModal
openModal();
// firstSlider
firstSlider();
// secondSlider
secondSlider();
// thirdSlider
thirdSlider();
// calc
calc();
// smothScrollCode
smothScrollCode();
// sendForm
sendForm();
// maskPhone
maskPhone();
// elemCSS
elemCSS();