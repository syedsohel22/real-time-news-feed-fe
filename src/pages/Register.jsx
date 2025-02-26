import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
const initalState = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
};
const Register = () => {
  const [userData, setUserData] = useState(initalState);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleRegister = () => {
    dispatch(registerUser(userData));
    setUserData(initalState);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
        />
        <select
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select>
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
        {loading && <p>Loading...</p>}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Error message here
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
