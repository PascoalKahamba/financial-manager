import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";

const Home = () => {
  const {
    global: { name },
  } = useGlobalContext();
  return <div>{name}</div>;
};

export default Home;
