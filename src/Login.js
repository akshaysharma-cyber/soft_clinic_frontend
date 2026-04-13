import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png.png";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8089/auth/login", {
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
        console.log("Login success:", data);

        // Optional: store token if backend sends
        // localStorage.setItem("token", data.token);

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: 80 }}>
      <img src={logo} alt="LabZen" style={{ width: 120, marginBottom: 20 }} />

      <Typography variant="h5">Welcome to LabZen</Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <TextField
        fullWidth
        type="password"
        margin="normal"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}
