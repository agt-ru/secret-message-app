import axios from "axios";
import {
  SECRET_MESSAGE_CREATE_REQUEST,
  SECRET_MESSAGE_CREATE_SUCCESS,
  SECRET_MESSAGE_CREATE_FAIL,
  SECRET_MESSAGE_DETAILS_REQUEST,
  SECRET_MESSAGE_DETAILS_SUCCESS,
  SECRET_MESSAGE_DETAILS_FAIL,
  SECRET_MESSAGE_DELETE_REQUEST,
  SECRET_MESSAGE_DELETE_SUCCESS,
  SECRET_MESSAGE_DELETE_FAIL,
} from "../constants/secretMessageConstants";
import { logout, updateUser } from "./userActions";

export const createSecretMessage = (secretMessage, usersIds) => async (
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
    for (const userId of usersIds) {
      dispatch(updateUser(userId, data._id));
    }
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
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        keyword,
        password,
      },
    };

    const { data } = await axios.get(`/api/secretmessages`, config);

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
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        keyword,
        password,
      },
    };

    await axios.delete(`/api/secretmessages`, config);

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
