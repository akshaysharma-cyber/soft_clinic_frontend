import {
  Box,
  Card,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LabSetup() {
  const [form, setForm] = useState({
    labName: "",
    address: "",
    doctor: "",
    contact: ""
  });

  const [labLogo, setLabLogo] = useState("");
  const navigate = useNavigate();

  // 🔥 Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only numbers for contact
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm({ ...form, [name]: value });
  };

  // 🔥 Upload Logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setLabLogo(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // 🔥 Button Enable Logic
  const isFormValid =
    form.labName &&
    form.address &&
    form.doctor &&
    form.contact.length === 10;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f7fb"
      }}
    >
      <Card
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
        }}
      >
        {/* HEADER */}
        <Box textAlign="center" mb={3}>
          {labLogo && (
            <Box
              component="img"
              src={labLogo}
              alt="logo"
              sx={{ height: 70, mb: 1, borderRadius: 2 }}
            />
          )}

          <Typography variant="h5" fontWeight="600">
            Lab Setup
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Fill lab details to continue
          </Typography>
        </Box>

        {/* FORM */}
        <TextField
          fullWidth
          label="Lab Name"
          name="labName"
          margin="normal"
          value={form.labName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Lab Address"
          name="address"
          margin="normal"
          value={form.address}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Doctor / Pathologist"
          name="doctor"
          margin="normal"
          value={form.doctor}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Contact Number"
          name="contact"
          margin="normal"
          value={form.contact}
          onChange={handleChange}
          helperText="Enter 10 digit number"
        />

        {/* LOGO UPLOAD */}
        <Box mt={2} textAlign="center">
          {!labLogo && (
            <Button variant="outlined" component="label" size="small">
              Upload Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </Button>
          )}

          {labLogo && (
            <Button size="small" onClick={() => setLabLogo("")}>
              Change Logo
            </Button>
          )}
        </Box>

        {/* SAVE BUTTON */}
        <Button
          fullWidth
          disabled={!isFormValid}   // 🔥 IMPORTANT
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 2,
            background: isFormValid
              ? "linear-gradient(90deg,#1976d2,#42a5f5)"
              : "#ccc",
            color: "#fff",
            fontWeight: "600",
            "&:hover": {
              background: isFormValid
                ? "linear-gradient(90deg,#1565c0,#1e88e5)"
                : "#ccc"
            }
          }}
          onClick={() => {
            localStorage.setItem("labName", form.labName);
            localStorage.setItem("labLogo", labLogo);
            navigate("/dashboard");
          }}
        >
          SAVE
        </Button>
      </Card>
    </Box>
  );
}