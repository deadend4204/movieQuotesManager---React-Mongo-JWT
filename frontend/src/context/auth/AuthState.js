import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import api from "../../utils/api";
// import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    //  load token into axios headers
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    try {
      const res = await api.get("/api/auth", config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: null,
      });
    }
  };

  //Register User

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.post("/api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // LOgin User

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Logout User
  const logout = () => dispatch({ type: LOGOUT, payload: null });
  // Clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
