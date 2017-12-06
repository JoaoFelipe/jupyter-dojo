define(["nbextensions/jupyter_dojo/index","base/js/namespace","base/js/events","base/js/utils","notebook/js/codecell"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load_ipython_extension = load_ipython_extension;

/**
 * This file contains the javascript that is run when the notebook is loaded.
 * It contains some requirejs configuration and the `load_ipython_extension` 
 * which is required for any notebook extension.
 */

/**
 * Configure requirejs.
 */
if (window.require) {
  window.require.config({
    map: {
      '*': {
        'jupyter_dojo': 'nbextensions/jupyter_dojo/index'
      }
    }
  });
}
/**
 * Export the required load_ipython_extention.
 */


function load_ipython_extension() {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Extension, Jupyter, events, utils, codecell, dojotools) {
    var notebook = Jupyter.notebook;
    var dojoView = Extension.register_view(notebook, dojotools);
    Extension.register_renderer(notebook, dojoView);
    Extension.register_highlight(Jupyter, events, utils, codecell);
    Extension.render_cells(notebook);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(7));
__export(__webpack_require__(8));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LogInfo = (function () {
    function LogInfo(startTime, newTime, pilot, copilot) {
        this.startTime = startTime;
        this.newTime = newTime;
        this.pilot = pilot;
        this.copilot = copilot;
    }
    return LogInfo;
}());
exports.LogInfo = LogInfo;
var DojoClock = (function () {
    function DojoClock() {
        this.seconds = 300;
        this.default = 300;
        this.users = [];
        this.startTime = null;
        this.timer_running = false;
        this.registering = false;
        this.interfaces = [];
        this.interval = null;
        this.pilot = null;
        this.copilot = null;
    }
    DojoClock.prototype.secToMMSS = function (sec) {
        var min_num = Math.floor(sec / 60);
        var minutes = String(min_num);
        var seconds = String(sec - (min_num * 60));
        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }
        if (seconds.length < 2) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    };
    DojoClock.prototype.display = function () {
        var _this = this;
        this.interfaces.forEach(function (view) {
            view.updateTime(_this.secToMMSS(_this.seconds));
        });
    };
    DojoClock.prototype.start = function () {
        var _this = this;
        this.timer_running = true;
        this.interfaces.forEach(function (view) {
            view.updatePlayPause(_this.timer_running);
        });
        this.interval = setInterval(function () {
            _this.display();
            if (_this.seconds == 0) {
                _this.pause();
                if (_this.startTime == null) {
                    alert("Time is up. Click ok to restart timer");
                }
                else {
                    var newTime = new Date();
                    _this.users.push(new LogInfo(_this.startTime, newTime, _this.pilot, _this.copilot));
                    _this.pilot = _this.copilot;
                    _this.copilot = prompt("Time is up. Who is the new copilot?");
                    _this.startTime = new Date();
                }
                _this.seconds = _this.default;
                _this.start();
            }
            else {
                _this.seconds--;
            }
            _this.timer_running = true;
            _this.interfaces.forEach(function (view) {
                view.updatePlayPause(_this.timer_running);
            });
        }, 1000);
        this.interfaces.forEach(function (view) {
            view.updateInterval(_this.interval);
        });
    };
    DojoClock.prototype.pause = function () {
        var _this = this;
        this.timer_running = false;
        this.interfaces.forEach(function (view) {
            view.updatePlayPause(_this.timer_running);
        });
        clearInterval(this.interval);
        this.interval = null;
    };
    DojoClock.prototype.resume = function () {
        if (!this.interval)
            this.start();
    };
    DojoClock.prototype.reset = function () {
        this.seconds = this.default;
        this.display();
        this.pause();
    };
    DojoClock.prototype.startRegistering = function () {
        var _this = this;
        this.registering = true;
        this.interfaces.forEach(function (view) {
            view.updateRegistering(_this.registering);
        });
        this.pilot = prompt("Who is the pilot?");
        this.copilot = prompt("Who is the co-pilot?");
        this.startTime = new Date();
    };
    DojoClock.prototype.stopRegistering = function () {
        var _this = this;
        this.registering = false;
        this.interfaces.forEach(function (view) {
            view.updateRegistering(_this.registering);
        });
        this.users.push(new LogInfo(this.startTime, new Date(), this.pilot, this.copilot));
        this.startTime = null;
    };
    DojoClock.prototype.peopleLog = function () {
        var result = "";
        this.users.forEach(function (value) {
            result += "- " + value.startTime.toLocaleTimeString() + " -> " + value.newTime.toLocaleTimeString();
            result += " = " + value.pilot + ", " + value.copilot + "\r\n";
        });
        if (this.startTime != null) {
            result += "- " + this.startTime.toLocaleTimeString() + " -> " + (new Date()).toLocaleTimeString();
            result += " = " + this.pilot + ", " + this.copilot + "\r\n";
        }
        return result.slice(0, -2);
        //var cell = Jupyter.notebook.insert_cell_at_bottom("markdown");
        //cell.set_text(result.slice(0,-2));
    };
    DojoClock.prototype.configure = function () {
        var time = prompt("New time in seconds", String(this.default));
        this.default = Number(time);
        this.reset();
    };
    return DojoClock;
}());
exports.DojoClock = DojoClock;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Push = __webpack_require__(9);
var ButtonIcon = (function () {
    function ButtonIcon() {
    }
    ButtonIcon.prototype.initialize = function (name, icon, help, onclick) { return this; };
    ButtonIcon.prototype.build = function () { };
    return ButtonIcon;
}());
exports.ButtonIcon = ButtonIcon;
var DojoView = (function () {
    function DojoView(dojoClock, middle, insertCellBelow, incActive) {
        var _this = this;
        this.mouseOver = false;
        this.showButtons = false;
        this.showTootips = false;
        this.intervalElement = null;
        this.timerElement = null;
        this.incActive = incActive;
        this.mouseOver = false;
        this.showButtons = true;
        this.buttons = [];
        this.test_button = this.new_button('dojo-test-toggle', 'fa-text-width', 'Toggle Test Tools', function () {
            _this.toggleTool();
        });
        this.create_button = this.new_button('dojo-create', 'fa-group', 'Create dojo', function () {
            var fn = prompt("Function Name?");
            insertCellBelow("%%unittest -p 1\nassert " + fn + "() == 0", "code");
            insertCellBelow("def " + fn + "():\n    pass", "code");
            insertCellBelow("%load_ext ipython_unittest", "code");
        });
        this.create_button = this.new_button('dojo-list-log', 'fa-list', 'Copy people log to new cell', function () {
            insertCellBelow(dojoClock.peopleLog(), "markdown");
        });
        this.register_log_button = this.new_button('dojo-register-log', 'fa-user', 'Log people', function () {
            if (dojoClock.registering) {
                dojoClock.stopRegistering();
            }
            else {
                dojoClock.startRegistering();
            }
        });
        this.play_pause_button = this.new_button('dojo-play-pause', 'fa-play', 'Play/Pause time', function () {
            dojoClock.timer_running ? dojoClock.pause() : dojoClock.resume();
        });
        this.time_button = this.new_button('dojo-time', 'fa-eye-slash', 'Toggle timer', function () {
            _this.toggleEye();
        });
        this.reset_button = this.new_button('dojo-reset-time', 'fa-refresh', 'Reset time', function () {
            dojoClock.reset();
        });
        this.configure_button = this.new_button('dojo-configure-time', 'fa-wrench', 'Configure time', function () {
            dojoClock.configure();
        });
        this.tooltip_button = this.new_button('dojo-tooltips', 'fa-comment-o', 'Toggle tooltips', function () {
            _this.toggleTooltip();
        });
        middle(this.buttons);
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            button.build();
        }
        this.timerElement = document.createElement("span");
        this.timerElement.id = "dojo-timer-time";
        this.timerElement.style.margin = "0 5px";
        this.timerElement.style.color = "black";
        this.timerElement.innerHTML = "05:00";
        this.intervalElement = document.createElement("span");
        this.intervalElement.id = "dojo-timer-interval";
        this.intervalElement.style.margin = "0 5px";
        this.intervalElement.style.display = "none";
        var eye = this.time_button.icon;
        eye.parentNode.insertBefore(this.timerElement, eye.nextSibling);
        eye.parentNode.insertBefore(this.intervalElement, eye.nextSibling);
        var eyeb = this.time_button.button;
        eyeb.style.width = "80px";
        eyeb.addEventListener("mouseenter", function () {
            if (eye.classList.contains("fa-eye-slash")) {
                _this.mouseOver = true;
                _this.viewText();
            }
        }, false);
        eyeb.addEventListener("mouseleave", function () {
            _this.mouseOver = false;
            _this.viewText();
        }, false);
        this.toggleTool();
    }
    DojoView.prototype.new_button = function (name, icon, help, onclick) {
        var button = new ButtonIcon().initialize(name, icon, help, onclick);
        this.buttons.push(button);
        return button;
    };
    DojoView.prototype.cleanup = function () {
        clearInterval(Number(this.intervalElement.textContent));
    };
    DojoView.prototype.setColor = function (color) {
        if (this.showButtons) {
            this.time_button.button.style.background = color;
        }
        else {
            this.test_button.button.style.background = color;
        }
    };
    DojoView.prototype.toggleEye = function () {
        if (this.time_button.icon.classList.contains("fa-eye-slash")) {
            this.time_button.icon.classList.remove("fa-eye-slash");
            this.time_button.icon.classList.add("fa-eye");
        }
        else {
            this.time_button.icon.classList.remove("fa-eye");
            this.time_button.icon.classList.add("fa-eye-slash");
        }
        this.viewText();
    };
    DojoView.prototype.toggleTool = function () {
        if (this.showButtons) {
            this.test_button.button.style.background = this.time_button.button.style.background;
            this.time_button.button.style.background = "transparent";
        }
        else {
            this.time_button.button.style.background = this.test_button.button.style.background;
            this.test_button.button.style.background = "transparent";
        }
        this.showButtons = !this.showButtons;
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            if (button != this.test_button) {
                button.button.style.display = this.showButtons ? "block" : "none";
            }
        }
    };
    DojoView.prototype.toggleTooltip = function () {
        if (this.tooltip_button.icon.classList.contains("fa-comment-o")) {
            this.tooltip_button.icon.classList.remove("fa-comment-o");
            this.tooltip_button.icon.classList.add("fa-comment");
        }
        else {
            this.tooltip_button.icon.classList.remove("fa-comment");
            this.tooltip_button.icon.classList.add("fa-comment-o");
        }
        this.showTootips = this.tooltip_button.icon.classList.contains("fa-comment");
    };
    DojoView.prototype.updatePlayPause = function (running) {
        if (!running) {
            this.play_pause_button.icon.classList.remove("fa-pause");
            this.play_pause_button.icon.classList.add("fa-play");
        }
        else {
            this.play_pause_button.icon.classList.remove("fa-play");
            this.play_pause_button.icon.classList.add("fa-pause");
        }
        this.viewText();
    };
    DojoView.prototype.updateTime = function (time) {
        this.timerElement.textContent = time;
    };
    DojoView.prototype.updateInterval = function (interval) {
        this.intervalElement.textContent = String(interval);
    };
    DojoView.prototype.updateRegistering = function (registering) {
        if (registering) {
            this.register_log_button.icon.classList.remove("fa-user");
            this.register_log_button.icon.classList.add("fa-times");
            this.register_log_button.button.title = "Stop logging people";
        }
        else {
            this.register_log_button.icon.classList.remove("fa-times");
            this.register_log_button.icon.classList.add("fa-user");
            this.register_log_button.button.title = "Log people";
        }
    };
    DojoView.prototype.viewText = function () {
        if (this.time_button.icon.classList.contains("fa-eye") ||
            this.play_pause_button.icon.classList.contains("fa-play") ||
            this.mouseOver) {
            this.timerElement.style.color = "black";
        }
        else {
            this.timerElement.style.color = "transparent";
        }
    };
    DojoView.prototype.renderResult = function (value) {
        var color = value["color"] || "transparent";
        this.setColor(color);
        if (value["message"] && this.showTootips) {
            var canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            var ctx = canvas.getContext('2d');
            var config = {
                body: value["message"],
                tag: "unittest",
                icon: ""
            };
            if (ctx) {
                ctx.fillStyle = value['color'] || "transparent";
                ctx.fillRect(0, 0, 128, 128);
                config.icon = canvas.toDataURL('image/png', '');
            }
            Push.close('unittest');
            Push.create('Test Result', config);
        }
        this.incActive(value["previous"] || 0);
    };
    return DojoView;
}());
exports.DojoView = DojoView;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/**
 * Push v1.0-beta
 * ==============
 * A compact, cross-browser solution for the JavaScript Notifications API
 *
 * Credits
 * -------
 * Tsvetan Tsvetkov (ttsvetko)
 * Alex Gibson (alexgibson)
 *
 * License
 * -------
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-2017 Tyler Nickerson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Push=t()}}(function(){return function t(e,n,i){function o(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return require(s,!0);if(r)return r(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return o(n||t)},f,f.exports,t,e,n,i)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default={errors:{incompatible:"PushError: Push.js is incompatible with browser.",invalid_plugin:"PushError: plugin class missing from plugin manifest (invalid plugin). Please check the documentation.",invalid_title:"PushError: title of notification must be a string",permission_denied:"PushError: permission request declined",sw_notification_error:"PushError: could not show a ServiceWorker notification due to the following reason: ",sw_registration_error:"PushError: could not register the ServiceWorker due to the following reason: ",unknown_interface:"PushError: unable to create notification: unknown interface"}}},{}],2:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(){function t(e){i(this,t),this._win=e,this.GRANTED="granted",this.DEFAULT="default",this.DENIED="denied",this._permissions=[this.GRANTED,this.DEFAULT,this.DENIED]}return o(t,[{key:"request",value:function(t,e){return arguments.length>0?this._requestWithCallback.apply(this,arguments):this._requestAsPromise()}},{key:"_requestWithCallback",value:function(t,e){var n=this,i=this.get(),o=function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n._win.Notification.permission;void 0===i&&n._win.webkitNotifications&&(i=n._win.webkitNotifications.checkPermission()),i===n.GRANTED||0===i?t&&t():e&&e()};i!==this.DEFAULT?o(i):this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._win.webkitNotifications.requestPermission(o):this._win.Notification&&this._win.Notification.requestPermission?this._win.Notification.requestPermission().then(o).catch(function(){e&&e()}):t&&t()}},{key:"_requestAsPromise",value:function(){var t=this,e=this.get(),n=function(e){return e===t.GRANTED||0===e},i=e!==this.DEFAULT,o=this._win.Notification&&this._win.Notification.requestPermission,r=this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission;return new Promise(function(s,a){var u=function(t){return n(t)?s():a()};i?u(e):r?t._win.webkitNotifications.requestPermission(function(t){u(t)}):o?t._win.Notification.requestPermission().then(function(t){u(t)}).catch(a):s()})}},{key:"has",value:function(){return this.get()===this.GRANTED}},{key:"get",value:function(){return this._win.Notification&&this._win.Notification.permission?this._win.Notification.permission:this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._permissions[this._win.webkitNotifications.checkPermission()]:navigator.mozNotification?this.GRANTED:this._win.external&&this._win.external.msIsSiteMode?this._win.external.msIsSiteMode()?this.GRANTED:this.DEFAULT:this.GRANTED}}]),t}();n.default=r},{}],3:[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=i(t("./Messages")),a=i(t("./Permission")),u=i(t("./Util")),c=i(t("./agents/DesktopAgent")),f=i(t("./agents/MobileChromeAgent")),l=i(t("./agents/MobileFirefoxAgent")),h=i(t("./agents/MSAgent")),d=i(t("./agents/WebKitAgent")),p=function(){function t(e){o(this,t),this._currentId=0,this._notifications={},this._win=e,this.Permission=new a.default(e),this._agents={desktop:new c.default(e),chrome:new f.default(e),firefox:new l.default(e),ms:new h.default(e),webkit:new d.default(e)},this._configuration={serviceWorker:"/serviceWorker.min.js",fallback:function(t){}}}return r(t,[{key:"_closeNotification",value:function(t){var e=!0,n=this._notifications[t];if(void 0!==n){if(e=this._removeNotification(t),this._agents.desktop.isSupported())this._agents.desktop.close(n);else if(this._agents.webkit.isSupported())this._agents.webkit.close(n);else{if(!this._agents.ms.isSupported())throw e=!1,new Error(s.default.errors.unknown_interface);this._agents.ms.close()}return e}return!1}},{key:"_addNotification",value:function(t){var e=this._currentId;return this._notifications[e]=t,this._currentId++,e}},{key:"_removeNotification",value:function(t){var e=!1;return this._notifications.hasOwnProperty(t)&&(delete this._notifications[t],e=!0),e}},{key:"_prepareNotification",value:function(t,e){var n=this,i=void 0;return i={get:function(){return n._notifications[t]},close:function(){n._closeNotification(t)}},e.timeout&&setTimeout(function(){i.close()},e.timeout),i}},{key:"_serviceWorkerCallback",value:function(t,e,n){var i=this,o=this._addNotification(t[t.length-1]);navigator.serviceWorker.addEventListener("message",function(t){var e=JSON.parse(t.data);"close"===e.action&&Number.isInteger(e.id)&&i._removeNotification(e.id)}),n(this._prepareNotification(o,e))}},{key:"_createCallback",value:function(t,e,n){var i=this,o=void 0,r=null;if(e=e||{},o=function(t){i._removeNotification(t),u.default.isFunction(e.onClose)&&e.onClose.call(i,r)},this._agents.desktop.isSupported())try{r=this._agents.desktop.create(t,e)}catch(o){var s=this._currentId,a=this.config().serviceWorker,c=function(t){return i._serviceWorkerCallback(t,e,n)};this._agents.chrome.isSupported()&&this._agents.chrome.create(s,t,e,a,c)}else this._agents.webkit.isSupported()?r=this._agents.webkit.create(t,e):this._agents.firefox.isSupported()?this._agents.firefox.create(t,e):this._agents.ms.isSupported()?r=this._agents.ms.create(t,e):(e.title=t,this.config().fallback(e));if(null!==r){var f=this._addNotification(r),l=this._prepareNotification(f,e);u.default.isFunction(e.onShow)&&r.addEventListener("show",e.onShow),u.default.isFunction(e.onError)&&r.addEventListener("error",e.onError),u.default.isFunction(e.onClick)&&r.addEventListener("click",e.onClick),r.addEventListener("close",function(){o(f)}),r.addEventListener("cancel",function(){o(f)}),n(l)}n(null)}},{key:"create",value:function(t,e){var n=this,i=void 0;if(!u.default.isString(t))throw new Error(s.default.errors.invalid_title);return i=this.Permission.has()?function(i,o){try{n._createCallback(t,e,i)}catch(t){o(t)}}:function(i,o){n.Permission.request().then(function(){n._createCallback(t,e,i)}).catch(function(){o(s.default.errors.permission_denied)})},new Promise(i)}},{key:"count",value:function(){var t=void 0,e=0;for(t in this._notifications)this._notifications.hasOwnProperty(t)&&e++;return e}},{key:"close",value:function(t){var e=void 0;for(e in this._notifications)if(this._notifications.hasOwnProperty(e)&&this._notifications[e].tag===t)return this._closeNotification(e)}},{key:"clear",value:function(){var t=void 0,e=!0;for(t in this._notifications)this._notifications.hasOwnProperty(t)&&(e=e&&this._closeNotification(t));return e}},{key:"supported",value:function(){var t=!1;for(var e in this._agents)this._agents.hasOwnProperty(e)&&(t=t||this._agents[e].isSupported());return t}},{key:"config",value:function(t){return(void 0!==t||null!==t&&u.default.isObject(t))&&u.default.objectMerge(this._configuration,t),this._configuration}},{key:"extend",value:function(t){var e,n={}.hasOwnProperty;if(!n.call(t,"plugin"))throw new Error(s.default.errors.invalid_plugin);n.call(t,"config")&&u.default.isObject(t.config)&&null!==t.config&&this.config(t.config),e=new(0,t.plugin)(this.config());for(var i in e)n.call(e,i)&&u.default.isFunction(e[i])&&(this[i]=e[i])}}]),t}();n.default=p},{"./Messages":1,"./Permission":2,"./Util":4,"./agents/DesktopAgent":6,"./agents/MSAgent":7,"./agents/MobileChromeAgent":8,"./agents/MobileFirefoxAgent":9,"./agents/WebKitAgent":10}],4:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(){i(this,t)}return r(t,null,[{key:"isUndefined",value:function(t){return void 0===t}},{key:"isString",value:function(t){return"string"==typeof t}},{key:"isFunction",value:function(t){return t&&"[object Function]"==={}.toString.call(t)}},{key:"isObject",value:function(t){return"object"==(void 0===t?"undefined":o(t))}},{key:"objectMerge",value:function(t,e){for(var n in e)t.hasOwnProperty(n)&&this.isObject(t[n])&&this.isObject(e[n])?this.objectMerge(t[n],e[n]):t[n]=e[n]}}]),t}();n.default=s},{}],5:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});n.default=function t(e){i(this,t),this._win=e}},{}],6:[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),u=i(t("./AbstractAgent")),c=i(t("../Util")),f=function(t){function e(){return o(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return s(e,u.default),a(e,[{key:"isSupported",value:function(){return void 0!==this._win.Notification}},{key:"create",value:function(t,e){return new this._win.Notification(t,{icon:c.default.isString(e.icon)||c.default.isUndefined(e.icon)?e.icon:e.icon.x32,body:e.body,tag:e.tag,requireInteraction:e.requireInteraction})}},{key:"close",value:function(t){t.close()}}]),e}();n.default=f},{"../Util":4,"./AbstractAgent":5}],7:[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),u=i(t("./AbstractAgent")),c=i(t("../Util")),f=function(t){function e(){return o(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return s(e,u.default),a(e,[{key:"isSupported",value:function(){return void 0!==this._win.external&&void 0!==this._win.external.msIsSiteMode}},{key:"create",value:function(t,e){return this._win.external.msSiteModeClearIconOverlay(),this._win.external.msSiteModeSetIconOverlay(c.default.isString(e.icon)||c.default.isUndefined(e.icon)?e.icon:e.icon.x16,t),this._win.external.msSiteModeActivate(),null}},{key:"close",value:function(){this._win.external.msSiteModeClearIconOverlay()}}]),e}();n.default=f},{"../Util":4,"./AbstractAgent":5}],8:[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),u=i(t("./AbstractAgent")),c=i(t("../Util")),f=i(t("../Messages")),l=function(t){function e(){return o(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return s(e,u.default),a(e,[{key:"isSupported",value:function(){return void 0!==this._win.navigator&&void 0!==this._win.navigator.serviceWorker}},{key:"getFunctionBody",value:function(t){return t.toString().match(/function[^{]+{([\s\S]*)}$/)[1]}},{key:"create",value:function(t,e,n,i,o){var r=this;this._win.navigator.serviceWorker.register(i),this._win.navigator.serviceWorker.ready.then(function(i){var s={id:t,link:n.link,origin:document.location.href,onClick:c.default.isFunction(n.onClick)?r.getFunctionBody(n.onClick):"",onClose:c.default.isFunction(n.onClose)?r.getFunctionBody(n.onClose):""};void 0!==n.data&&null!==n.data&&(s=Object.assign(s,n.data)),i.showNotification(e,{icon:n.icon,body:n.body,vibrate:n.vibrate,tag:n.tag,data:s,requireInteraction:n.requireInteraction,silent:n.silent}).then(function(){i.getNotifications().then(function(t){i.active.postMessage(""),o(t)})}).catch(function(t){throw new Error(f.default.errors.sw_notification_error+t.message)})}).catch(function(t){throw new Error(f.default.errors.sw_registration_error+t.message)})}},{key:"close",value:function(){}}]),e}();n.default=l},{"../Messages":1,"../Util":4,"./AbstractAgent":5}],9:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t){return t&&t.__esModule?t:{default:t}}(t("./AbstractAgent")),u=function(t){function e(){return i(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return r(e,a.default),s(e,[{key:"isSupported",value:function(){return void 0!==this._win.navigator.mozNotification}},{key:"create",value:function(t,e){var n=this._win.navigator.mozNotification.createNotification(t,e.body,e.icon);return n.show(),n}}]),e}();n.default=u},{"./AbstractAgent":5}],10:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t){return t&&t.__esModule?t:{default:t}}(t("./AbstractAgent")),u=function(t){function e(){return i(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return r(e,a.default),s(e,[{key:"isSupported",value:function(){return void 0!==this._win.webkitNotifications}},{key:"create",value:function(t,e){var n=this._win.webkitNotifications.createNotification(e.icon,t,e.body);return n.show(),n}},{key:"close",value:function(t){t.cancel()}}]),e}();n.default=u},{"./AbstractAgent":5}],11:[function(t,e,n){"use strict";var i=function(t){return t&&t.__esModule?t:{default:t}}(t("./classes/Push"));e.exports=new i.default("undefined"!=typeof window?window:void 0)},{"./classes/Push":3}]},{},[11])(11)});
//# sourceMappingURL=push.min.js.map

/***/ })
/******/ ])});;
//# sourceMappingURL=extension.js.map