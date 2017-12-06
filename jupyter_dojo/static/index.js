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


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "register_renderer", {
  enumerable: true,
  get: function get() {
    return _renderer.register_renderer;
  }
});
Object.defineProperty(exports, "render_cells", {
  enumerable: true,
  get: function get() {
    return _renderer.render_cells;
  }
});
Object.defineProperty(exports, "register_view", {
  enumerable: true,
  get: function get() {
    return _toolbar.register_view;
  }
});
Object.defineProperty(exports, "register_highlight", {
  enumerable: true,
  get: function get() {
    return _highlight.register_highlight;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function get() {
    return _package.version;
  }
});

var _renderer = __webpack_require__(1);

var _toolbar = __webpack_require__(2);

var _highlight = __webpack_require__(3);

var _package = __webpack_require__(4);

/**
 * Entry point for the notebook bundle containing custom model definitions.
 * Setup notebook base URL
 * Some static assets may be required by the custom widget javascript. The base
 * url for the notebook is not known at build time and is therefore computed
 * dynamically.
 */
__webpack_require__.p = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/jupyter_dojo/';
/**
 * Export widget models and views, and the npm package version number.
 */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register_renderer = register_renderer;
exports.render_cells = render_cells;
var MIME_TYPE = 'application/unittest.status+json';
/**
 * Register the mime type and append_mime function with the notebook's
 * output area
 */

function register_renderer(notebook, dojoView) {
  /* Get an instance of output_area from a CodeCell instance */
  var _notebook$get_cells$r = notebook.get_cells().reduce(function (result, cell) {
    return cell.output_area ? cell : result;
  }, {}),
      output_area = _notebook$get_cells$r.output_area;
  /* A function to render output of 'application/unittest.status+json' mime type */


  var append_mime = function append_mime(data, metadata, element) {
    dojoView.renderResult(data);
  };
  /**
   * Register the mime type and append_mime function with output_area
   */


  output_area.register_mime_type(MIME_TYPE, append_mime, {
    safe: true,
    index: 0
  });
}
/**
 * Re-render cells with output data of 'application/unittest.status+json' mime type
 */


function render_cells(notebook) {
  /* Get all cells in notebook */
  notebook.get_cells().forEach(function (cell) {
    /* If a cell has output data of 'application/unittest.status+json' mime type */
    if (cell.output_area && cell.output_area.outputs.find(function (output) {
      return output.data && output.data[MIME_TYPE];
    })) {
      /* Re-render the cell */
      notebook.render_cell_output(cell);
    }
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register_view = register_view;

/**
 * Create test toolbar
 */
function register_view(notebook, dojotools) {
  /* Override initialize function to use Notebook register */
  dojotools.ButtonIcon.prototype.initialize = function (name, icon, help, onclick) {
    this.name = name;
    this.action = Jupyter.actions.register({
      name: name,
      icon: icon,
      help: help,
      help_index: 'zz',
      handler: onclick
    }, name, 'jupyter-dojo');
    return this;
  };
  /* Override build function to get HTML element */


  dojotools.ButtonIcon.prototype.build = function () {
    var selector = "#jupyter-dojo button[data-jupyter-action='jupyter-dojo:" + this.name + "']";
    this.button = document.querySelector(selector);
    this.icon = document.querySelector(selector + " i");
  };
  /* Create dojo clock and dojo view */


  var dojoClock = new dojotools.DojoClock();
  var dojoView = new dojotools.DojoView(dojoClock, function (buttons) {
    var group = buttons.map(function (button) {
      return button.action;
    });
    Jupyter.toolbar.add_buttons_group(group, 'jupyter-dojo');
  }, function (code, mode) {
    notebook.insert_cell_below(mode).set_text(code);
  }, function (number) {
    notebook.select(notebook.get_selected_index() + number);
  });
  dojoClock.interfaces.push(dojoView);
  return dojoView;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register_highlight = register_highlight;

/**
* Register the on demand syntax highlight
*/
function register_highlight(Jupyter, events, utils, codecell) {
  function activateMonitor(cell) {
    if (cell instanceof codecell.CodeCell) {
      /* Define event for checking the highlight */
      var changecode = function changecode() {
        var split = cell.code_mirror.getValue().split(" ");

        if (split && split[0] == "%%write" && split.length > 2) {
          utils.requireCodeMirrorMode(split[1], function (mode) {
            console.log('Found:', mode, split[1]);
            var mode = 'magic_' + split[1];

            if (!Jupyter.CodeCell.options_default.highlight_modes[mode]) {
              Jupyter.CodeCell.options_default.highlight_modes[mode] = {
                'reg': []
              };
            }

            var regex = new RegExp('^%%write ' + split[1]);

            if (Jupyter.CodeCell.options_default.highlight_modes[mode].reg.indexOf(regex) == -1) {
              Jupyter.CodeCell.options_default.highlight_modes[mode].reg.push(regex);
            }

            cell.auto_highlight();
          }, function () {
            return console.log('Not found:', split[1]);
          });
        }
      };
      /* Set event on code change */


      var pending;
      cell.code_mirror.on('change', function () {
        clearTimeout(pending);
        pending = setTimeout(changecode, 400);
      });
      changecode();
    }
  }

  function initExistingCells() {
    var cells = Jupyter.notebook.get_cells();
    var ncells = Jupyter.notebook.ncells();

    for (var i = 0; i < ncells; i++) {
      var cell = cells[i];
      activateMonitor(cells[i]);
    }

    events.on('create.Cell', function (event, nbcell) {
      return activateMonitor(nbcell.cell);
    });
  }

  if (Jupyter.notebook._fully_loaded) {
    setTimeout(function () {
      console.log('Dojotools: Wait for', 1000, 'ms');
      initExistingCells();
    }, 1000);
  } else {
    events.one('notebook_loaded.Notebook', initExistingCells);
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"name":"@jupyter_dojo/nbextension","version":"0.1.0","description":"A Jupyter Notebook extension for rendering unittest","author":"Joao Felipe Pimentel <joaofelipenp@gmail.com>","main":"lib/index.js","keywords":["jupyter","jupyterlab","jupyterlab extension"],"scripts":{"build":"webpack","watch":"watch \"npm run build\" src --wait 10 --ignoreDotFiles","prepublish":"npm run build","extension:install":"jupyter nbextension install --symlink --py --sys-prefix notebook_json","extension:uninstall":"jupyter nbextension uninstall --py --sys-prefix notebook_json","extension:enable":"jupyter nbextension enable --py --sys-prefix notebook_json","extension:disable":"jupyter nbextension disable --py --sys-prefix notebook_json"},"dependencies":{"@jupyter_dojo/base":"^0.1.2"},"devDependencies":{"@babel/core":"^7.0.0-beta.34","@babel/preset-env":"^7.0.0-beta.34","babel-loader":"^8.0.0-beta.0","css-loader":"^0.28.7","file-loader":"^1.1.5","json-loader":"^0.5.7","style-loader":"^0.19.0","url-loader":"^0.6.2","watch":"^1.0.2","webpack":"^3.10.0"},"repository":{"type":"git","url":"https://github.com/JoaoFelipe/jupyter-dojo.git"},"bugs":{"url":"https://github.com/JoaoFelipe/jupyter-dojo/issues"},"license":"MIT"}

/***/ })
/******/ ])});;
//# sourceMappingURL=index.js.map