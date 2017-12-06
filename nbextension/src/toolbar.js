/**
 * Create test toolbar
 */
export function register_view(notebook, dojotools) {
  /* Override initialize function to use Notebook register */
  dojotools.ButtonIcon.prototype.initialize = function(name, icon, help, onclick) {
    this.name = name;
    this.action = Jupyter.actions.register({
      name: name,
      icon: icon,
      help    : help,
      help_index : 'zz',
      handler : onclick

    }, name, 'jupyter-dojo')
    return this;
  };

  /* Override build function to get HTML element */
  dojotools.ButtonIcon.prototype.build = function() {
    var selector =  "#jupyter-dojo button[data-jupyter-action='jupyter-dojo:"+this.name+"']";
    this.button = document.querySelector(selector);
    this.icon = document.querySelector(selector + " i");
  }

  /* Create dojo clock and dojo view */
  var dojoClock = new dojotools.DojoClock();
  var dojoView = new dojotools.DojoView(dojoClock, function(buttons) {
    var group = buttons.map(function(button) { return button.action; });
    Jupyter.toolbar.add_buttons_group(group, 'jupyter-dojo');
  }, function(code, mode) {
    notebook.insert_cell_below(mode).set_text(code);
  }, function(number) {
    notebook.select(notebook.get_selected_index() + number);
  });
  dojoClock.interfaces.push(dojoView);
  return dojoView;
}
