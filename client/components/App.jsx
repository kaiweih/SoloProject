import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      helperCount: 0,
      progressPct: 0,
      readme: "",
      bulletPoints: [
        {
          task:
            "Learn how to use Webpack in production mode for a React project",
          numsOfNeedHelp: Math.floor(Math.random() * 10),
          numsOfCanHelp: Math.floor(Math.random() * 10),
          isNeedHelpClick: false,
          isCanHelpClick: false,
          isClicked: false,
        },
        {
          task:
            "Learn how to use Webpack-dev-server in development mode for fast development and live-reloading",
          numsOfNeedHelp: Math.floor(Math.random() * 10),
          numsOfCanHelp: Math.floor(Math.random() * 10),
          isNeedHelpClick: false,
          isCanHelpClick: false,
          isClicked: false,
        },
        {
          task:
            "Utilize the proxy setting in Webpack-dev-server for utilizing an Express API server (back end) in combination with a React project (front end) for a streamlined codebase in both production and development mode",
          numsOfNeedHelp: Math.floor(Math.random() * 10),
          numsOfCanHelp: Math.floor(Math.random() * 10),
          isNeedHelpClick: false,
          isCanHelpClick: false,
          isClicked: false,
        },
        {
          task:
            "Learn how to use Gulp with Browserify to start a project in React as an alternative tool",
          numsOfNeedHelp: Math.floor(Math.random() * 10),
          numsOfCanHelp: Math.floor(Math.random() * 10),
          isNeedHelpClick: false,
          isCanHelpClick: false,
          isClicked: false,
        },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ readme: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const bulletPoints = this.state.readme
      .split("\n")
      .filter((part) => part.includes("- [ ] "))
      .map((part) => part.slice(6));

    this.setState({ bulletPoints });

    // from bulletpoints, we render a list of Task
    // bulletpoints = []
  }

  updateNeedHelp(task) {
    const newBulletPoints = this.state.bulletPoints.map((bulletPoint) => {
      if (bulletPoint.task === task) {
        if (!bulletPoint.isClicked) {
          return {
            ...bulletPoint,
            numsOfNeedHelp: bulletPoint.numsOfNeedHelp + 1,
            isNeedHelpClick: true,
            isClicked: true,
          };
        }
        if (bulletPoint.isClicked && bulletPoint.isCanHelpClick) {
          return {
            ...bulletPoint,
            numsOfNeedHelp: bulletPoint.numsOfNeedHelp + 1,
            numsOfCanHelp: bulletPoint.numsOfCanHelp - 1,
            isCanHelpClick: false,
            isNeedHelpClick: true,
          };
        }
      }

      return bulletPoint;
    });

    this.setState({ bulletPoints: newBulletPoints });
  }

  updateCanHelp(task) {
    const newBulletPoints = this.state.bulletPoints.map((bulletPoint) => {
      if (bulletPoint.task === task) {
        if (!bulletPoint.isClicked) {
          return {
            ...bulletPoint,
            numsOfCanHelp: bulletPoint.numsOfCanHelp + 1,
            isCanHelpClick: true,
            isClicked: true,
          };
        }

        if (bulletPoint.isClicked && bulletPoint.isNeedHelpClick) {
          return {
            ...bulletPoint,
            numsOfNeedHelp: bulletPoint.numsOfNeedHelp - 1,
            numsOfCanHelp: bulletPoint.numsOfCanHelp + 1,
            isCanHelpClick: true,
            isNeedHelpClick: false,
          };
        }
      }

      return bulletPoint;
    });

    this.setState({ bulletPoints: newBulletPoints });
  }

  //  this.state.bulletPoints.length

  render() {
    const totalCanHelps = this.state.bulletPoints.reduce((total, task) => {
      if (task.isCanHelpClick) total += 1;
      return total;
    }, 0);

    const percentage = Math.floor(
      (totalCanHelps / this.state.bulletPoints.length) * 100
    );

    const tasks = this.state.bulletPoints.map((bulletPoint) => (
      <Task
        key={bulletPoint.task}
        bulletPoint={bulletPoint}
        updateNeedHelp={() => this.updateNeedHelp(bulletPoint.task)}
        updateCanHelp={() => this.updateCanHelp(bulletPoint.task)}
      />
    ));

    return (
      <div>
        <UnitProgress value={percentage} max={100} />
        {tasks}
        <form onSubmit={this.handleSubmit}>
          <br></br>
          <label for='readme'>Paste README.md here:</label>
          <br></br>
          <textarea
            type='text'
            id='readme'
            name='readme'
            value={this.state.readme}
            onChange={this.handleChange}
          />
          <br></br>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };

    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleCheckBox(event) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <input
          type='checkbox'
          id='task1'
          name='task1'
          value='task1'
          onChange={this.handleCheckBox}
          checked={this.state.isOpen}
        />
        <label for='task1'>{this.props.bulletPoint.task}</label>

        <div>
          <button onClick={this.props.updateNeedHelp}>I need help</button>
          <span>{this.props.bulletPoint.numsOfNeedHelp}</span>
          <button onClick={this.props.updateCanHelp}>I can help</button>
          <span>{this.props.bulletPoint.numsOfCanHelp}</span>
        </div>
      </div>
    );
  }
}

class UnitProgress extends React.Component {
  render() {
    return (
      <div>
        <h1>Progress Tracker</h1>
        <label for='progress'>Unit progress: </label>
        <progress
          id='progress'
          value={this.props.value}
          max={this.props.max}
        ></progress>
      </div>
    );
  }
}

export default App;

// class App extends React.Component {
//   componentDidMount() {
//     // without proxy in webpack.config.js,
//     // it will make a request to http://localhost:8080/api/md
//     fetch("/api/md")
//       .then((response) => {
//         return response.json();
//       })
//       .then((response) => {
//         // response is .md content
//         // parse it with your own logic
//         // setState
//         // pass parsed text to other components to render
//         // console.log(response);
//         const result = response
//           .split("\n")
//           .filter((part) => part.includes("- [ ]"));
//         // .map(part => part.slice(4));
//         console.log(result);
//       });
//   }
