import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export const Authors = () => {
  const [listAuthors, setListAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getListAuthors = async () => {
      try {
        const res = await axiosInstance.get("authors");
        const data = res.data;
        setListAuthors(data.results);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        console.log("error while fetching data: ", err);
        setIsLoading(false);
      }
    };

    getListAuthors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5 m-5">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl font-bold">List of Authors</h1>
          {error && <p>Error: {error.message}</p>}
          <ul className="grid w-full grid-cols-2 gap-4 place-items-center place-content-center">
            {listAuthors.map((author) => (
              <li key={author._id} className="flex justify-center w-full">
                <Link
                  to={`/authors/${author._id}`}
                  className="shadow-sm shadow-black rounded-md w-full py-2.5 px-2 cursor-pointer"
                >
                  {author.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
