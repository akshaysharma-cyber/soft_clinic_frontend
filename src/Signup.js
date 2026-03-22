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
import logo from "./assets/logo.png";

export default function Signup() {
  const navigate = useNavigate();

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
          onClick={() => navigate("/signin")}
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