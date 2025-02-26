import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link } from "react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        NewsApp
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium">{user.name}</span>
            <Link to="/create-news" className="bg-green-500 px-3 py-1 rounded">
              Create News
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-gray-700 px-3 py-1 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-gray-700 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
