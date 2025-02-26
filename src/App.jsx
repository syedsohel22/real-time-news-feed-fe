import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNews from "./pages/CreateNews";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-news"
          element={
            <ProtectedRoute>
              <CreateNews />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default App;
