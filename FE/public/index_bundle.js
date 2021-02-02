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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ App\n/* harmony export */ });\n/* harmony import */ var _MeasureTime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MeasureTime.js */ \"./src/component/MeasureTime.js\");\n/* harmony import */ var _RecordTime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecordTime.js */ \"./src/component/RecordTime.js\");\n\r\n\r\n\r\nfunction App($target) {\r\n    this.state = {\r\n        totalTime: 0, // 분단위, max:24*60\r\n    };\r\n\r\n    this.constructor = () => {};\r\n\r\n    const measureTime = new _MeasureTime_js__WEBPACK_IMPORTED_MODULE_0__.default({\r\n        $target,\r\n        setTotal: (time) => {\r\n            this.setState({\r\n                ...this.state,\r\n                totalTime: this.state.totalTime + time,\r\n            });\r\n        },\r\n    });\r\n    const recordTime = new _RecordTime_js__WEBPACK_IMPORTED_MODULE_1__.default({ $target });\r\n\r\n    this.setState = (nextState) => {\r\n        this.state = nextState;\r\n        const { totalTime } = this.state;\r\n\r\n        recordTime.setState({\r\n            totalTime,\r\n        });\r\n    };\r\n    this.render = () => {};\r\n\r\n    this.constructor();\r\n}\r\n\n\n//# sourceURL=webpack://FE/./src/component/App.js?");

/***/ }),

/***/ "./src/component/MeasureTime.js":
/*!**************************************!*\
  !*** ./src/component/MeasureTime.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MeasureTime\n/* harmony export */ });\nfunction MeasureTime({ $target, setTotal }) {\r\n    this.state = {\r\n        start: null, //Date형\r\n        end: null, //Date형\r\n        TIME_ID: null, //setTimeout 통제를 위한 변수\r\n        hour: 0,\r\n        min: 0,\r\n    };\r\n    this.$element;\r\n\r\n    this.constructor = () => {\r\n        const $timer = document.createElement('div');\r\n        $timer.id = 'timer';\r\n        $timer.innerHTML = `<span id='hour'>00</span>\r\n                                <span>:</span> \r\n                                <span id='min'>00</span>`;\r\n        $target.appendChild($timer);\r\n\r\n        const $button = document.createElement('div');\r\n        $button.innerHTML = `<button type='button' id='start-btn'>시작</button>\r\n                            <button type='button' id='end-btn'>종료</button>`;\r\n        $target.appendChild($button);\r\n    };\r\n\r\n    this.attachEvent = () => {\r\n        document.querySelector('#start-btn').addEventListener('click', (e) => {\r\n            this.state.start = new Date();\r\n            this.setState();\r\n            console.log('start');\r\n        });\r\n        document.querySelector('#end-btn').addEventListener('click', (e) => {\r\n            if (this.state.TIME_ID) {\r\n                clearTimeout(this.state.TIME_ID);\r\n                const { hour, min } = this.state;\r\n                const totalTime = hour * 60 + min;\r\n                setTotal(totalTime);\r\n                console.log('end');\r\n            }\r\n        });\r\n    };\r\n\r\n    this.setState = () => {\r\n        this.state.end = new Date();\r\n        const { start, end } = this.state;\r\n        this.state.hour = Math.floor((end - start) / (60000 * 60));\r\n        const hourRest = (end - start) % (60000 * 60);\r\n        this.state.min = Math.floor(hourRest / 60000);\r\n        this.state.TIME_ID = setTimeout(this.setState, 60000);\r\n        this.render();\r\n    };\r\n    this.render = () => {\r\n        const { hour, min } = this.state;\r\n        document.querySelector('#hour').innerText = hour > 9 ? hour : '0' + hour;\r\n        document.querySelector('#min').innerText = min > 9 ? min : '0' + min;\r\n    };\r\n\r\n    this.constructor();\r\n    this.attachEvent();\r\n}\r\n\n\n//# sourceURL=webpack://FE/./src/component/MeasureTime.js?");

/***/ }),

/***/ "./src/component/RecordTime.js":
/*!*************************************!*\
  !*** ./src/component/RecordTime.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ RecordTime\n/* harmony export */ });\nfunction RecordTime({ $target }) {\r\n    this.state = {\r\n        totalTime: 0,\r\n    };\r\n    this.$element;\r\n\r\n    this.constructor = () => {\r\n        const $total = document.createElement('div');\r\n        $timer.id = 'total';\r\n        $total.innerHTML = `<h1>Today</h1>\r\n                            <span>TotalTime</span>\r\n                            <span id='hour'>00</span>\r\n                            <span>:</span> \r\n                            <span id='min'>00</span>`;\r\n        $target.appendChild($total);\r\n        this.$element = $total;\r\n    };\r\n    this.setState = (nextState) => {\r\n        this.state = nextState;\r\n        this.render();\r\n    };\r\n    this.render = () => {\r\n        const hour = Math.floor(this.state.totalTime / 60);\r\n        const min = this.state.totalTime % 60;\r\n\r\n        this.$element.querySelector('#hour').innerText = hour > 9 ? hour : '0' + hour;\r\n        this.$element.querySelector('#min').innerText = min > 9 ? min : '0' + min;\r\n    };\r\n\r\n    this.constructor();\r\n}\r\n\n\n//# sourceURL=webpack://FE/./src/component/RecordTime.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/App.js */ \"./src/component/App.js\");\n\r\nnew _component_App_js__WEBPACK_IMPORTED_MODULE_0__.default(document.querySelector('#app'));\r\n\n\n//# sourceURL=webpack://FE/./src/index.js?");

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