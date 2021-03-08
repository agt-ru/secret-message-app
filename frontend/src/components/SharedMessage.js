import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from "../actions/userActions";
import {
  getSecretMessageDetails,
  deleteSecretMessage,
} from "../actions/secretMessageActions";
import FormContainer from "../components/FormContainer";

const SharedMessage = ({ keyword }) => {
  const [showMsg, setShowMsg] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const secretMessageDetails = useSelector(
    (state) => state.secretMessageDetails
  );
  const { message } = secretMessageDetails;

  // useEffect(() => {
  //   if (password) {
  //     dispatch(getSecretMessageDetails(keyword, password));
  //   }
  // }, [dispatch, keyword, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      dispatch(getSecretMessageDetails(keyword, password));
    }
  };

  return showMsg ? (
    <h1>Your secret message</h1>
  ) : (
    <FormContainer>
      <h1>View Secret Message</h1>
      <h2>{message}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SharedMessage;
