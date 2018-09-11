import React from "react";
import ReactDOM from "react-dom";
import * as WorkerTimers from "worker-timers";
import moment from "moment";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      interval: 1000,
      duration: moment.duration(1500000)
    };
    this.startInterval = this.startInterval.bind(this);
  }

  tick() {
    if (+this.state.duration < 0) {
      this.stopTimer();
    } else {
      this.setState({
        duration: moment.duration(
          this.state.duration - this.state.interval,
          "milliseconds"
        )
      });
    }
  }

  startInterval() {
    WorkerTimers.setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentDidMount() {
    this.startInterval();
  }

  render() {
    return (
      <div className="App">
        <h1>PoMoDoDo</h1>
        <h2>The pomodoro client for the masses!</h2>
        <p>
          {this.state.duration.minutes() + ` ` + this.state.duration.seconds()}
        </p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
