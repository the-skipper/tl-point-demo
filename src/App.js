import React from "react";
import "./App.css";

import Map from "./Map/Map";
import Div100vh from "react-div-100vh";
import CSVDropzone from "./Dropzone/Dropzone";
import PointList from "./pointList/PointList";

import { CsvProvider } from "./CsvContext";
import StepProgressBar from "./ProgressBar/StepProgressBar";
import GroupInput from "./Input/Input";
import axios from "axios";
// const InputExampleInput = () => <Input placeholder="Search..." />;
import useCsvData from "./useCsvData";
import { Button, Icon, List } from "semantic-ui-react";
import { useState, useEffect } from "react";

function App() {
  const { data } = useCsvData();
  const [state, setState] = useState({ groups: [] });
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

  function scrollView(e) {
    console.log(e._targetInst)
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
              <GroupInput></GroupInput>
              <List
                className="group-list"
                divided
                relaxed
                items={state.groups}
              />
              <Button icon primary fluid labelPosition="right" onClick={(e)=>{scrollView(e);}}>
                Next
                <Icon name="right arrow" />
              </Button>
            </div>
            <div className="step">
              <div className="step-description">
                <h2>Step 2.</h2>
                <p>Upload CSV file for group</p>
              </div>
              <CSVDropzone />
              <Button icon primary fluid labelPosition="right">
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
              <Button icon primary fluid labelPosition="right">
                Next
                <Icon name="right arrow" />
              </Button>
            </div>
            <div className="step">
              <h2>Step 4.</h2>
              <p>Set cron interval and publish group</p>
              <Button icon primary fluid labelPosition="right">
                Publish group
              </Button>
            </div>
          </div>
        </div>
      </CsvProvider>
    </Div100vh>
  );
}

export default App;
