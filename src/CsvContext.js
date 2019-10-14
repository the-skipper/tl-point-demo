import React, { useState } from "react";

const CsvContext = React.createContext([{}, () => {}]);

const CsvProvider = props => {
  const [state, setState] = useState({
    rows: [{ oLat: 44.78925, oLng: 20.444543, dLat: 44.7956, dLng: 20.447805 }],
    arrays: []
  });
  return (
    <CsvContext.Provider value={[state, setState]}>
      {props.children}
    </CsvContext.Provider>
  );
};

export { CsvContext, CsvProvider };
