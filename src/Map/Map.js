import React from "react";
import "./Map.css";
import { CsvContext } from "../CsvContext";

import { getCenter } from "geolib";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.platform = null;
    this.map = null;
    this.DOMmarkers = [];
    this.centerPoint = null;
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
    // this.handleMapClick = this.handleMapClick.bind(this);

    this.originIconDomEl = document.createElement("div");
    this.originIconDomEl.className = "og-marker";

    this.selectedOriginIconDomEl = document.createElement("div");
    this.selectedOriginIconDomEl.className = "og-marker-s";

    this.destIconDomEl = document.createElement("div");
    this.destIconDomEl.className = "dest-marker";

    this.selectedDestIconDomEl = document.createElement("div");
    this.selectedDestIconDomEl.className = "dest-marker-s";

    // this.InactiveIcon = new window.H.map.Icon(
    //   "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-512.png",
    //   { size: { w: 24, h: 24 } }
    // );
    // this.DIcon = new window.H.map.Icon(
    //   "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    //   { size: { w: 32, h: 32 } }
    // );
    // this.OIcon = new window.H.map.Icon(
    //   "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-512.png",
    //   { size: { w: 32, h: 32 } }
    // );
  }

  componentDidMount() {
    this.platform = new window.H.service.Platform(this.state);
    var layer = this.platform.createDefaultLayers();
    var container = document.getElementById("here-map");
    const center = getCenter([
      ...this.context[0].coords.d,
      ...this.context[0].coords.o
    ]);
    this.map = new window.H.Map(container, layer.vector.normal.map, {
      center: center || this.state.center,
      zoom: this.state.zoom,
      pixelRatio: window.devicePixelRatio || 1
    });

    // Register Event listeners
    window.addEventListener("resize", this.handleResize);
    // this.map.addEventListener("tap", this.handleMapClick);

    var events = new window.H.mapevents.MapEvents(this.map);
    // eslint-disable-next-line
    var behavior = new window.H.mapevents.Behavior(events);
    // eslint-disable-next-line
    var ui = new window.H.ui.UI.createDefault(this.map, layer);

    this.map.getViewModel().setLookAtData({
      tilt: 45,
      heading: 180
    });

    this.originIcon = new window.H.map.DomIcon(this.originIconDomEl, {});
    this.selectedOriginIcon = new window.H.map.DomIcon(
      this.selectedOriginIconDomEl,
      {}
    );

    this.destIcon = new window.H.map.DomIcon(this.destIconDomEl, {});
    this.selectedDestIcon = new window.H.map.DomIcon(
      this.selectedDestIconDomEl,
      {}
    );
  }

  componentDidUpdate() {
    // Position map on center point view.
    if (
      this.context[0].coords.d.length > 0 ||
      this.context[0].coords.o.length > 0
    ) {
      if (this.centerPoint === null) {
        this.centerPoint = getCenter([
          ...this.context[0].coords.d,
          ...this.context[0].coords.o
        ]);

        let groupCenter = {
          lat: this.centerPoint.latitude,
          lng: this.centerPoint.longitude
        };
        this.map.setCenter(groupCenter);

        this.context[0].coords.o.forEach((row, i) => {
          // this.addMarker({ lat: row.latitude, lng: row.longitude }, this.InactiveIcon);
          this.addDomMarker(
            { lat: row.latitude, lng: row.longitude },
            this.originIcon,
            "o",
            i
          );
        });
        this.context[0].coords.d.forEach((row, i) => {
          this.addDomMarker(
            { lat: row.latitude, lng: row.longitude },
            this.destIcon,
            "d",
            i
          );
        });
      }
      for (let { marker, id, type } of this.DOMmarkers) {
        let selected = this.context[0].selectedPoints;
        if (selected.includes(id)) {
          if (type === "o") marker.setIcon(this.originIcon);
          if (type === "d") marker.setIcon(this.destIcon);
        } else {
          if (type === "o") marker.setIcon(this.selectedOriginIcon);
          if (type === "d") marker.setIcon(this.selectedDestIcon);
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.map.removeEventListener("tap", this.handleMapClick);
  }

  addDomMarker(coord, icon, type, i) {
    let marker = new window.H.map.DomMarker(coord, { icon });
    this.DOMmarkers.push({ marker, id: `${type}-${i}`, type });
    this.map.addObject(marker);
  }

  addOriginMarker(coord) {
    this.map.addObject(
      new window.H.map.Marker(coord, { icon: this.InactiveIcon })
    );
  }

  addDestinationMarker(coord) {
    this.map.addObject(
      new window.H.map.Marker(coord, { icon: this.InactiveIcon })
    );
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
