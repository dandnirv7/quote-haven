import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center absolute top-1/3 left-0 w-full text-center px-2.5 text-lg md:text-xl gap-5">
      <h1 className="text-2xl font-bold md:text-4xl">
        Oops! You seem to be lost.
      </h1>
      <p className="">
        The requested URL {window.location.pathname} was not found on this
        server. That’s all we know.
      </p>
      <p className="mt-2">Here are some helpful links:</p>
      <div className="flex flex-row gap-5 underline">
        <Link to="/">Home</Link>
        <Link to="/authors">Author List</Link>
      </div>
    </div>
  );
}
