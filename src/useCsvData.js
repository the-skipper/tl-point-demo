import { useContext } from "react";
import { CsvContext } from "./CsvContext";

const useCsvData = () => {
  const [state, setState] = useContext(CsvContext);

  function setData({ data }) {
    let flat_data = data.slice(1).flat();
    let coordinates = { o: [], d: [] };
    for (let i = 0; i < flat_data.length; i += 4) {
      if (flat_data[i] && flat_data[i + 1]) {
        coordinates.o.push({
          latitude: flat_data[i],
          longitude: flat_data[i + 1]
        });
      }
      if (flat_data[i + 2] && flat_data[i + 3]) {
        coordinates.d.push({
          latitude: flat_data[i + 2],
          longitude: flat_data[i + 3]
        });
      }
    }

    setState(state => ({ ...state, rows: data.slice(1), coords: coordinates })); // remove header row.
  }

  function selectRow(index, pointType, data) {
    let key = "";
    let newPoints = [];
    let selectedPointData = [];
    if (pointType === "o") key = "selectedOrigins";
    else if (pointType === "d") key = "selectedDestinations";
    if (key) {
      if (state.selectedPoints.indexOf(index) === -1) {
        newPoints = [...state.selectedPoints, index];
      } else {
        newPoints = state.selectedPoints.filter(i => i !== index);
      }
      setState(state => ({ ...state, selectedPoints: newPoints }));
    }
  }

  return {
    setData,
    selectRow,
    data: state
  };
};

export default useCsvData;
