import {
  GET_QUOTES,
  ADD_QUOTE,
  DELETE_QUOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_QUOTE,
  FILTER_QUOTES,
  CLEAR_FILTER,
  QUOTE_ERROR,
} from "../types";

const quoteReducer = (state, action) => {
  switch (action.type) {
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload,
        loading: false,
      };
    case ADD_QUOTE:
      return {
        ...state,
        quotes: [action.payload, ...state.quotes],
        loading: false,
      };
    case UPDATE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.map((quote) =>
          quote._id === action.payload._id ? action.payload : quote
        ),
        loading: false,
      };
    case DELETE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.filter((quote) => quote._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_QUOTES:
      return {
        ...state,
        filtered: state.quotes.filter((quote) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            quote.title.match(regex) ||
            quote.quote.match(regex) ||
            quote.type.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case QUOTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default quoteReducer;
