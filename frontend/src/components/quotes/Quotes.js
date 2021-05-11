import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import QuoteItem from "./QuoteItem";
import Spinner from "../layout/Spinner";
import QuoteContext from "../../context/quote/quoteContext";
const Quotes = () => {
  const quoteContext = useContext(QuoteContext);
  const { quotes, getQuotes, loading, filtered } = quoteContext;

  useEffect(() => {
    getQuotes();
    // eslint-disable-next-line
  }, []);

  if (quotes !== null && quotes.length === 0 && !loading) {
    return <h4>Please add a quote</h4>;
  }

  return (
    <div>
      <Fragment>
        {quotes !== null && !loading ? (
          <TransitionGroup>
            {filtered !== null
              ? filtered.map((quote) => (
                  <CSSTransition
                    key={quote._id}
                    timeout={500}
                    classNames="item"
                  >
                    <QuoteItem Quote={quote} />
                  </CSSTransition>
                ))
              : quotes.map((quote) => (
                  <CSSTransition
                    key={quote._id}
                    timeout={500}
                    classNames="item"
                  >
                    <QuoteItem Quote={quote} />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </Fragment>
    </div>
  );
};

export default Quotes;
