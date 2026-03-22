import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Divider
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function PatientSuccess() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f7fb", minHeight: "100vh" }}>

      {/* ✅ SUCCESS HEADER */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <CheckCircleIcon sx={{ color: "green", fontSize: 40 }} />
        <Typography variant="h6">
          Patient Registered Successfully!
        </Typography>
      </Box>

      <Grid container spacing={2}>

        {/* 🔹 PATIENT DETAILS */}
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, borderRadius: 3 }}>

            <Typography fontWeight="bold">Rahul Verma</Typography>
            <Typography color="gray">Age: 32</Typography>
            <Typography color="gray">Mobile: +91 9876543210</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>Test: Blood Test (CBC)</Typography>
            <Typography>Status: Sample Collected</Typography>
            <Typography>Date: 24-Apr-2024</Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
            >
              Print Bill
            </Button>
          </Card>
        </Grid>

        {/* 🔹 BILL SUMMARY */}
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, borderRadius: 3 }}>

            <Typography fontWeight="bold">Bill Summary</Typography>

            <Typography mt={2}>
              Patient ID: P20240324-01
            </Typography>
            <Typography>Total Tests: 1</Typography>
            <Typography>Total Amount: ₹300</Typography>

            <Button
              fullWidth
              sx={{
                mt: 2,
                background: "linear-gradient(90deg,#1e3c72,#2a5298)",
                color: "#fff"
              }}
            >
              Generate Bill
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* 🔹 QUEUE SECTION */}
      <Grid container spacing={2} sx={{ mt: 2 }}>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography fontWeight="bold">
              Test Added to Report Queue
            </Typography>
            <Typography color="gray">
              Complete Blood Count (CBC)
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography fontWeight="bold">
              1 More Test in Queue
            </Typography>
            <Typography color="gray">
              Waiting for results entry
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* 🔹 ACTION BUTTONS */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>

        <Button onClick={() => navigate("/patient")}>
          Add Another Patient
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard")}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}