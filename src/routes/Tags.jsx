import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export const Tags = () => {
  const [listTags, setListTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const perPage = 20;

  useEffect(() => {
    const getListTags = async () => {
      try {
        const res = await axiosInstance.get("tags");
        const data = res.data;

        const filteredTags = data.filter((tag) => tag.quoteCount > 0);

        setListTags(filteredTags);
        setIsLoading(false);
      } catch (err) {
        console.log("error while fetching data: ", err);
        setIsLoading(false);
      }
    };

    getListTags();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(listTags.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div className="flex flex-col items-center justify-center gap-5 m-5">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl font-bold">List Tags</h1>
          <ul className="grid w-full grid-cols-4 gap-4 place-items-center place-content-center">
            {listTags.slice(startIndex, endIndex).map((tag, index) => (
              <li key={index} className="w-full">
                <Link
                  to={tag.name}
                  className="shadow-sm shadow-black rounded-md  py-2.5 px-2 cursor-pointer block"
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-4 mb-10">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={page === currentPage}
                  className={
                    page === currentPage
                      ? "rounded-full w-6 h-6"
                      : "opacity-50 rounded-full w-6 h-6 "
                  }
                >
                  {page}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
