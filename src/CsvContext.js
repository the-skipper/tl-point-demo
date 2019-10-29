import React, { useState } from "react";

const CsvContext = React.createContext([{}, () => {}]);

const CsvProvider = props => {
  const [state, setState] = useState({
    rows: [],
    coords: { o: [], d: [] },
    selectedOrigins: [],
    selectedDestinations: [],
    selectedPoints: [],
    currentGroup: ""
  });
  return (
    <CsvContext.Provider value={[state, setState]}>
      {props.children}
    </CsvContext.Provider>
  );
};

export { CsvContext, CsvProvider };
