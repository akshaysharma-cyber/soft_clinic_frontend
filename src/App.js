import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import LabSetup from "./LabSetup";
import PatientSuccess from "./PatientSuccess";
import PatientForm from "./PatientForm";
import TestEntry from "./TestEntry";
import ManageTest from "./ManageTest";




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/lab-setup" element={<LabSetup />} />
      <Route path="/success" element={<PatientSuccess />} />
      <Route path="/patient" element={<PatientForm />} />
      <Route path="/test-entry" element={<TestEntry />} />
      <Route path="/manage-test" element={<ManageTest />} />
    </Routes>
  );
}