import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import { addDataToMap } from "@kepler.gl/actions";
import { Map } from "./components/Map";

function App() {
  const sindhuliCoordinates = [
    [85.875, 27.412], // Sindhuli coordinates
  ];

  const nepalGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [85.875, 27.412],
              [85.88, 27.415],
              [85.885, 27.42],
              [85.89, 27.425],
              [85.895, 27.43],
              [85.9, 27.435],
              [85.905, 27.44],
              [85.91, 27.445],
              [85.915, 27.45],
              [85.92, 27.455],
              [85.925, 27.46],
              [85.93, 27.465],
              [85.875, 27.412],
            ],
          ],
        },
        properties: {
          district: "Sindhuli",
        },
      },
    ],
  };

  // Transform GeoJSON to match Kepler.gl's format
  const transformedGeoJson = {
    fields: [{ name: "district", type: "string" }],
    rows: nepalGeoJson.features.map((feature) => [feature.properties.district]),
  };

  // Transform Sindhuli coordinates to match Kepler.gl's format for a point
  const transformedSindhuliPoint = {
    fields: [
      { name: "latitude", type: "real" },
      { name: "longitude", type: "real" },
    ],
    rows: sindhuliCoordinates.map(([longitude, latitude]) => [
      latitude,
      longitude,
    ]),
  };

  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    store.dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: "Nepal Districts",
            id: "nepal_districts",
          },
          data: transformedGeoJson,
        },
        config: {
          mapStyle: {
            styleType: "dark", // Set your map style here
          },
          visState: {
            layers: [
              {
                id: "district-layer",
                type: "geojson",
                config: {
                  dataId: "nepal_districts",
                  label: "District Layer",
                  color: [255, 0, 0],
                  isVisible: true,
                  columns: {
                    lat: "latitude",
                    lng: "longitude",
                  },
                  visConfig: {},
                  hidden: false,
                  textLabel: {
                    field: { name: "district", type: "string" },
                    color: [255, 255, 255],
                    background: true,
                    size: 16,
                    offset: [0, 0],
                    anchor: "middle",
                    alignment: "center",
                    outlineWidth: 2,
                    outlineColor: [0, 0, 0, 255],
                    backgroundColor: [0, 0, 0, 150],
                  },
                },
              },
              // Add point layer for Sindhuli
              {
                id: "sindhuli-point-layer",
                type: "point",
                config: {
                  dataId: "sindhuli-point",
                  label: "Sindhuli Marker",
                  color: [0, 0, 255],
                  columns: {
                    lat: "latitude",
                    lng: "longitude",
                  },
                  visConfig: {
                    radius: 10,
                    opacity: 1,
                    outline: false,
                    thickness: 2,
                    colorRange: {
                      name: "ColorBrewer RdYlGn-11",
                      type: "sequential",
                      category: "Sequential",
                      colors: ["#f00", "#ff0", "#0f0"],
                    },
                  },
                  isVisible: true,
                },
              },
            ],
          },
        },
      })
    );

    store.dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: "Sindhuli Point",
            id: "sindhuli-point",
          },
          data: transformedSindhuliPoint,
        },
        config: {},
      })
    );

    setLoaded(true);
  }

  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

export default App;
