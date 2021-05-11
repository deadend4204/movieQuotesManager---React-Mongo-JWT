import React, { useContext, useRef, useEffect } from "react";
import QuoteContext from "../../context/quote/quoteContext";

const QuoteFilter = () => {
  const quoteContext = useContext(QuoteContext);
  const text = useRef("");

  useEffect(() => {
    if (quoteContext.filtered === null) {
      text.current.value = "";
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== "") {
      quoteContext.filterQuote(e.target.value);
    } else {
      quoteContext.clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Quotes..."
        onChange={onChange}
      />
    </form>
  );
};

export default QuoteFilter;
