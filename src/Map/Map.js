import React from "react";
import "./Map.css";

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
  }

  componentDidMount() {
    this.platform = new window.H.service.Platform(this.state);

    var layer = this.platform.createDefaultLayers();
    var container = document.getElementById("here-map");

    this.map = new window.H.Map(container, layer.vector.normal.map, {
      center: this.state.center,
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.map.removeEventListener("tap", this.handleMapClick);
  }

  handleMapClick(e) {
    var coord = this.map.screenToGeo(
      e.currentPointer.viewportX,
      e.currentPointer.viewportY
    );
    console.log(coord.lat, coord.lng);
    this.map.addObject(new window.H.map.Marker(coord));
  }

  handleResize(e) {
    this.map.getViewPort().resize();
  }

  render() {
    return <div className="here-map-view" id="here-map"></div>;
  }
}

export default Map;
