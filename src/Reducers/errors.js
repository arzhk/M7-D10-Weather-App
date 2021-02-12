export default function (state = {}, action) {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          errors: state.errors.errors.concat(action.payload),
        },
      };
    case "DISPLAY_ERRORS":
      return {
        ...state,
        errors: {
          ...state.errors,
          show: action.payload,
        },
      };
    default:
      return state;
  }
}
