import React, { useContext, useState, useEffect } from "react";
import QuoteContext from "../../context/quote/quoteContext";
const QuoteForm = () => {
  const quoteContext = useContext(QuoteContext);
  const { addQuote, current, clearCurrent, updateQuote } = quoteContext;

  useEffect(() => {
    if (current !== null) {
      setQuote(current);
    } else {
      setQuote({
        title: "",
        quote: "",
        type: "other",
      });
    }
  }, [quoteContext, current]);

  const [Quote, setQuote] = useState({
    title: "",
    quote: "",
    type: "other",
  });
  const { title, quote, type } = Quote;

  const onChange = (e) =>
    setQuote({ ...Quote, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addQuote(Quote);
    } else {
      updateQuote(Quote);
    }
    clearAll();
    setQuote({
      title: "",
      quote: "",
      type: "other",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="title"
        placeholder="Enter Title of quote"
        value={title}
        onChange={onChange}
      />
      {/* <input
        type="text"
        name="quote"
        placeholder="Enter a quote"
        value={quote}
        onChange={onChange}
      /> */}
      <textarea
        rows="4"
        cols="50"
        name="quote"
        placeholder="Enter a quote..."
        value={quote}
        onChange={onChange}
      ></textarea>
      <h5>Quote Type</h5>
      <input
        type="radio"
        name="type"
        value="movie"
        checked={type === "movie"}
        onChange={onChange}
      />{" "}
      Movie{" "}
      <input
        type="radio"
        name="type"
        value="tv show"
        checked={type === "tv show"}
        onChange={onChange}
      />{" "}
      TV Show{" "}
      <input
        type="radio"
        name="type"
        value="book"
        checked={type === "book"}
        onChange={onChange}
      />{" "}
      Book{" "}
      <input
        type="radio"
        name="type"
        value="other"
        checked={type === "other"}
        onChange={onChange}
      />{" "}
      Other
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default QuoteForm;
