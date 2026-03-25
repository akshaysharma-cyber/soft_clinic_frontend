import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

export default function Signin() {
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
          Sign In
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          placeholder="Enter mobile number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          type="password"
          margin="normal"
          placeholder="Enter password"
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
          onClick={() => navigate("/lab-setup")}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 3,
            background: "linear-gradient(90deg, #1e3c72, #2a5298)",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          SIGN IN
        </Button>

        <Typography mt={2} fontSize={14}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#2a5298", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Sign Up
          </span>
        </Typography>
      </Card>
    </Box>
  );
}