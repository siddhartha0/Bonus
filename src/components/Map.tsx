import { useState } from "react";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/Store";

// Nepal district GeoJSON data (simplified for example)
const NEPAL_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Kathmandu",
        isHome: true,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.2885, 27.6714],
            [85.3562, 27.6714],
            [85.3562, 27.7278],
            [85.2885, 27.7278],
            [85.2885, 27.6714],
          ],
        ],
      },
    },
    // Add other districts as needed
  ],
};

// Map configuration
const MAP_CONFIG = {
  visState: {
    filters: [],
    layers: [
      {
        id: "district",
        type: "geojson",
        config: {
          dataId: "nepal_districts",
          label: "Nepal Districts",
          color: [18, 147, 154],
          highlightColor: [252, 242, 26],
          columns: {
            geojson: "_geojson",
          },
          isVisible: true,
          visConfig: {
            opacity: 0.8,
            strokeOpacity: 1,
            thickness: 0.5,
            strokeColor: [221, 178, 124],
            colorRange: {
              name: "Global Warming",
              type: "sequential",
              category: "Uber",
              colors: [
                "#5A1846",
                "#900C3F",
                "#C70039",
                "#E3611C",
                "#F1920E",
                "#FFC300",
              ],
            },
            strokeColorRange: {
              name: "Global Warming",
              type: "sequential",
              category: "Uber",
              colors: [
                "#5A1846",
                "#900C3F",
                "#C70039",
                "#E3611C",
                "#F1920E",
                "#FFC300",
              ],
            },
            radius: 10,
          },
        },
        visualChannels: {
          colorField: {
            name: "isHome",
            type: "boolean",
          },
          colorScale: "quantile",
        },
      },
    ],
  },
};

function MapComponent() {
  const dispatch = useDispatch();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map with data
  if (!mapLoaded) {
    dispatch(
      addDataToMap({
        datasets: [
          {
            info: {
              label: "Nepal Districts",
              id: "nepal_districts",
            },
            data: NEPAL_DATA,
          },
        ],
        option: {
          centerMap: true,
          readOnly: false,
        },
        config: MAP_CONFIG,
      })
    );
    setMapLoaded(true);
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <KeplerGl
        id="nepal"
        mapboxApiAccessToken="pk.eyJ1IjoieGludSIsImEiOiJjbHdhOG42OXowZHU4MmtwbGcya2V0OWlhIn0.s2k2PjrzeQd5CVU4CQs-xA"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
}

export default function Map() {
  return (
    <Provider store={store}>
      <MapComponent />
    </Provider>
  );
}
