import PropTypes from "prop-types";

const QuoteCard = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 m-10 text-center ">
      {data?.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold">List Quotes</h1>
          <ul className="grid grid-cols-1 grid-rows-1 gap-5 md:grid-cols-2">
            {data.map((quote, index) => (
              <li
                key={index}
                className="shadow-sm shadow-black rounded-md px-3 py-2.5 flex items-center justify-center flex-col h-40 md:h-auto"
              >
                <ul>
                  <li>{quote.tags?.join(", ")}</li>
                </ul>
                <q className="text-center">{quote.content}</q>
                <p>
                  <span>- </span>
                  {quote.author}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

QuoteCard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default QuoteCard;
