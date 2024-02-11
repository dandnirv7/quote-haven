import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
// import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import QuoteCard from "../components/QuoteCard";

const Tag = () => {
  // const { tag } = useParams();
  const [quotesData, setQuotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        let data = [];

        for (let i = 0; i < 5; i++) {
          const res = await axiosInstance.get(
            `quotes?limit=150&skip=${i * 150}`
          );
          data = [...data, ...res.data.results];
        }

        setQuotesData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error while fetching data: ", err);
        setIsLoading(false);
      }
    };

    getQuotes();
  }, []);

  // const renderQuotes = () => {
  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  //   const filteredQuotes = tag
  //     ? quotesData.filter((quote) => quote.tags.includes(tag))
  //     : quotesData;

  //   if (filteredQuotes.length > 0) {
  //     return filteredQuotes.map((quote) => (
  //       <div key={quote._id}>
  //         <p>{quote.content}</p>
  //         <p>Author: {quote.author}</p>
  //         <p>Tags: {quote.tags.join(", ")}</p>
  //       </div>
  //     ));
  //   } else {
  //     return <p>No quotes found.</p>;
  //   }
  // };

  return <>{isLoading ? <Spinner /> : <QuoteCard data={quotesData} />}</>;
};

export default Tag;
