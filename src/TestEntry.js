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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent
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
    cbc: false,
    malaria: false,
    dengue: false
  });

  const [expanded, setExpanded] = useState({
    cbc: true,
    malaria: false,
    dengue: false
  });

  const [results, setResults] = useState({});
  const [testPrices, setTestPrices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // NEW STATES
  const [savedData, setSavedData] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("labTests")) || [];
    setTestPrices(saved);
  }, []);

  const getPrice = (name) => {
    const found = testPrices.find((t) => t.testName === name);
    return found ? Number(found.price) : 0;
  };

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

  // SAVE FUNCTION
  const handleSave = () => {
    const data = { patient, tests, results, totalAmount };
    setSavedData(data);
    setShowSuccess(true);
  };

  if (!patient) {
    return <Typography>No patient data found</Typography>;
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f7fb", minHeight: "100vh" }}>

      {/* HEADER */}
      <Box sx={{ mb: 3, p: 2.5, borderRadius: 2, backgroundColor: "#e3f2fd", textAlign: "center" }}>
        <Box component="img" src="/logo.png" sx={{ height: 50, mb: 1 }} />
        <Typography variant="h6" fontWeight="600">
          Test Selection & Results Entry
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage patient tests and enter results
        </Typography>
      </Box>

      {/* PATIENT DETAILS */}
      <Card sx={{ p: 2.5, mb: 3, backgroundColor: "#f1f8e9" }}>
        <Typography fontWeight="600" mb={2}>Patient Details</Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography color="text.secondary">Name</Typography>
            <Typography fontWeight="600">{patient.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary">Age</Typography>
            <Typography fontWeight="600">{patient.age}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary">Gender</Typography>
            <Typography fontWeight="600">{patient.gender}</Typography>
          </Grid>
        </Grid>
      </Card>

      {/* SELECT TESTS */}
      <Typography fontWeight="600" mb={1}>Select Tests</Typography>

      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        <FormControlLabel control={<Checkbox checked={tests.cbc} onChange={() => handleCheck("cbc")} />} label="CBC" />
        <FormControlLabel control={<Checkbox checked={tests.malaria} onChange={() => handleCheck("malaria")} />} label="Malaria" />
        <FormControlLabel control={<Checkbox checked={tests.dengue} onChange={() => handleCheck("dengue")} />} label="Dengue" />
      </Box>

      {/* CBC */}
      {tests.cbc && (
        <Card sx={{ p: 2, mb: 2, backgroundColor: "#e3f2fd" }}>
          <Typography fontWeight="600">CBC Test (₹ {getPrice("CBC")})</Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={4}>Hemoglobin</Grid>
            <Grid item xs={6}><TextField fullWidth size="small" name="hemoglobin" onChange={handleChange} /></Grid>

            <Grid item xs={4}>RBC Count</Grid>
            <Grid item xs={6}><TextField fullWidth size="small" name="rbc" onChange={handleChange} /></Grid>

            <Grid item xs={4}>WBC Count</Grid>
            <Grid item xs={6}><TextField fullWidth size="small" name="wbc" onChange={handleChange} /></Grid>
          </Grid>
        </Card>
      )}

      {/* MALARIA */}
      {tests.malaria && (
        <Card sx={{ p: 2, mb: 2, backgroundColor: "#fff8e1" }}>
          <Typography fontWeight="600">Malaria Test (₹ {getPrice("Malaria")})</Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={4}>Parasite Type</Grid>
            <Grid item xs={6}>
              <TextField select fullWidth size="small" name="parasite" onChange={handleChange}>
                <MenuItem value="Falciparum">Falciparum</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>Result</Grid>
            <Grid item xs={6}>
              <TextField select fullWidth size="small" name="malariaResult" onChange={handleChange}>
                <MenuItem value="Positive">Positive</MenuItem>
                <MenuItem value="Negative">Negative</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* DENGUE */}
      {tests.dengue && (
        <Card sx={{ p: 2, mb: 2, backgroundColor: "#f3e5f5" }}>
          <Typography fontWeight="600">Dengue Test (₹ {getPrice("Dengue")})</Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={4}>NS1 Antigen</Grid>
            <Grid item xs={6}><TextField fullWidth size="small" name="ns1" onChange={handleChange} /></Grid>

            <Grid item xs={4}>IgG</Grid>
            <Grid item xs={6}><TextField fullWidth size="small" name="igg" onChange={handleChange} /></Grid>

            <Grid item xs={4}>IgM</Grid>
            <Grid item xs={6}><TextField fullWidth size="small" name="igm" onChange={handleChange} /></Grid>
          </Grid>
        </Card>
      )}

      {/* TOTAL */}
      <Card sx={{ p: 2, mt: 3, backgroundColor: "#e8f5e9" }}>
        <Typography fontWeight="600">
          Total Amount: ₹ {totalAmount}
        </Typography>
      </Card>

      {/* BUTTONS */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={handleSave}>Save</Button>

        {savedData && (
          <Button variant="contained" color="secondary" onClick={() => setOpenPreview(true)}>
            Preview
          </Button>
        )}

        <Button variant="outlined" onClick={() => navigate("/dashboard")}>
          Close
        </Button>
      </Box>

      {/* SUCCESS */}
      {showSuccess && (
        <Typography color="green" mt={2}>
          Saved Successfully ✅
        </Typography>
      )}

      {/* PREVIEW */}
      <Dialog open={openPreview} onClose={() => setOpenPreview(false)} fullWidth maxWidth="sm">
  <DialogTitle sx={{ fontWeight: "600" }}>
    Test Preview
  </DialogTitle>

  <DialogContent>

    {/* PATIENT */}
    <Box mb={2} p={2} sx={{ background: "#f5f7fb", borderRadius: 2 }}>
      <Typography fontWeight="600" mb={1}>Patient Details</Typography>

      <Typography><b>Name:</b> {savedData?.patient.name}</Typography>
      <Typography><b>Age:</b> {savedData?.patient.age}</Typography>
      <Typography><b>Gender:</b> {savedData?.patient.gender}</Typography>
    </Box>

    {/* CBC */}
    {savedData?.tests.cbc && (
      <Box mb={2} p={2} sx={{ background: "#e3f2fd", borderRadius: 2 }}>
        <Typography fontWeight="600" mb={1}>CBC</Typography>

        {isEditing ? (
          <>
            <TextField fullWidth size="small" label="Hemoglobin" value={results.hemoglobin || ""} onChange={handleChange} name="hemoglobin" sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="RBC" value={results.rbc || ""} onChange={handleChange} name="rbc" sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="WBC" value={results.wbc || ""} onChange={handleChange} name="wbc" />
          </>
        ) : (
          <>
            <Typography>Hemoglobin: {savedData.results.hemoglobin}</Typography>
            <Typography>RBC: {savedData.results.rbc}</Typography>
            <Typography>WBC: {savedData.results.wbc}</Typography>
          </>
        )}
      </Box>
    )}

    {/* MALARIA */}
    {savedData?.tests.malaria && (
      <Box mb={2} p={2} sx={{ background: "#fff8e1", borderRadius: 2 }}>
        <Typography fontWeight="600" mb={1}>Malaria</Typography>

        {isEditing ? (
          <>
            <TextField
              select
              fullWidth
              size="small"
              label="Parasite"
              value={results.parasite || ""}
              name="parasite"
              onChange={handleChange}
              sx={{ mb: 1 }}
            >
              <MenuItem value="Falciparum">Falciparum</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              size="small"
              label="Result"
              value={results.malariaResult || ""}
              name="malariaResult"
              onChange={handleChange}
            >
              <MenuItem value="Positive">Positive</MenuItem>
              <MenuItem value="Negative">Negative</MenuItem>
            </TextField>
          </>
        ) : (
          <>
            <Typography>Parasite: {savedData.results.parasite}</Typography>
            <Typography>Result: {savedData.results.malariaResult}</Typography>
          </>
        )}
      </Box>
    )}

    {/* DENGUE */}
    {savedData?.tests.dengue && (
      <Box mb={2} p={2} sx={{ background: "#f3e5f5", borderRadius: 2 }}>
        <Typography fontWeight="600" mb={1}>Dengue</Typography>

        {isEditing ? (
          <>
            <TextField fullWidth size="small" label="NS1" name="ns1" value={results.ns1 || ""} onChange={handleChange} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="IgG" name="igg" value={results.igg || ""} onChange={handleChange} sx={{ mb: 1 }} />
            <TextField fullWidth size="small" label="IgM" name="igm" value={results.igm || ""} onChange={handleChange} />
          </>
        ) : (
          <>
            <Typography>NS1: {savedData.results.ns1}</Typography>
            <Typography>IgG: {savedData.results.igg}</Typography>
            <Typography>IgM: {savedData.results.igm}</Typography>
          </>
        )}
      </Box>
    )}

    {/* TOTAL */}
    <Box p={2} sx={{ background: "#e8f5e9", borderRadius: 2 }}>
      <Typography fontWeight="600">
        Total: ₹ {totalAmount}
      </Typography>
    </Box>

    {/* ACTION BUTTONS */}
    <Box mt={3} display="flex" gap={2} justifyContent="flex-end">

      {!isEditing ? (
        <Button variant="contained" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setSavedData({ ...savedData, results });
            setIsEditing(false);
          }}
        >
          Save Changes
        </Button>
      )}

      <Button variant="outlined" onClick={() => setOpenPreview(false)}>
        Close
      </Button>

    </Box>

  </DialogContent>
</Dialog>
    </Box>
  );
}