import React from "react";
import "./App.css";

import Map from "./Map/Map";
import Div100vh from "react-div-100vh";
import CSVDropzone from "./Dropzone/Dropzone";
import ODList from "./ODList/ODList";

import { CsvProvider } from "./CsvContext";

function App() {
  return (
    <Div100vh className="App">
      <CsvProvider>
        <div className="Map-container">
          <Map apikey="wlXELNhyBeWmzLjRPGLyer107TNO1Y7Y4B7bvAlPAI4"></Map>
        </div>
        <div className="Point-list-container">
          <CSVDropzone />
          <div id="save">
            <p>Query Interval :</p>
            <input></input>
            <div>Save</div>
          </div>
          <ODList />
        </div>
      </CsvProvider>
    </Div100vh>
  );
}

export default App;
