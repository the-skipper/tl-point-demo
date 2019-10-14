import { useContext } from "react";
import { CsvContext } from "./CsvContext";

const useCsvData = () => {
  const [state, setState] = useContext(CsvContext);

  function setData({ data }) {
    setState(state => ({ ...state, arrays: data.slice(1) })); // remove header row.
    console.log(data.slice(1));
  }

  function selectRow(index) {
    setState(state => ({ ...state, selectedIndex: index }));
  }

  return {
    setData,
    selectRow,
    csvRows: state
  };
};

export default useCsvData;
