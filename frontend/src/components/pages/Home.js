import React, { useContext, useEffect } from "react";
import Quotes from "../quotes/Quotes";
import ContactForm from "../quotes/QuoteForm";
import QuoteFilter from "../quotes/QuoteFilter";
import AuthContext from "../../context/auth/authContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <QuoteFilter />
        <Quotes />
      </div>
    </div>
  );
};

export default Home;
