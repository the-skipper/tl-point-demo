import * as Papa from "papaparse";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faPlus } from "@fortawesome/free-solid-svg-icons";

import useCsvData from "../useCsvData";
import { reject, resolve } from "q";

const parseCSV = async file => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      config: { dynamicTyping: true, header: true },
      complete: json => {
        resolve(json);
      },
      error: function(err, file, inputElem, reason) {
        reject({ err, reason });
      }
    });
  });
};

function CSVDropzone() {
  const { setData } = useCsvData();
  const onDrop = useCallback(async acceptedFiles => {
    // const reader = new FileReader();
    // reader.onabort = () => console.log("file reading was aborted");
    // reader.onerror = () => console.log("file reading has failed");
    // reader.onload = () => {
    //   const binaryStream = reader.result;
    //   //   parseCSV();
    // };
    // acceptedFiles.forEach(file => reader.readAsArrayBuffer(file));
    setData(await parseCSV(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv"
  });

  return (
    <div {...getRootProps()} className="csv-dropzone" types="images">
      <input {...getInputProps()} />
      <FontAwesomeIcon icon={faPlus} fixedWidth />
      <FontAwesomeIcon icon={faFileCsv} size="2x" fixedWidth />
      <p>Drag & drop or click to upload.</p>
    </div>
  );
}

export default CSVDropzone;
