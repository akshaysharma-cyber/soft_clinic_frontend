import {
  Box,
  Card,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

export default function LabSetup() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: 400, p: 4, borderRadius: 4 }}>

        <Typography variant="h6" mb={2}>
          ← Lab Setup
        </Typography>

        <img src={logo} style={{ width: 120, marginBottom: 10 }} />

        <Typography mb={2}>
          Fill lab details below to get started.
        </Typography>

        <TextField fullWidth label="Lab Name" margin="normal" />
        <TextField fullWidth label="Lab Address" margin="normal" />
        <TextField fullWidth label="Doctor / Pathologist" margin="normal" />
        <TextField fullWidth label="Contact Number" margin="normal" />

        {/* Upload */}
        <Box
          sx={{
            border: "2px dashed #ccc",
            p: 3,
            textAlign: "center",
            mt: 2,
            borderRadius: 2
          }}
        >
          Upload Logo
        </Box>

        <Button
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            background: "linear-gradient(90deg,#1e3c72,#2a5298)",
            color: "#fff"
          }}
          onClick={() => navigate("/dashboard")}
        >
          SAVE
        </Button>
      </Card>
    </Box>
  );
}