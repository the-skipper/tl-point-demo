import React from "react";
import useCsvData from "../useCsvData";
import {Button} from "semantic-ui-react";
import axios from "axios";

async function postGroup({name, origins, destinations }) {
    try {
      const res = await axios.post(
        "https://g84ric8qt4.execute-api.eu-west-3.amazonaws.com/live/cron",
        { name, origins, destinations },
        {headers: {
            "Access-Control-Allow-Origin":"http://localhost:3000",
            'Content-Type' : 'application/x-www-form-urlencoded'
          }}
      );
      console.log(res.data.message);
      // setState({ ...state, groups: res.data.groups });
    } catch (e) {}
}


function PublishButton({selectedGroup}){
    const { data: state } = useCsvData();
    return (
         <Button
                icon
                primary
                fluid
                labelPosition="right"
                onClick={() => {postGroup({name:selectedGroup, origins:state.selectedOrigins, destinations:state.selectedDestinations})}}
              >
                Publish group
              </Button>
    )
}

export default PublishButton;