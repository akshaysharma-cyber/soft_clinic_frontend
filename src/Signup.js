import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo.png";

export default function Signup() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8089/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: mobile,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/signin");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb"
      }}
    >
      <Card
        sx={{
          width: 350,
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <img src={logo} alt="LabZen" style={{ width: 80 }} />

        <Typography variant="h5" fontWeight="bold" mt={2}>
          Sign Up
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          placeholder="+91 Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">🇮🇳</InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          type="password"
          margin="normal"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          onClick={handleSignup}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 3,
            background: "linear-gradient(90deg, #1e3c72, #2a5298)",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          SIGN UP
        </Button>

        <Typography mt={2} fontSize={14}>
          Already have an account?{" "}
          <span
            style={{ color: "#2a5298", cursor: "pointer" }}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </Typography>
      </Card>
    </Box>
  );
}
