import KeplerGl from "@kepler.gl/components";

export const Map = () => (
  <KeplerGl
    id="foo"
    mapboxApiAccessToken="pk.eyJ1IjoieGludSIsImEiOiJjbHdhOG42OXowZHU4MmtwbGcya2V0OWlhIn0.s2k2PjrzeQd5CVU4CQs-xA"
    width={1200}
    height={1200}
  />
);
