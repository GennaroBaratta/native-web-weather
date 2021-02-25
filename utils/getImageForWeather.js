/* eslint-disable global-require */

const images = {
  Clear: require("../public/assets/clear.png"),
  Hail: require("../public/assets/hail.png"),
  "Heavy Cloud": require("../public/assets/heavy-cloud.png"),
  "Light Cloud": require("../public/assets/light-cloud.png"),
  "Heavy Rain": require("../public/assets/heavy-rain.png"),
  "Light Rain": require("../public/assets/light-rain.png"),
  Showers: require("../public/assets/showers.png"),
  Sleet: require("../public/assets/sleet.png"),
  Snow: require("../public/assets/snow.png"),
  Thunder: require("../public/assets/thunder.png"),
};

export default (weather) => images[weather];
