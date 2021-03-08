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
import { createSecretMessage } from "../actions/secretMessageActions";
import FormContainer from "../components/FormContainer";
import SharedMessage from "../components/SharedMessage";

const HomeScreen = ({ match, history }) => {
  const [secretMessage, setSecretMessage] = useState("");
  const [password, setPassword] = useState("");

  // const [selectedUser, setSelectedUser] = useState("Users");
  // const [selectedUserId, setSelectedUserId] = useState("");

  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSecretMessage(
        {
          message: e.target[0].value,
          password: e.target[1].value,
        },
        [e.target[2].value, userInfo._id]
      )
    );

    // e.target[0].disabled = true;
    // e.target[1].disabled = true;
    // e.target[2].disabled = true;
    // e.target[3].disabled = true;
  };
  return keyword ? (
    <SharedMessage keyword={keyword} />
  ) : (
    <FormContainer>
      <h1>Create Secret Message</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSecretMessage">
            <Form.Label>Secret Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your secret message"
              value={secretMessage}
              onChange={(e) => setSecretMessage(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSelectUser">
            <Form.Label>User to send your message to:</Form.Label>
            <Form.Control as="select">
              {users.map((user) => (
                <option id={user._id} key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default HomeScreen;
