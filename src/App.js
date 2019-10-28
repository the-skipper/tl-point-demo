import React from "react";
import "./App.css";

import Map from "./Map/Map";
import Div100vh from "react-div-100vh";
import CSVDropzone from "./Dropzone/Dropzone";
import PointList from "./pointList/PointList";

import { CsvProvider } from "./CsvContext";
import StepProgressBar from "./ProgressBar/StepProgressBar";

function App() {
  return (
    <Div100vh className="App">
      <CsvProvider>
        <div className="Map-container">
          <Map apikey="wlXELNhyBeWmzLjRPGLyer107TNO1Y7Y4B7bvAlPAI4"></Map>
        </div>
<<<<<<< HEAD
        <div className="Point-list-container">
          <CSVDropzone />
          <div id="save">
            <p>Query Interval :</p>
            <input></input>
            <div>Save</div>
          </div>
          <ODList />
=======
        <div className="ui-container">
          <StepProgressBar />
          <div className="step-view">
            <div className="step"></div>
            <div className="step">
              <CSVDropzone />
            </div>
            <div className="step">
              <div className="point-lists">
                <PointList pointType="o" />
                <PointList pointType="d" />
              </div>
            </div>
            <div className="step"></div>
          </div>
          {/* <CSVDropzone /> */}
>>>>>>> ebf5ecc159a3d808798d6590a36341cd11cd3737
        </div>
      </CsvProvider>
    </Div100vh>
  );
}

export default App;
