import {
  Box,
  Typography,
  Card,
  TextField,
  MenuItem,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ManageTest() {

  const [form, setForm] = useState({
    category: "",
    testName: "",
    price: ""
  });

  const [testList, setTestList] = useState([]);

  // 🔹 Load existing data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("labTests")) || [];
    setTestList(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Save / Update
  const handleSave = () => {
    if (!form.testName || !form.price) return;

    const existing = testList.find(
      (t) => t.testName === form.testName
    );

    let updatedList;

    if (existing) {
      updatedList = testList.map((t) =>
        t.testName === form.testName ? form : t
      );
    } else {
      updatedList = [...testList, form];
    }

    setTestList(updatedList);

    // 🔥 Save in localStorage
    localStorage.setItem("labTests", JSON.stringify(updatedList));

    setForm({ category: "", testName: "", price: "" });
  };

  const totalAmount = testList.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f7fb", minHeight: "100vh" }}>

      <Typography variant="h5" mb={3}>
        Manage Tests
      </Typography>

      {/* FORM */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>

          {/* CATEGORY */}
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <MenuItem value="Hematology">Hematology</MenuItem>
              <MenuItem value="Serology">Serology</MenuItem>
              <MenuItem value="Biochemistry">Biochemistry</MenuItem>
              <MenuItem value="Urine">Urine</MenuItem>
              <MenuItem value="General">General</MenuItem>
            </TextField>
          </Grid>

          {/* TEST NAME */}
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              label="Test Name"
              name="testName"
              value={form.testName}
              onChange={handleChange}
            >
              <MenuItem value="CBC">CBC</MenuItem>
              <MenuItem value="Malaria">Malaria</MenuItem>
              <MenuItem value="Dengue">Dengue</MenuItem>
              <MenuItem value="Blood Sugar">Blood Sugar</MenuItem>
              <MenuItem value="Blood Group">Blood Group</MenuItem>
              <MenuItem value="CRP">CRP</MenuItem>
              <MenuItem value="Lipid Profile">Lipid Profile</MenuItem>
              <MenuItem value="HBsAg">HBsAg</MenuItem>
              <MenuItem value="HIV">HIV</MenuItem>
              <MenuItem value="KFT">KFT</MenuItem>
              <MenuItem value="LFT">LFT</MenuItem>
              <MenuItem value="Widal">Widal</MenuItem>
              <MenuItem value="Urine">Urine</MenuItem>
            </TextField>
          </Grid>

          {/* PRICE */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Button sx={{ mt: 2 }} variant="contained" onClick={handleSave}>
          Save / Update
        </Button>
      </Card>

      {/* TABLE */}
      <Card sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {testList.map((t, i) => (
              <TableRow key={i}>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.testName}</TableCell>
                <TableCell>₹ {t.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography sx={{ mt: 2, textAlign: "right" }}>
          <b>Total Amount: ₹ {totalAmount}</b>
        </Typography>
      </Card>
    </Box>
  );
}