export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "mist",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "mist",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    url: new URL("../assets/day/default.png", import.meta.url).href,
    condition: "unspecified",
  },
  night: {
    day: false,
    url: new URL("../assets/night/default.png", import.meta.url).href,
    condition: "unspecified",
  },
};

export const coordinates = {
  latitude: 38.833,
  longitude: -104.821,
};

export const Base_Url =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrpax.minecraftnoob.com"
    : "http://localhost:3002";

export const APIkey = "9b9722e38deeabc4ca4d411aa8eb9e48";
