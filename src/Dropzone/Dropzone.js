import * as Papa from "papaparse";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv} from "@fortawesome/free-solid-svg-icons";

import useCsvData from "../useCsvData";

const parseCSV = async file => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      config: { dynamicTyping: true, header: true },
      complete: json => {
        resolve(json);
      },
      error: function(err,reason) {
        reject({ err, reason });
      }
    });
  });
};

function CSVDropzone() {
  const { setData } = useCsvData();
  const onDrop = useCallback(async acceptedFiles => {
    setData(await parseCSV(acceptedFiles[0]));
  }, [setData]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv"
  });

  return (
    <div {...getRootProps()} className="csv-dropzone" types="images">
      <input {...getInputProps()} />
      <p>
        <FontAwesomeIcon icon={faFileCsv} size="2x" fixedWidth />
        <br />
        Upload CSV
      </p>
    </div>
  );
}

export default CSVDropzone;
