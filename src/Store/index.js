import { createStore, combineReducers, compose } from "redux";
import searchReducer from "../Reducers/search";
import errorsReducer from "../Reducers/errors";
import userReducer from "../Reducers/user";
import homeReducer from "../Reducers/home";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: {
    firstName: "Aaron",
    surname: "Rizhik",
    username: "arzhk",
    location: "London, United Kingdom",
    img: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
    favourites: [],
  },
  search: {
    searchResults: [],
    selectedLocation: [],
  },
  home: {
    weatherData: {},
    forecastData: [],
  },
  errors: {
    show: false,
    errors: [],
  },
};

const reducerMerge = combineReducers({
  user: userReducer,
  search: searchReducer,
  home: homeReducer,
  errors: errorsReducer,
});

export default function configureStore() {
  return createStore(
    reducerMerge,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
