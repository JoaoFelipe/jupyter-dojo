import { ToolbarButton } from '@jupyterlab/apputils';
import { NotebookPanel } from '@jupyterlab/notebook';
import { ButtonIcon, DojoView, DojoClock } from '@jupyter_dojo/base';


export class ExtendedBtn extends ButtonIcon {
    toolbar: ToolbarButton;
    name: string;
    initialize(name: string, icon: string, help: string, onclick: () => void): ButtonIcon {
        this.toolbar = new ToolbarButton({
            className: "jupyter-dojo " + name,
            onClick: onclick,
            tooltip: help
        });
        this.name = name;
        this.button = this.toolbar.node;
        this.icon = document.createElement('i');
        this.icon.classList.add('fa', icon);
        this.button.appendChild(this.icon);
        return this;
    }
    build(): void { }
}

export class ExtendedDojoView extends DojoView {
    new_button(name: string, icon: string, help: string, onclick: () => void): ButtonIcon {
        var button = new ExtendedBtn().initialize(name, icon, help, onclick);
        this.buttons.push(button);
        return button;
    }
}

export interface ViewResult {
    dojoView: ExtendedDojoView;
    group: ExtendedBtn[];
}

export function register_view(panel: NotebookPanel): ViewResult {
    var group: ExtendedBtn[];
    var dojoClock = new DojoClock();
    var dojoView = new ExtendedDojoView(dojoClock, function (buttons) {
        group = buttons as ExtendedBtn[];
        group.reverse();
        for (let btn of group) {
            panel.toolbar.insertItem(0, btn.name, btn.toolbar);
        }
    }, function (code, mode) {
        var model = panel.notebook.model;
        var cell = null;
        if (mode == "code") {
            cell = model.contentFactory.createCodeCell({});
        }
        else if (mode == "markdown") {
            cell = model.contentFactory.createMarkdownCell({});
        }
        else {
            cell = model.contentFactory.createRawCell({});
        }
        cell.value.text = code;
        model.cells.insert(panel.notebook.activeCellIndex + 1, cell);
    }, function (number) {
        panel.notebook.activeCellIndex += number;
    });
    dojoClock.interfaces.push(dojoView);
    return {
        dojoView: dojoView,
        group: group
    };
}
