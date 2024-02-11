import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import SearchComponent from "./Search";

export const Navbar = () => {
  const [listAuthors, setListAuthors] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getListAuthors = async () => {
      try {
        const res = await axiosInstance.get("authors");
        const data = res.data;
        setListAuthors(data.results);
      } catch (err) {
        console.log("error while fetching data: ", err);
      }
    };

    getListAuthors();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="shadow-sm shadow-black p-2.5 flex justify-between items-center relative ">
        <Link to="/" className="w-full md:w-max">
          <h1 className="text-3xl font-bold text-center md:text-4xl md:text-start">
            Quotes
          </h1>
        </Link>
        <div className="flex items-center">
          <button
            className="z-50 block text-gray-500 md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 fill-current feather feather-x"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          <ul
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:flex md:items-center md:gap-2 w-full absolute top-14  px-3 md:p-0 py-2.5 left-0 md:static bg-black/20 md:bg-inherit space-y-2 md:space-y-0`}
          >
            <li>
              <Link to="/authors">List Authors</Link>
            </li>
            <li>
              <Link to="/tags">List Tags</Link>
            </li>
            <li>
              <SearchComponent data={listAuthors} />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
