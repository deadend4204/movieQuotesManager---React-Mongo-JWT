import React, { useContext } from "react";
import PropTypes from "prop-types";
import QuoteContext from "../../context/quote/quoteContext";

const QuoteItem = ({ Quote }) => {
  const quoteContext = useContext(QuoteContext);
  const { deleteQuote, setCurrent, clearCurrent } = quoteContext;

  const { _id, title, quote, type } = Quote;

  //Delete quote items
  const onDelete = () => {
    deleteQuote(_id);
    clearCurrent();
  };

  //if - else
  var badge_css = "badge-light";
  if (type === "movie") {
    badge_css = "badge-success";
  } else if (type === "other") {
    badge_css = "badge-danger";
  } else if (type === "book") {
    badge_css = "badge-dark";
  }
  //return to quotes
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {title}{" "}
        <span style={{ float: "right" }} className={"badge " + badge_css}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="li">
        {quote && (
          <li>
            <i className="fas fa-envelope-open"></i> {quote}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(Quote)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
QuoteItem.propTypes = {
  Quote: PropTypes.object.isRequired,
};
export default QuoteItem;
