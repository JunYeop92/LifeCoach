/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/component/App.js":
/*!******************************!*\
  !*** ./src/component/App.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ App\n/* harmony export */ });\n/* harmony import */ var _MeasureTime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MeasureTime.js */ \"./src/component/MeasureTime.js\");\n\r\n\r\nfunction App($target) {\r\n    this.constructor = () => {\r\n        const measureTime = new _MeasureTime_js__WEBPACK_IMPORTED_MODULE_0__.default($target);\r\n    };\r\n    this.setState = () => {};\r\n    this.render = () => {};\r\n\r\n    this.constructor();\r\n}\r\n\n\n//# sourceURL=webpack://FE/./src/component/App.js?");

/***/ }),

/***/ "./src/component/MeasureTime.js":
/*!**************************************!*\
  !*** ./src/component/MeasureTime.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MeasureTime\n/* harmony export */ });\nfunction MeasureTime($target) {\r\n    this.state = {\r\n        start: null, //Date형\r\n        end: null, //Date형\r\n        TIME_ID: null, //setTimeout 통제를 위한 변수\r\n    };\r\n\r\n    this.constructor = () => {\r\n        const $timer = document.createElement('div');\r\n        $timer.id = 'timer';\r\n        $timer.innerHTML = `<span id='today-hour'>00</span>\r\n                                <span>:</span> \r\n                                <span id='today-min'>00</span>`;\r\n        $target.appendChild($timer);\r\n\r\n        const $button = document.createElement('div');\r\n        $button.innerHTML = `<button type='button' id='start-btn'>시작</button>\r\n                            <button type='button' id='end-btn'>종료</button>`;\r\n        $target.appendChild($button);\r\n    };\r\n\r\n    const timeGo = (start) => {\r\n        console.log(start);\r\n        const end = Date.now(); //ms단위\r\n        const hour = Math.floor((end - start) / (60000 * 60));\r\n        const hourRest = (end - start) % (60000 * 60);\r\n        const min = Math.floor(hourRest / 60000);\r\n\r\n        document.querySelector('#today-hour').innerText =\r\n            hour > 9 ? hour : '0' + hour;\r\n        document.querySelector('#today-min').innerText =\r\n            min > 9 ? min : '0' + min;\r\n        this.state.end = new Date(end);\r\n        this.state.TIME_ID = setTimeout(timeGo, 60000);\r\n    };\r\n\r\n    this.attachEvent = () => {\r\n        document.querySelector('#start-btn').addEventListener('click', (e) => {\r\n            this.state.start = new Date();\r\n            timeGo(this.state.start.getTime());\r\n        });\r\n        document.querySelector('#end-btn').addEventListener('click', (e) => {\r\n            if (this.state.TIME_ID) {\r\n                clearTimeout(this.state.TIME_ID);\r\n                alert('end');\r\n            }\r\n        });\r\n    };\r\n\r\n    this.setState = () => {};\r\n    this.render = () => {};\r\n}\r\n\n\n//# sourceURL=webpack://FE/./src/component/MeasureTime.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/App.js */ \"./src/component/App.js\");\n\r\n\r\nnew _component_App_js__WEBPACK_IMPORTED_MODULE_0__.default(document.querySelector('#app'));\r\n\n\n//# sourceURL=webpack://FE/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;