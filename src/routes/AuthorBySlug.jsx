import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { useParams } from "react-router-dom";

export const AuthorBySlug = () => {
  const { slug } = useParams();
  const [detailAuthor, setDetailAuthor] = useState({});

  useEffect(() => {
    const getDetailAuthor = async () => {
      try {
        const res = await axiosInstance.get(`authors/slug/${slug}`);
        const data = res.data;
        setDetailAuthor(data);
        console.log(data);
      } catch (err) {
        console.error("Error while fetching data", err);
        setDetailAuthor({});
      }
    };

    getDetailAuthor();
  }, [slug]);

  return (
    <>
      {detailAuthor && Object.keys(detailAuthor).length > 0 && (
        <>
          {/* <a href={detailAuthor.link} target="_blank" rel="noopener noreferrer">
            {detailAuthor.bio}
          </a> */}
          <iframe
            src={detailAuthor.link}
            style={{
              border: "none",
              width: "100%",
              height: "100vh",
              overflowX: "hidden",
              overflowY: "auto",
            }}
            title="description"
          />
          {/* <div>
            {detailAuthor.quotes.map((quote, index) => (
              <ul key={index}>
                <li>{quote.content}</li>
              </ul>
            ))}
          </div> */}
        </>
      )}
    </>
  );
};
