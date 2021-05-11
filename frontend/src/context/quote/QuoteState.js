import React, { useReducer } from "react";
import api from "../../utils/api";

import QuoteContext from "./quoteContext";
import quoteReducer from "./quoteReducer";
import {
  GET_QUOTES,
  ADD_QUOTE,
  DELETE_QUOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_QUOTES,
  UPDATE_QUOTE,
  FILTER_QUOTES,
  CLEAR_FILTER,
  QUOTE_ERROR,
} from "../types";

const QuoteState = (props) => {
  const initialState = {
    quotes: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(quoteReducer, initialState);

  //get quotes
  const getQuotes = async () => {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };

    try {
      const res = await api.get("/api/quotes", config);
      dispatch({ type: GET_QUOTES, payload: res.data });
    } catch (err) {
      dispatch({ type: QUOTE_ERROR, payload: err.respond.msg });
    }
  };

  // Add Quote
  const addQuote = async (quote) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };

    try {
      const res = await api.post("/api/quotes", quote, config);
      dispatch({ type: ADD_QUOTE, payload: res.data });
    } catch (err) {
      dispatch({ type: QUOTE_ERROR, payload: err.respond.msg });
    }
  };
  // Delete Quote
  const deleteQuote = async (id) => {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };

    try {
      await api.delete(`/api/quotes/${id}`, config);
      dispatch({ type: DELETE_QUOTE, payload: id });
    } catch (err) {
      dispatch({ type: QUOTE_ERROR, payload: err.respond.msg });
    }
  };
  // Update Quote
  const updateQuote = async (quote) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };

    try {
      const res = await api.put(`/api/quotes/${quote._id}`, quote, config);
      dispatch({ type: UPDATE_QUOTE, payload: res.data });
    } catch (err) {
      dispatch({ type: QUOTE_ERROR, payload: err.respond.msg });
    }
  };
  // Set Current Quote
  const setCurrent = (quote) => {
    dispatch({ type: SET_CURRENT, payload: quote });
  };
  // Clear Current Quote
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Quote
  const filterQuote = (text) => {
    dispatch({ type: FILTER_QUOTES, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <QuoteContext.Provider
      value={{
        quotes: state.quotes,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getQuotes,
        addQuote,
        deleteQuote,
        setCurrent,
        clearCurrent,
        updateQuote,
        filterQuote,
        clearFilter,
      }}
    >
      {props.children}
    </QuoteContext.Provider>
  );
};
export default QuoteState;
