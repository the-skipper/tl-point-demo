import React from "react";
import "./App.css";

import Map from "./Map/Map";
import Div100vh from "react-div-100vh";
import CSVDropzone from "./Dropzone/Dropzone";
import PointList from "./pointList/PointList";
import PublishButton from "./PublishButton/PublishButton";
import { CsvProvider } from "./CsvContext";
import axios from "axios";
import { Button, Icon, Input, List } from "semantic-ui-react";
import { useState, useEffect } from "react";
import PulseIcon from "./PulseIcon/PulseIcon";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function App() {
  /**
   * Separate each state object in separate userState
   * Better practce.
   * 
   */
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
          // "https://g84ric8qt4.execute-api.eu-west-3.amazonaws.com/live/group"
          "https://0v3zjmzna4.execute-api.eu-west-3.amazonaws.com/live/group"
        );
        setState({groups: res.data.groups })
      } catch (e) {
        return e;
      }
    }
    getGroups();
  }, []);

  async function updateCron(value) {
    let request = {
      host: "g84ric8qt4.execute-api.eu-west-3.amazonaws.com",
      method: "PUT",
      // url: `https://g84ric8qt4.execute-api.eu-west-3.amazonaws.com/live/cron`,
      url:` https://0v3zjmzna4.execute-api.eu-west-3.amazonaws.com/live/cron`,
      data: { cron: value }, // object describing the foo
      body: JSON.stringify({ cron: value }), // aws4 looks for body; axios for data
      path: `/live/cron`,
      headers: {
        "content-type": "application/json"
      }
    };
    try {
      await axios(request);
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
          <div className="step-view">
            <div className="step">
              <div className="step-description">
                <h2>Step 1.</h2>
                <p>Select/Create a group.</p>
              </div>
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
              <List celled inverted className="group-list">
                {state.groups.map(group => {
                  return (
                    <List.Item
                      key={group}
                      className={
                        state.selectedGroup === group ? "selected" : ""
                      }
                      onClick={(e, d) => {
                        let selected = e.target.lastChild.firstChild.innerText;
                        toast.info(`Group ${selected} selected!`,{autoClose:2300});
                        setState({
                          ...state,
                          selectedGroup: selected
                        });
                      }}
                    >
                      <PulseIcon />
                      <List.Content>
                        <List.Header>{group}</List.Header>
                        created At : -
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
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
                secondary
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
                secondary
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
              <PublishButton selectedGroup={state.selectedGroup} />
              <Button
                icon
                secondary
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
