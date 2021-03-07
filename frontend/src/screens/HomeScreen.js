import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  return (
    <>

    </>
  );
};

export default HomeScreen;
