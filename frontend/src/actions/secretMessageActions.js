import axios from "axios";
import {
  SECRET_MESSAGE_CREATE_REQUEST,
  SECRET_MESSAGE_CREATE_SUCCESS,
  SECRET_MESSAGE_CREATE_FAIL,
  SECRET_MESSAGE_DETAILS_REQUEST,
  SECRET_MESSAGE_DETAILS_SUCCESS,
  SECRET_MESSAGE_DETAILS_FAIL,
  SECRET_MESSAGE_LIST_REQUEST,
  SECRET_MESSAGE_LIST_SUCCESS,
  SECRET_MESSAGE_LIST_FAIL,
  SECRET_MESSAGE_DELETE_REQUEST,
  SECRET_MESSAGE_DELETE_SUCCESS,
  SECRET_MESSAGE_DELETE_FAIL,
} from "../constants/secretMessageConstants";
import { logout } from "./userActions";

export const createSecretMessage = (secretMessage) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SECRET_MESSAGE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/secretmessages`,
      secretMessage,
      config
    );

    dispatch({
      type: SECRET_MESSAGE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SECRET_MESSAGE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getSecretMessageDetails = (keyword, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SECRET_MESSAGE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/secretmessages`,
      { keyword, password },
      config
    );

    dispatch({
      type: SECRET_MESSAGE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SECRET_MESSAGE_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listSecretMessagesUrls = (ids) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SECRET_MESSAGE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let urls = [];

    for (const id of ids) {
      const { data } = await axios.get(`/api/secretmessages/${id}`, config);
      urls.push(data);
    }

    dispatch({
      type: SECRET_MESSAGE_LIST_SUCCESS,
      payload: urls,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SECRET_MESSAGE_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteSecretMessage = (keyword, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SECRET_MESSAGE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/secretmessages`, { keyword, password }, config);

    dispatch({ type: SECRET_MESSAGE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SECRET_MESSAGE_DELETE_FAIL,
      payload: message,
    });
  }
};
