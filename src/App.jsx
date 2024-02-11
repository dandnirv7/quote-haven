import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import { Authors } from "./routes/Authors";
import { AuthorById } from "./routes/AuthorById";
import { AuthorBySlug } from "./routes/AuthorBySlug";
import NotFound from "./routes/NotFound";
import { Tags } from "./routes/Tags";
import Tag from "./routes/Tag";
import "./index.css";
import { ListQuotes } from "./routes/ListQuotes";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotes" element={<ListQuotes />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorById />} />
        <Route path="/authors/slug/:slug" element={<AuthorBySlug />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tags/:tag" element={<Tag />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
