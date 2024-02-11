import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowNotFoundMessage(false);
    } else {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setShowNotFoundMessage(results.length === 0);
    }
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="">
      <div className="relative flex items-start">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={keyPress}
            className="border-[#000]  border-s border-y rounded-s-sm py-1 outline-none px-2 w-full"
          />
          <ul className="absolute w-full text-gray-600 z-50 shadow-sm md:bg-white/50 bg-white shadow-black top-11 md:top-12 px-2.5">
            {showNotFoundMessage ? (
              <p>Authors not found</p>
            ) : (
              searchResults.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/authors/slug/${item.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
        <button
          onClick={handleSearch}
          className="px-2 py-1 border border-[#000] outline-none bg-blue-500 text-white rounded-e-sm"
        >
          <svg
            fill="#fff"
            height="24"
            width="24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488.4 488.4"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </svg>
        </button>
      </div>
    </div>
  );
};

SearchComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SearchComponent;
