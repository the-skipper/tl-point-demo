import { useContext } from "react";
import { CsvContext } from "./CsvContext";

const useCsvData = () => {
  const [state, setState] = useContext(CsvContext);

  function setData({ data }) {
    let flat_data = data.slice(1).flat();
    let coordinates = [];
    for (let i = 0; i < flat_data.length; i += 2) {
      coordinates.push({ latitude: flat_data[i], longitude: flat_data[i + 1] });
    }

    setState(state => ({ ...state, rows: data.slice(1), coords: coordinates })); // remove header row.
    // console.log(coordinates);
  }

  function selectRow(index) {
    setState(state => ({ ...state, selectedIndex: index }));
  }

  return {
    setData,
    selectRow,
    data: state
  };
};

export default useCsvData;
