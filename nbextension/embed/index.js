define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://unpkg.com/jupyter_dojo@0.1.0/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function get() {
    return _package.version;
  }
});

var _package = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"name":"@jupyter_dojo/nbextension","version":"0.1.0","description":"A Jupyter Notebook extension for rendering unittest","author":"Joao Felipe Pimentel <joaofelipenp@gmail.com>","main":"lib/index.js","keywords":["jupyter","jupyterlab","jupyterlab extension"],"scripts":{"build":"webpack","watch":"watch \"npm run build\" src --wait 10 --ignoreDotFiles","prepublish":"npm run build","extension:install":"jupyter nbextension install --symlink --py --sys-prefix notebook_json","extension:uninstall":"jupyter nbextension uninstall --py --sys-prefix notebook_json","extension:enable":"jupyter nbextension enable --py --sys-prefix notebook_json","extension:disable":"jupyter nbextension disable --py --sys-prefix notebook_json"},"dependencies":{"@jupyter_dojo/base":"^0.1.2"},"devDependencies":{"@babel/core":"^7.0.0-beta.34","@babel/preset-env":"^7.0.0-beta.34","babel-loader":"^8.0.0-beta.0","css-loader":"^0.28.7","file-loader":"^1.1.5","json-loader":"^0.5.7","style-loader":"^0.19.0","url-loader":"^0.6.2","watch":"^1.0.2","webpack":"^3.10.0"},"repository":{"type":"git","url":"https://github.com/JoaoFelipe/jupyter-dojo.git"},"bugs":{"url":"https://github.com/JoaoFelipe/jupyter-dojo/issues"},"license":"MIT"}

/***/ })
/******/ ])});;
//# sourceMappingURL=index.js.map