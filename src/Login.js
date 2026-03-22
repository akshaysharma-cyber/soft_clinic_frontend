import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png.png"; // adjust path if needed

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = () => {
    if (mobile.length === 10) {
      setSent(true);
    }
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      navigate("/dashboard");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: 80 }}>
      
      {/* ✅ Logo */}
      <img src={logo} alt="LabZen" style={{ width: 120, marginBottom: 20 }} />

      <Typography variant="h5">Welcome to LabZen</Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Mobile Number"
        onChange={(e) => setMobile(e.target.value)}
      />

      {!sent ? (
        <Button variant="contained" fullWidth onClick={sendOtp}>
          Send OTP
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            margin="normal"
            label="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button variant="contained" fullWidth onClick={verifyOtp}>
            Verify OTP
          </Button>
        </>
      )}
    </Container>
  );
}