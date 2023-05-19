import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import BookDetails from "./pages/bookDetails";
import AuthPage from "./pages/authPage";
import { useSelector } from "react-redux";
import Toast from "./component/toast";

const App = () => {
  const location = useLocation().pathname;
  const { message, status } = useSelector((state) => state.message);
  const token = useSelector((state) => state.user.token);
  return (
    <>
      {location !== "/auth" && <Navbar />}
      <Box sx={{ paddingTop: location !== "/auth" ? "3rem" : 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={!token ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/book/:id"
            element={token ? <BookDetails /> : <Navigate to="/" />}
          />
        </Routes>
        {message && <Toast message={message} status={status} />}
      </Box>
    </>
  );
};

export default App;
