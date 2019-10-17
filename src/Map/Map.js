import React from "react";
import "./Map.css";
import { CsvContext } from "../CsvContext";

import { getCenter } from "geolib";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.platform = null;
    this.map = null;
    this.state = {
      apikey: props.apikey,
      center: {
        lat: props.lat || "42.345978",
        lng: props.lng || "-83.0405"
      },
      zoom: props.zoom || "12",
      // theme: props.theme,
      style: props.style
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.DIcon = new window.H.map.Icon(
      "https://cdn1.iconfinder.com/data/icons/cartoon-snack/128/pizza-512.png",
      { size: { w: 56, h: 56 } }
    );
    this.OIcon = new window.H.map.Icon(
      "https://cdn2.iconfinder.com/data/icons/household-things/64/house_gasstove_n_oven-256.png",
      { size: { w: 56, h: 56 } }
    );
  }

  componentDidMount() {
    this.platform = new window.H.service.Platform(this.state);

    var layer = this.platform.createDefaultLayers();
    var container = document.getElementById("here-map");
    const center = getCenter(this.context[0].coords);
    this.map = new window.H.Map(container, layer.vector.normal.map, {
      center: center || this.state.center,
      zoom: this.state.zoom,
      pixelRatio: window.devicePixelRatio || 1
    });

    // Register Event listeners
    window.addEventListener("resize", this.handleResize);
    this.map.addEventListener("tap", this.handleMapClick);

    var events = new window.H.mapevents.MapEvents(this.map);
    // eslint-disable-next-line
    var behavior = new window.H.mapevents.Behavior(events);
    // eslint-disable-next-line
    var ui = new window.H.ui.UI.createDefault(this.map, layer);

    this.map.getViewModel().setLookAtData({
      tilt: 45,
      heading: 60
    });
  }

  componentDidUpdate() {
    // Position map on center point view.
    let center = getCenter(this.context[0].coords);
    center = center
      ? { lat: center.latitude, lng: center.longitude }
      : { lat: this.props.lat, lng: this.props.lng };
    this.map.setCenter(center);

    this.context[0].rows.forEach(row => {
      this.addOriginMarker({ lat: row[0], lng: row[1] });
      this.addDestinationMarker({ lat: row[2], lng: row[3] });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.map.removeEventListener("tap", this.handleMapClick);
  }

  addOriginMarker(coord) {
    this.map.addObject(new window.H.map.Marker(coord, { icon: this.OIcon }));
  }

  addDestinationMarker(coord) {
    this.map.addObject(new window.H.map.Marker(coord, { icon: this.DIcon }));
  }

  removeMarker() {}

  handleMapClick(e) {
    var coord = this.map.screenToGeo(
      e.currentPointer.viewportX,
      e.currentPointer.viewportY
    );
    console.log(coord.lat, coord.lng);
    this.addOriginMarker(coord);
  }

  handleResize(e) {
    this.map.getViewPort().resize();
  }

  render() {
    return <div className="here-map-view" id="here-map"></div>;
  }
}
Map.contextType = CsvContext;

export default Map;
