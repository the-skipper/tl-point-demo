import React from "react";
import { Input } from "semantic-ui-react";

import useCsvData from "../useCsvData";

const GroupInput = () => {
  const { addGroup } = useCsvData();
  return (
    <Input
      className="group-input"
      fluid={true}
      placeholder="Enter group name"
      onChange={(event, data) => {
        addGroup(data.value);
      }}
    />
  );
};

export default GroupInput;
