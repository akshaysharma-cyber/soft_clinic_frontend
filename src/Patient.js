import { TextField, Button, Container, Typography } from "@mui/material";
import { useState } from "react";

export default function Patient() {
  const [form, setForm] = useState({});

  const handle = (e)=> setForm({...form,[e.target.name]:e.target.value});

  return (
    <Container maxWidth="sm" style={{marginTop:50}}>
      <Typography variant="h4">Patient Registration</Typography>

      <TextField fullWidth margin="normal" name="name" label="Name" onChange={handle}/>
      <TextField fullWidth margin="normal" name="age" label="Age" onChange={handle}/>
      <TextField fullWidth margin="normal" name="mobile" label="Mobile" onChange={handle}/>
      <TextField fullWidth margin="normal" name="doctor" label="Doctor" onChange={handle}/>
      <TextField fullWidth margin="normal" name="test" label="Test" onChange={handle}/>

      <Button variant="contained" fullWidth onClick={()=>alert("Saved")}>
        Save
      </Button>
    </Container>
  );
}