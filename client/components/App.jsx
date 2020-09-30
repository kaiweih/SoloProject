import React from "react";

class App extends React.Component {
  componentDidMount() {
    // without proxy in webpack.config.js,
    // it will make a request to http://localhost:8080/api/md
    fetch("/api/md")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // response is .md content
        // parse it with your own logic
        // setState
        // pass parsed text to other components to render
        // console.log(response);
        const result = response
          .split("\n")
          .filter((part) => part.includes("- [ ]"));
        // .map(part => part.slice(4));
        console.log(result);
      });
    let progressPct = 40;
  }

  render() {
    return (
      <div>
        <h1>Progress Tracker</h1>
        <label for='progress'>Unit progress: </label>
        <progress id='progress' value='20' max='100'>
          {" "}
          32%{" "}
        </progress>

        {/* {bulletPoints.map((bullet) => (
          <Bullet />
        ))} */}
      </div>
    );
  }
}

export default App;
