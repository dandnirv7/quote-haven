import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export const RandomQuotes = ({ data }) => {
  const [randomQuotes, setRandomQuotes] = useState([]);

  const getRandomQuotes = useCallback(async () => {
    try {
      const quotes = await data();
      setRandomQuotes(quotes);
    } catch (err) {
      console.log("error while fetching data: ", err);
    }
  }, [data]);

  useEffect(() => {
    getRandomQuotes();
  }, [getRandomQuotes]);

  return (
    <div className="relative w-4/5 mx-auto my-10 text-center rounded-md shadow shadow-black md:w-3/5 md:my-0 md:h-80">
      <div className="flex flex-col items-center justify-center p-8 gap-y-4">
        <h1 className="text-2xl md:text-3xl font-bold after:content-[''] after:w-3/6 after:mx-auto after:mt-2 after:h-1.5 after:bg-blue-500 after:block after:rounded-full">
          Quote of The Day
        </h1>
        {randomQuotes.tags?.length > 0 && (
          <ul className="list-none">
            <li className="">{randomQuotes.tags.join(", ")}</li>
          </ul>
        )}

        <div className="flex flex-col justify-center">
          <q className="text-xl">{randomQuotes.content}</q>
          <p className="w-full mt-3 md:text-right md:mt-0">
            <span>-</span>
            {randomQuotes.author}
          </p>
        </div>
        <button
          onClick={getRandomQuotes}
          className="md:absolute md:bottom-8 bg-blue-500 text-white py-1.5 p-3 rounded-full hover:bg-blue-600 active:bg-blue-700"
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

RandomQuotes.propTypes = {
  data: PropTypes.func.isRequired,
};
