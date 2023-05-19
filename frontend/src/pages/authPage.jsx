import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import bgImage from "../assets/background.jpg";
import { DatePicker } from "@mui/x-date-pickers";
import { login, signup } from "../services/userSevice";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { setMessage } from "../store/messageSlice";
import dayjs from "dayjs";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(dayjs());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearState = () => {
    setDob(null);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (email === "" || password === "")
      return dispatch(
        setMessage({ status: "error", message: "Please filled all the fields" })
      );
    const response = await login(email, password);
    if (response.status === "success") {
      dispatch(setUser(response.payload));
      dispatch(
        setMessage({ status: response.status, message: "Login success" })
      );
      navigate("/");
    }
    if (response.status === "error") {
      dispatch(setMessage({ status: response.status, message: response.payload }));
    }
  };

  const handleSignup = async () => {
    if (username === "" || email === "" || password === "")
      return dispatch(
        setMessage({ status: "error", message: "Please filled all the fields" })
      );
    const response = await signup(username, email, password, dob);
    if (response.status === "success") {
      dispatch(
        setMessage({ status: response.status, message: "Sign up success" })
      );
      setIsLogin(true);
    }
    if (response.status === "error") {
      dispatch(setMessage({ status: response.status, message: response.payload }));
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(90deg, rgba(7,97,100,1) 0%, rgba(0,255,222,1) 100%)",
      }}
    >
      <Box
        sx={{
          width: "40rem",
          height: "28rem",
          background: "rgba(255, 255, 255, 0.4)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            opacity: "0.6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            color="#fff"
            sx={{ textShadow: "2px 2px #000" }}
          >
            LIBRARY
          </Typography>
          <Typography variant="caption" color="#fff">
            Nơi lưu trữ sách lý tưởng
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: "100%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "0.6rem" }}>
            {!isLogin ? "Sign up" : "Login"}
          </Typography>
          {!isLogin && (
            <TextField
              size="small"
              fullWidth
              label="Username"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "6px",
                margin: "0.4rem 0",
              }}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <TextField
            size="small"
            fullWidth
            type="email"
            label="Email"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "6px",
              margin: "0.4rem 0",
            }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            fullWidth
            type="password"
            label="Password"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "6px",
              margin: "0.4rem 0",
            }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <DatePicker
              sx={{
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "6px",
                margin: "0.4rem 0",
              }}
              label="Date of birth"
              disableFuture
              value={dob}
              onChange={(value) => setDob(value)}
            />
          )}
          <Button
            variant="contained"
            sx={{ marginTop: "0.4rem" }}
            onClick={() => (isLogin ? handleLogin() : handleSignup())}
          >
            {!isLogin ? "Sign up" : "Login"}
          </Button>
          <Typography sx={{ mt: "0.2rem" }}>or</Typography>
          <Button
            variant="text"
            sx={{ marginTop: "0.2rem" }}
            onClick={() => {
              setIsLogin(!isLogin), clearState();
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
