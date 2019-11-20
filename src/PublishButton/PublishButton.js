import React from "react";
import useCsvData from "../useCsvData";
import { Button } from "semantic-ui-react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function postGroup({ name, origins, destinations }) {
  origins = origins.map(o => [o]);
  destinations = destinations.map(d => d.split(","));
  if (origins.length && destinations.length && name) {
    let request = {
      host: "g84ric8qt4.execute-api.eu-west-3.amazonaws.com",
      method: "POST",
      // url: `https://g84ric8qt4.execute-api.eu-west-3.amazonaws.com/live/group`,
      url:`https://0v3zjmzna4.execute-api.eu-west-3.amazonaws.com/live/group`,
      data: { name, origins, destinations }, // object describing the foo
      body: JSON.stringify({ name, origins, destinations }), // aws4 looks for body; axios for data
      path: `/live/group`,
      headers: {
        "content-type": "application/json"
      }
    };
    try {
      const res = await axios(request);
      console.log(res);
      if (res.status === 200) toast.success("Sucess!");
      else toast.error("Request Failed");
      // setState({ ...state, groups: res.data.groups });
    } catch (e) {}
  } else {
    toast.warn("Missing parameters, you must specify a group and OD points");
  }
}

function PublishButton({ selectedGroup }) {
  const { data: state } = useCsvData();
  return (
    <Button
      icon
      primary
      fluid
      labelPosition="right"
      onClick={() => {
        postGroup({
          name: selectedGroup,
          origins: state.selectedOrigins,
          destinations: state.selectedDestinations
        });
      }}
    >
      Publish group
    </Button>
  );
}

export default PublishButton;
