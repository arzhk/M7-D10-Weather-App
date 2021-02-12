export default function (state = {}, action) {
  switch (action.type) {
    case "SET_WEATHER_DATA":
      return {
        ...state,
        weatherData: action.payload,
      };
    case "SET_FORECAST_DATA":
      return {
        ...state,
        forecastData: action.payload,
      };
    default:
      return state;
  }
}
