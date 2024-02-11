import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export const AuthorById = () => {
  const { id } = useParams();
  const [detailAuthor, setDetailAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProfileImageURL = (slug, size = 400) => {
    const IMAGE_BASE = "https://images.quotable.dev/profile";
    return `${IMAGE_BASE}/${size}/${slug}.jpg`;
  };

  useEffect(() => {
    const getDetailAuthor = async () => {
      try {
        const res = await axiosInstance.get(`authors/${id}`);
        const data = res.data;
        setDetailAuthor(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error while fetching data", err);
        setDetailAuthor({});
        setIsLoading(false);
      }
    };

    getDetailAuthor();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-start justify-center w-3/5 gap-5 p-5 m-5 mx-auto rounded-md shadow-sm shadow-black">
            <div className="flex justify-center gap-4">
              <figure className="basis-[100%]">
                <img
                  src={getProfileImageURL(detailAuthor.slug)}
                  alt={detailAuthor.name}
                  className="object-cover h-full"
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                />
              </figure>
              <div>
                <p className="text-xl font-bold">{`${detailAuthor.name} (${detailAuthor.description})`}</p>
                <p>{detailAuthor.bio}</p>
                <ul className="mt-5">
                  {detailAuthor.quotes.map((quote, index) => (
                    <li key={index}>
                      <q>{quote.content}</q>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              to={`/authors/slug/${detailAuthor.slug}`}
              className="p-3 text-white bg-blue-500 rounded-md"
            >
              Detail
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
