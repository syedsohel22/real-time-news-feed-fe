import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNews } from "../redux/slices/newsSlice";

const CreateNews = () => {
  const [newsData, setNewsData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.news);

  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newsData.title || !newsData.category || !newsData.content) {
      alert("Title, category, and content are required!");
      return;
    }
    dispatch(createNews(newsData));
    setNewsData({ title: "", category: "", content: "" });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-semibold text-center mb-4">Create News</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newsData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <select
          name="category"
          value={newsData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select Category</option>
          <option value="tech">Tech</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
        </select>

        <textarea
          name="content"
          placeholder="Content"
          value={newsData.content}
          onChange={handleChange}
          rows="5"
          className="w-full p-2 border rounded mb-3"
        ></textarea>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CreateNews;
