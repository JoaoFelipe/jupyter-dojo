import {
  DojoClock
} from './clock';

import * as Push from "push.js";

export
class ButtonIcon {

  button: HTMLElement;
  icon: HTMLElement;

  initialize(name: string, icon: string, help: string, onclick: () => void): ButtonIcon { return this; }
  build(): void {}
}

export
interface TestStatus {
  color: string;
  message: string;
  previous: number;
}

export
class DojoView {

  mouseOver: boolean = false;
  showButtons: boolean = false;
  showTootips: boolean = false;

  buttons: ButtonIcon[];
  test_button: ButtonIcon;
  create_button: ButtonIcon;
  list_log_button: ButtonIcon;
  register_log_button: ButtonIcon;
  play_pause_button: ButtonIcon;
  time_button: ButtonIcon;
  reset_button: ButtonIcon;
  configure_button: ButtonIcon;
  tooltip_button: ButtonIcon;

  intervalElement: HTMLElement = null;
  timerElement: HTMLElement  = null;

  incActive: (count: number) => void;


  constructor(dojoClock: DojoClock, middle: (buttons: ButtonIcon[]) => void, insertCellBelow: (content: string, mode: string) => void, incActive: (count: number) => void) {
    this.incActive = incActive;
    this.mouseOver = false;
    this.showButtons = true;

    this.buttons = [];
    this.test_button = this.new_button(
      'dojo-test-toggle',
      'fa-text-width',
      'Toggle Test Tools',
      () => {
        this.toggleTool();
      }
    );

    this.create_button = this.new_button(
      'dojo-create',
      'fa-group',
      'Create dojo',
      () => {
        var fn = prompt("Function Name?");
        insertCellBelow("%%unittest -p 1\nassert " + fn + "() == 0", "code");
        insertCellBelow("def " + fn + "():\n    pass", "code");
        insertCellBelow("%load_ext ipython_unittest", "code");
      }
    );

    this.create_button = this.new_button(
      'dojo-list-log',
      'fa-list',
      'Copy people log to new cell',
      () => {
        insertCellBelow(dojoClock.peopleLog(), "markdown");
      }
    );

    this.register_log_button = this.new_button(
      'dojo-register-log',
      'fa-user',
      'Log people',
      () => {
        if (dojoClock.registering) {
          dojoClock.stopRegistering();
        } else {
          dojoClock.startRegistering();
        }
      }
    )

    this.play_pause_button = this.new_button(
      'dojo-play-pause',
      'fa-play',
      'Play/Pause time',
      () => {
        dojoClock.timer_running ? dojoClock.pause() : dojoClock.resume();
      }
    )

    this.time_button = this.new_button(
      'dojo-time',
      'fa-eye-slash',
      'Toggle timer',
      () => {
        this.toggleEye();
      }
    )

    this.reset_button = this.new_button(
      'dojo-reset-time',
      'fa-refresh',
      'Reset time',
      () => {
        dojoClock.reset();
      }
    )

    this.configure_button = this.new_button(
      'dojo-configure-time',
      'fa-wrench',
      'Configure time',
      () => {
        dojoClock.configure();
      },
    )

    this.tooltip_button = this.new_button(
      'dojo-tooltips',
      'fa-comment-o',
      'Toggle tooltips',
      () => {
        this.toggleTooltip();
      }
    )

    middle(this.buttons);

    for (var button of this.buttons) {
      button.build();
    }

    this.timerElement = document.createElement("span") as HTMLElement;
    this.timerElement.id = "dojo-timer-time";
    this.timerElement.style.margin = "0 5px";
    this.timerElement.style.color = "black";
    this.timerElement.innerHTML = "05:00";

    this.intervalElement = document.createElement("span") as HTMLElement;
    this.intervalElement.id = "dojo-timer-interval";
    this.intervalElement.style.margin = "0 5px";
    this.intervalElement.style.display = "none";

    let eye = this.time_button.icon;
    eye.parentNode.insertBefore(this.timerElement, eye.nextSibling);
    eye.parentNode.insertBefore(this.intervalElement, eye.nextSibling);

    let eyeb = this.time_button.button;
    eyeb.style.width = "80px";
    eyeb.addEventListener("mouseenter", () => {
      if (eye.classList.contains("fa-eye-slash")) {
        this.mouseOver = true;
        this.viewText();
      }
    }, false);

    eyeb.addEventListener("mouseleave", () => {
      this.mouseOver = false;
      this.viewText();
    }, false);

    this.toggleTool();
  }

  new_button(name: string, icon: string, help: string, onclick: () => void): ButtonIcon {
    let button = new ButtonIcon().initialize(name, icon, help, onclick);
    this.buttons.push(button);
    return button;
  }

  cleanup(): void {
    clearInterval(Number(this.intervalElement.textContent));
  }

  setColor(color: string): void {
    if (this.showButtons) {
      this.time_button.button.style.background = color;
    } else {
      this.test_button.button.style.background = color;
    }
  }

  toggleEye(): void {
    if (this.time_button.icon.classList.contains("fa-eye-slash")) {
      this.time_button.icon.classList.remove("fa-eye-slash");
      this.time_button.icon.classList.add("fa-eye");
    } else {
      this.time_button.icon.classList.remove("fa-eye");
      this.time_button.icon.classList.add("fa-eye-slash");
    }
    this.viewText();
  }

  toggleTool(): void {
    if (this.showButtons) {
      this.test_button.button.style.background = this.time_button.button.style.background;
      this.time_button.button.style.background = "transparent";
    } else {
      this.time_button.button.style.background = this.test_button.button.style.background;
      this.test_button.button.style.background = "transparent";
    }

    this.showButtons = !this.showButtons;
    for (var button of this.buttons) {
      if (button != this.test_button) {
        button.button.style.display = this.showButtons? "block": "none";
      }
    }
  }

  toggleTooltip(): void {
    if (this.tooltip_button.icon.classList.contains("fa-comment-o")) {
      this.tooltip_button.icon.classList.remove("fa-comment-o");
      this.tooltip_button.icon.classList.add("fa-comment");
    } else {
      this.tooltip_button.icon.classList.remove("fa-comment");
      this.tooltip_button.icon.classList.add("fa-comment-o");
    }
    this.showTootips = this.tooltip_button.icon.classList.contains("fa-comment");
  }

  updatePlayPause(running: boolean): void {
    if (!running) {
      this.play_pause_button.icon.classList.remove("fa-pause");
      this.play_pause_button.icon.classList.add("fa-play");
    } else {
      this.play_pause_button.icon.classList.remove("fa-play");
      this.play_pause_button.icon.classList.add("fa-pause");
    }
    this.viewText();
  }

  updateTime(time: string): void {
    this.timerElement.textContent = time;
  }

  updateInterval(interval: number): void {
    this.intervalElement.textContent = String(interval);
  }

  updateRegistering(registering: boolean): void {
    if (registering) {
      this.register_log_button.icon.classList.remove("fa-user");
      this.register_log_button.icon.classList.add("fa-times");
      this.register_log_button.button.title = "Stop logging people";
    } else {
      this.register_log_button.icon.classList.remove("fa-times");
      this.register_log_button.icon.classList.add("fa-user");
      this.register_log_button.button.title = "Log people";
    }
  }

  viewText(): void {
    if (this.time_button.icon.classList.contains("fa-eye") ||
        this.play_pause_button.icon.classList.contains("fa-play") ||
        this.mouseOver) {
      this.timerElement.style.color = "black";
    } else {
      this.timerElement.style.color = "transparent";
    }
  }

  renderResult(value: TestStatus): void {
    let color = value["color"] || "transparent";
    this.setColor(color);

    if (value["message"] && this.showTootips) {
      let canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      let ctx = canvas.getContext('2d');
      let config = {
        body: value["message"],
        tag: "unittest",
        icon: ""
      };
      if (ctx) {
        ctx.fillStyle = value['color'] || "transparent";
        ctx.fillRect(0,0,128,128);
        config.icon = canvas.toDataURL('image/png','');
      }
      Push.close('unittest');
      Push.create('Test Result', config);
    }

    this.incActive(value["previous"] || 0);
  }

}