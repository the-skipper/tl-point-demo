import React from "react";
import "./App.css";

import Map from "./Map/Map";
import Div100vh from "react-div-100vh";
import CSVDropzone from "./Dropzone/Dropzone";
import PointList from "./pointList/PointList";
import PublishButton from "./PublishButton/PublishButton";

import { CsvProvider } from "./CsvContext";
// import StepProgressBar from "./ProgressBar/StepProgressBar";
// import GroupInput from "./Input/Input";
import axios from "axios";
// const InputExampleInput = () => <Input placeholder="Search..." />;
import { Button, Icon, Input, List } from "semantic-ui-react";
import { useState, useEffect } from "react";


function App() {
  const [state, setState] = useState({
    groups: [],
    groupInputVal: "",
    cronInputVal: "",
    selectedGroup: ""
  });
  useEffect(() => {
    async function getGroups() {
      try {
        const res = await axios(
          "https://g84ric8qt4.execute-api.eu-west-3.amazonaws.com/live/group"
        );
        setState({ ...state, groups: res.data.groups });
      } catch (e) {}
    }
    getGroups();
  }, []);

  async function updateCron(value) {
    try {
      const res = await axios.put(
        "https://g84ric8qt4.execute-api.eu-west-3.amazonaws.com/live/cron",
        { cron: value }
      );
      console.log(res.data.message);
      // setState({ ...state, groups: res.data.groups });
    } catch (e) {}
  }

  function removeOrAppend(val, arr) {
    let result = [];
    if (arr.includes(val)) {
      result = arr.filter(e => e !== val);
    } else {
      result = [...arr, val];
    }
    return result;
  }

  function animateNextStep(e, direction = 1) {
    let key = direction < 0 ? "previousElementSibling" : "nextElementSibling";
    let nextStep = e.target.parentElement[key];
    if (nextStep) nextStep.scrollIntoView();
  }
  return (
    <Div100vh className="App">
      <CsvProvider>
        <div className="Map-container">
          <Map apikey="wlXELNhyBeWmzLjRPGLyer107TNO1Y7Y4B7bvAlPAI4"></Map>
        </div>
        <div className="ui-container">
          {/* <StepProgressBar /> */}
          <div className="step-view">
            <div className="step">
              <div className="step-description">
                <h2>Step 1.</h2>
                <p>Select/Create a group.</p>
              </div>
              {/* <GroupInput></GroupInput> */}
              <Input
                className="group-input"
                fluid={true}
                action={{
                  content: "Add",
                  onClick: () => {
                    setState({
                      ...state,
                      groups: removeOrAppend(state.groupInputVal, state.groups)
                    });
                  }
                }}
                onChange={(e, d) => {
                  setState({ ...state, groupInputVal: d.value });
                }}
                placeholder="Enter group name"
              />
              <List
                className="group-list"
                divided
                relaxed
                onItemClick={(e, d) => {
                  setState({ ...state, selectedGroup: d.content });
                }}
                items={state.groups}
              />
              <Button
                icon
                primary
                fluid
                labelPosition="right"
                onClick={e => animateNextStep(e)}
              >
                Next
                <Icon name="right arrow" />
              </Button>
            </div>
            <div className="step">
              <div className="step-description">
                <h2>Step 2.</h2>
                <p>Upload CSV file for {state.selectedGroup} group</p>
              </div>
              <CSVDropzone />
              <Button
                icon
                primary
                labelPosition="left"
                onClick={e => animateNextStep(e, -1)}
              >
                Back
                <Icon name="left arrow" />
              </Button>
              <Button
                icon
                primary
                labelPosition="right"
                onClick={e => animateNextStep(e)}
              >
                Next
                <Icon name="right arrow" />
              </Button>
            </div>
            <div className="step">
              <div className="step-description">
                <h2>Step 3.</h2>
                <p>Select origin and data points</p>
              </div>
              <div className="point-lists">
                <PointList pointType="o" />
                <PointList pointType="d" />
              </div>
              <Button
                icon
                primary
                labelPosition="left"
                onClick={e => animateNextStep(e, -1)}
              >
                Back
                <Icon name="left arrow" />
              </Button>
              <Button
                icon
                primary
                labelPosition="right"
                onClick={e => animateNextStep(e)}
              >
                Next
                <Icon name="right arrow" />
              </Button>
            </div>
            <div className="step">
              <h2>Step 4.</h2>
              <p>Set cron interval and publish group</p>
              <Input
                className="group-input"
                fluid={true}
                action={{
                  content: "Set",
                  onClick: async () => {
                    setState({
                      ...state,
                      cron: state.cronInputVal
                    });
                    await updateCron(state.cronInputVal);
                  }
                }}
                onChange={(e, d) => {
                  setState({ ...state, cronInputVal: d.value });
                }}
                placeholder="Enter valid cron expression"
              />
              <PublishButton selectedGroup={state.selectedGroup}/>
              {/* <Button
                icon
                primary
                fluid
                labelPosition="right"
                onClick={() => {}}
              >
                Publish group
              </Button> */}
              <Button
                icon
                primary
                fluid
                labelPosition="left"
                onClick={e => animateNextStep(e, -1)}
              >
                Back
                <Icon name="left arrow" />
              </Button>
            </div>
          </div>
        </div>
      </CsvProvider>
    </Div100vh>
  );
}

export default App;
