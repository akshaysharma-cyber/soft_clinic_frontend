import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Card,
  TextField,
  Button,
  MenuItem,
  Grid,
  IconButton
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function TestEntry() {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state;

  const [tests, setTests] = useState({
    cbc: true,
    malaria: true,
    dengue: false
  });

  const [expanded, setExpanded] = useState({
    cbc: true,
    malaria: false,
    dengue: false
  });

  const [results, setResults] = useState({});

  //  NEW: price data
  const [testPrices, setTestPrices] = useState([]);

  //  Load prices from ManageTest
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("labTests")) || [];
    setTestPrices(saved);
  }, []);

  // Get price
  const getPrice = (name) => {
    const found = testPrices.find((t) => t.testName === name);
    return found ? Number(found.price) : 0;
  };

  // Total calculation
  const totalAmount =
    (tests.cbc ? getPrice("CBC") : 0) +
    (tests.malaria ? getPrice("Malaria") : 0) +
    (tests.dengue ? getPrice("Dengue") : 0);

  const handleCheck = (name) => {
    setTests({ ...tests, [name]: !tests[name] });
  };

  const toggleExpand = (name) => {
    setExpanded({ ...expanded, [name]: !expanded[name] });
  };

  const handleChange = (e) => {
    setResults({ ...results, [e.target.name]: e.target.value });
  };

  if (!patient) {
    return <Typography>No patient data found</Typography>;
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f7fb", minHeight: "100vh" }}>

      <Typography variant="h5" mb={3}>
        Test Selection & Results Entry
      </Typography>

      {/* PATIENT INFO */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Typography><b>Name:</b> {patient.name}</Typography>
        <Typography><b>Age:</b> {patient.age}</Typography>
        <Typography><b>Gender:</b> {patient.gender}</Typography>
      </Card>

      {/* SELECT TESTS */}
      <Box mb={3}>
        <Typography>Select Tests</Typography>

        <FormControlLabel
          control={<Checkbox checked={tests.cbc} onChange={() => handleCheck("cbc")} />}
          label="CBC"
        />
        <FormControlLabel
          control={<Checkbox checked={tests.malaria} onChange={() => handleCheck("malaria")} />}
          label="Malaria"
        />
        <FormControlLabel
          control={<Checkbox checked={tests.dengue} onChange={() => handleCheck("dengue")} />}
          label="Dengue"
        />
      </Box>

      {/* CBC */}
      {tests.cbc && (
        <Card sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight="bold">
              CBC Test (₹ {getPrice("CBC")})
            </Typography>

            <IconButton onClick={() => toggleExpand("cbc")}>
              {expanded.cbc ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          </Box>

          {expanded.cbc && (
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>Hemoglobin</Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" name="hemoglobin" onChange={handleChange} />
              </Grid>

              <Grid item xs={6}>RBC Count</Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" name="rbc" onChange={handleChange} />
              </Grid>

              <Grid item xs={6}>WBC Count</Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" name="wbc" onChange={handleChange} />
              </Grid>
            </Grid>
          )}
        </Card>
      )}

      {/* MALARIA */}
      {tests.malaria && (
        <Card sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight="bold">
              Malaria Test (₹ {getPrice("Malaria")})
            </Typography>

            <IconButton onClick={() => toggleExpand("malaria")}>
              {expanded.malaria ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          </Box>

          {expanded.malaria && (
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>Parasite Type</Grid>
              <Grid item xs={6}>
                <TextField select fullWidth size="small" name="parasite" onChange={handleChange}>
                  <MenuItem value="Falciparum">Falciparum</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>Result</Grid>
              <Grid item xs={6}>
                <TextField select fullWidth size="small" name="malariaResult" onChange={handleChange}>
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Negative">Negative</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
        </Card>
      )}

      {/* DENGUE */}
      {tests.dengue && (
        <Card sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight="bold">
              Dengue Test (₹ {getPrice("Dengue")})
            </Typography>

            <IconButton onClick={() => toggleExpand("dengue")}>
              {expanded.dengue ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          </Box>

          {expanded.dengue && (
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>NS1 Antigen</Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" name="ns1" onChange={handleChange} />
              </Grid>

              <Grid item xs={6}>IgG</Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" name="igg" onChange={handleChange} />
              </Grid>

              <Grid item xs={6}>IgM</Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" name="igm" onChange={handleChange} />
              </Grid>
            </Grid>
          )}
        </Card>
      )}

      {/* TOTAL BILL */}
      <Card sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6">
          Total Amount: ₹ {totalAmount}
        </Typography>
      </Card>

      {/* BUTTONS */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained">Save</Button>
        <Button variant="contained" color="success">Print PDF</Button>
        <Button variant="outlined" onClick={() => navigate("/dashboard")}>
          Close
        </Button>
      </Box>
    </Box>
  );
}