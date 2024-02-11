import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import QuoteCard from "../components/QuoteCard";

export const ListQuotes = () => {
  const [listQuotes, setListQuotes] = useState([]);
  useEffect(() => {
    const randomNumber = parseInt(Math.random() * 1000);
    const getListQuotes = async () => {
      try {
        const res = await axiosInstance.get(`quotes?skip=${randomNumber}`);
        const data = res.data.results;

        setListQuotes(data);
      } catch (err) {
        console.log("error while fetching data: ", err);
      }
    };

    getListQuotes();
  }, []);

  return <QuoteCard data={listQuotes} />;
};
