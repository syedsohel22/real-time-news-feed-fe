import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/slices/newsSlice";
import Navbar from "../components/Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const { newsList = [], loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsList.map((news) => (
            <div key={news._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{news.title}</h3>
              <p className="text-gray-500 text-sm">Category: {news.category}</p>
              <p className="mt-2">{news.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
