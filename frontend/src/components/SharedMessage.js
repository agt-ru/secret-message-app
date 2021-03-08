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

const SharedMessage = ({ keyword, history }) => {
  const [showMsg, setShowMsg] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const secretMessageDetails = useSelector(
    (state) => state.secretMessageDetails
  );

  let message = "";
  const { secretMessage, loading, error } = secretMessageDetails;
  if (secretMessage) message = secretMessage.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      dispatch(getSecretMessageDetails(keyword, password));
      setShowMsg(true);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (password) {
      dispatch(deleteSecretMessage(keyword, password));
      history.push('/profile');
    }
  };

  return (
    <FormContainer>
      <h1>View Secret Message</h1>
      {error && <Message variant="danger">{error}</Message>}
      {showMsg && !error ? (
        <Form onSubmit={handleDelete}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your secret message</Form.Label>
            <Form.Control as="textarea" value={message} resize="none" rows={3} />
          </Form.Group>

          <Button variant="danger" type="submit">
            Delete
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPassword">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default SharedMessage;
