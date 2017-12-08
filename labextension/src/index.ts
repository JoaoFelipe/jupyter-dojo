
import { JupyterLabPlugin, JupyterLab } from '@jupyterlab/application';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { IDisposable, DisposableDelegate } from '@phosphor/disposable';
import { register_view } from './toolbar'
import { register_renderer } from './renderer'
import { register_highlight } from './highlight'
import "../style/index.css";

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    	
    	var viewResult = register_view(panel);
        register_renderer(panel, viewResult.dojoView);
        register_highlight(panel);
        
        return new DisposableDelegate(() => {
            for (let btn of viewResult.group) {
                btn.toolbar.dispose();
            }
        });

    }
}

/**
 * Activate the extension.
 */
function activate(app: JupyterLab) {
    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
}
;
export const plugin: JupyterLabPlugin<void> = {
    activate: activate,
    id: 'jupyterlab_dojo',
    autoStart: true
};
export default plugin;
