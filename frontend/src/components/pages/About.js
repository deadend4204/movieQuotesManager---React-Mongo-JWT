import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
const About = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>About This App</h1>
      <p className="my-1">This is a fullstack react app for keeping quotes.</p>
      <p className="bg-dark p">
        <strong>Version 1.0.1</strong>
      </p>
    </div>
  );
};

export default About;
