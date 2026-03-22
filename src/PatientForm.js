import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    doctor: ""
  });

  const [errors, setErrors] = useState({});

  // 🔹 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Validation
  const validate = () => {
    let temp = {};

    if (!form.name) temp.name = "Name is required";
    if (!form.age) temp.age = "Age is required";
    if (!form.gender) temp.gender = "Gender is required";
    if (!form.mobile) temp.mobile = "Mobile is required";
    else if (form.mobile.length !== 10)
      temp.mobile = "Enter valid 10-digit mobile";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // 🔹 Save
  const handleSave = () => {
    if (!validate()) return;

    console.log("Saved Patient:", form);
    alert("Patient Saved Successfully");
  };

  // 🔹 Next
  const handleNext = () => {
    if (!validate()) return;

    navigate("/test-entry", { state: form });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f7fb",
        minHeight: "100vh",
        px: 2
      }}
    >
      <Card
        sx={{
          width: 600,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        {/* 🔹 TITLE */}
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign="center"
        >
          Patient Details
        </Typography>

        {/* 🔹 FORM */}
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Patient Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          {/* Age */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          {/* Mobile */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </Grid>

          {/* Doctor */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Referring Doctor"
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* 🔹 BUTTONS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4
          }}
        >
          {/* Save */}
          <Button
            variant="outlined"
            onClick={handleSave}
            sx={{ px: 4 }}
          >
            Save
          </Button>

          {/* Next */}
          <Button
            onClick={handleNext}
            disabled={
              !form.name ||
              !form.age ||
              !form.gender ||
              !form.mobile
            }
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              background: "linear-gradient(90deg, #1e3c72, #2a5298)",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #2a5298, #1e3c72)"
              }
            }}
          >
            Next →
          </Button>
        </Box>
      </Card>
    </Box>
  );
}