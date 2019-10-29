import React from "react";
import "./App.css";

import Map from "./Map/Map";
import Div100vh from "react-div-100vh";
import CSVDropzone from "./Dropzone/Dropzone";
import PointList from "./pointList/PointList";

import { CsvProvider } from "./CsvContext";
import StepProgressBar from "./ProgressBar/StepProgressBar";
import GroupInput from "./Input/Input";

// const InputExampleInput = () => <Input placeholder="Search..." />;
import useCsvData from "./useCsvData";

function App() {
  const { addGroup } = useCsvData();
  return (
    <Div100vh className="App">
      <CsvProvider>
        <div className="Map-container">
          <Map apikey="wlXELNhyBeWmzLjRPGLyer107TNO1Y7Y4B7bvAlPAI4"></Map>
        </div>
        <div className="ui-container">
          <StepProgressBar />
          <div className="step-view">
            <div className="step">
              <div className="step-description">
                <h2>Step 1.</h2>
                <p>Select/Create a group.</p>
              </div>
              <GroupInput></GroupInput>
            </div>
            <div className="step">
              <div className="step-description">
                <h2>Step 2.</h2>
                <p>Upload CSV file for group</p>
              </div>
              <CSVDropzone />
            </div>
            <div className="step">
              <div className="step-description">
                <h2>Step 3.</h2>
                <p>Upload CSV file for group</p>
              </div>
              <div className="point-lists">
                <PointList pointType="o" />
                <PointList pointType="d" />
              </div>
            </div>
            <div className="step"></div>
          </div>
        </div>
      </CsvProvider>
    </Div100vh>
  );
}

export default App;
