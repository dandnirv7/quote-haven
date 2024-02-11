import { RandomQuotes } from "./RandomQuotes";
import { ListQuotes } from "./ListQuotes";
import { axiosInstance } from "../lib/axiosInstance";

export const Home = () => {
  const getRandomQuotes = async () => {
    const res = await axiosInstance.get("random?minLength=75&maxLength=150");
    const data = res.data;
    return data;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <RandomQuotes data={getRandomQuotes} />
      <ListQuotes />
    </div>
  );
};
