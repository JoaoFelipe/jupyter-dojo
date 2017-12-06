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
export function load_ipython_extension() {
  define([
    'nbextensions/jupyter_dojo/index',
    'base/js/namespace', 'base/js/events', 'base/js/utils',
    'notebook/js/codecell',
    '@jupyter_dojo/base'
  ], (Extension, Jupyter, events, utils, codecell, dojotools) => {

    let notebook = Jupyter.notebook;

    let dojoView = Extension.register_view(notebook, dojotools);
    Extension.register_renderer(notebook, dojoView);
    Extension.register_highlight(Jupyter, events, utils, codecell);
    Extension.render_cells(notebook);
  });
}
