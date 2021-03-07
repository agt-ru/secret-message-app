import {
  SECRET_MESSAGE_CREATE_REQUEST,
  SECRET_MESSAGE_CREATE_SUCCESS,
  SECRET_MESSAGE_CREATE_FAIL,
  SECRET_MESSAGE_CREATE_RESET,
  SECRET_MESSAGE_DETAILS_REQUEST,
  SECRET_MESSAGE_DETAILS_SUCCESS,
  SECRET_MESSAGE_DETAILS_FAIL,
  SECRET_MESSAGE_LIST_REQUEST,
  SECRET_MESSAGE_LIST_SUCCESS,
  SECRET_MESSAGE_LIST_FAIL,
  SECRET_MESSAGE_LIST_RESET,
  SECRET_MESSAGE_DELETE_REQUEST,
  SECRET_MESSAGE_DELETE_SUCCESS,
  SECRET_MESSAGE_DELETE_FAIL,
} from "../constants/secretMessageConstants";

export const secretMessageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SECRET_MESSAGE_CREATE_REQUEST:
      return { loading: true };
    case SECRET_MESSAGE_CREATE_SUCCESS:
      return { loading: false, success: true, secretMessage: action.payload };
    case SECRET_MESSAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SECRET_MESSAGE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const secretMessageDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case SECRET_MESSAGE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SECRET_MESSAGE_DETAILS_SUCCESS:
      return { loading: false, secretMessage: action.payload };
    case SECRET_MESSAGE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const secretMessageListReducer = (
  state = { secretMessageUrls: [] },
  action
) => {
  switch (action.type) {
    case SECRET_MESSAGE_LIST_REQUEST:
      return { loading: true };
    case SECRET_MESSAGE_LIST_SUCCESS:
      return { loading: false, secretMessageUrls: action.payload };
    case SECRET_MESSAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case SECRET_MESSAGE_LIST_RESET:
      return { secretMessageUrls: [] };
    default:
      return state;
  }
};

export const secretMessageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SECRET_MESSAGE_DELETE_REQUEST:
      return { loading: true };
    case SECRET_MESSAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SECRET_MESSAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
