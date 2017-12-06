import {
  DojoView
} from './view';


export
class LogInfo {
  startTime: Date;
  newTime: Date;
  pilot: string;
  copilot: string;

  constructor(startTime: Date, newTime: Date, pilot: string, copilot: string) {
    this.startTime = startTime;
    this.newTime = newTime;
    this.pilot = pilot;
    this.copilot = copilot;
  }

}

export
class DojoClock {
  seconds: number = 300;
  default: number = 300;
  users: LogInfo[] = [];
  startTime: Date = null;
  timer_running: boolean = false;
  registering: boolean = false;
  interfaces: DojoView[] = [];
  interval: number = null;
  pilot: string = null;
  copilot: string = null;

  secToMMSS(sec: number): string {
    let min_num = Math.floor(sec / 60);
    let minutes = String(min_num);
    let seconds = String(sec - (min_num * 60));
    if (minutes.length < 2) { minutes = "0" + minutes; }
    if (seconds.length < 2) { seconds = "0" + seconds; }
    return minutes + ":" + seconds;
  }

  display(): void {
    this.interfaces.forEach((view) => {
      view.updateTime(this.secToMMSS(this.seconds));
    });
  }

  start(): void {
    this.timer_running = true;
    this.interfaces.forEach((view) => {
      view.updatePlayPause(this.timer_running);
    });
    this.interval = setInterval(() => {
      this.display();
      if (this.seconds == 0) {
        this.pause();
        if (this.startTime == null) {
          alert("Time is up. Click ok to restart timer");
        } else {
          let newTime = new Date();
          this.users.push(
            new LogInfo(this.startTime, newTime, this.pilot, this.copilot)
          );
          this.pilot = this.copilot;
          this.copilot = prompt("Time is up. Who is the new copilot?");
          this.startTime = new Date();
        }
        this.seconds = this.default;
        this.start();
      } else {
        this.seconds--;
      }
      this.timer_running = true;
      this.interfaces.forEach((view) => {
        view.updatePlayPause(this.timer_running);
      });

    }, 1000);
    this.interfaces.forEach((view) => {
      view.updateInterval(this.interval);
    });
  }

  pause(): void {
    this.timer_running = false;
    this.interfaces.forEach((view) => {
      view.updatePlayPause(this.timer_running);
    });
    clearInterval(this.interval);
    this.interval = null;
  }

  resume(): void {
    if (!this.interval) this.start();
  }

  reset(): void {
    this.seconds = this.default;
    this.display();
    this.pause();
  }

  startRegistering(): void {
    this.registering = true;
    this.interfaces.forEach((view) => {
      view.updateRegistering(this.registering);
    });
    this.pilot = prompt("Who is the pilot?");
    this.copilot = prompt("Who is the co-pilot?");
    this.startTime = new Date();
  }

  stopRegistering(): void {
    this.registering = false;
    this.interfaces.forEach((view) => {
      view.updateRegistering(this.registering);
    });
    this.users.push(
      new LogInfo(this.startTime, new Date(), this.pilot, this.copilot)
    );
    this.startTime = null;
  }

  peopleLog(): string {
    var result = "";
    this.users.forEach((value) => {
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
  }

  configure(): void {
    var time = prompt("New time in seconds", String(this.default));
    this.default = Number(time);
    this.reset();
  }

}