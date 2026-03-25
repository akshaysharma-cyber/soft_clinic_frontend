import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import { Menu, MenuItem as MuiMenuItem } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const labName = localStorage.getItem("labName");
  const labLogo = localStorage.getItem("labLogo");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    console.log("clicked", event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;


  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f7fb" }}>

      {/* 🔥 SETTINGS POPUP MENU */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MuiMenuItem
            onClick={() => {
              navigate("/manage-test");
              handleClose();
            }}
          >
            Manage Test
          </MuiMenuItem>

          <MuiMenuItem onClick={handleClose}>
            Language
          </MuiMenuItem>

          <MuiMenuItem
            onClick={() => {
              navigate("/");
              handleClose();
            }}
            sx={{ color: "red" }}
          >
            Sign Out
          </MuiMenuItem>
        </Menu>

      {/* 🔹 SIDEBAR */}
      <Box sx={{ width: 220, bgcolor: "#eef3f9", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <img
            src={labLogo || logo}
            style={{ width: 40, marginRight: 10, borderRadius: 5 }}
          />
          <Typography fontWeight="bold">LabZen</Typography>
        </Box>

        <MenuItem
          icon={<DashboardIcon />}
          label="Dashboard"
          active={isActive("/dashboard")}
          onClick={() => navigate("/dashboard")}
        />

        <MenuItem
          icon={<PeopleIcon />}
          label="Patients"
          active={isActive("/patient")}
          onClick={() => navigate("/patient")}
        />

        <MenuItem icon={<DescriptionIcon />} label="Reports" />
        <MenuItem
          icon={<SettingsIcon />}
          label="Settings"
          onClick={handleClick}
        />
      </Box>

      {/* 🔹 MAIN CONTENT */}
      <Box sx={{ flex: 1, p: 3 }}>

        {/* TOP NAV */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">
            {labName ? `${labName} Dashboard` : "Home Dashboard"}
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <NavItem label="Dashboard" onClick={() => navigate("/dashboard")} />
            <NavItem label="Patients" onClick={() => navigate("/patient")} />
            <NavItem label="Reports" />
          </Box>
        </Box>

        {/* CARDS */}
        <Grid container spacing={2}>
          <DashboardCard title="Tests Registered" value="14" color="#e3f2fd" />
          <DashboardCard title="Reports Pending" value="08" color="#fff3e0" />
          <DashboardCard title="Payments Received" value="₹1450" color="#ede7f6" />
          <DashboardCard title="Reports Completed" value="12" color="#e8f5e9" />
          <DashboardCard title="Total Patients Today" value="27" color="#e0f7fa" />
        </Grid>

        {/* Upload */}
        
      </Box>

      {/* 🔹 FOOTER */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 220,
          right: 0,
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "space-around",
          py: 1
        }}
      >
        <FooterItem
          icon={<DashboardIcon />}
          label="Dashboard"
          active={isActive("/dashboard")}
          onClick={() => navigate("/dashboard")}
        />

        <FooterItem
          icon={<PeopleIcon />}
          label="Patients"
          active={isActive("/patient")}
          onClick={() => navigate("/patient")}
        />

        <FooterItem icon={<DescriptionIcon />} label="Reports" />
        <FooterItem
        icon={<SettingsIcon />}
        label="Settings"
        onClick={handleClick}
      />
      </Box>
    </Box>
  );
}

/* 🔹 COMPONENTS */

function MenuItem({ icon, label, active, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: active ? "#dbeafe" : "transparent",
        color: active ? "#1e3a8a" : "#555",
        mb: 1
      }}
    >
      {icon}
      {label}
    </Box>
  );
}

function NavItem({ label, onClick }) {
  return (
    <Typography sx={{ cursor: "pointer", color: "#555" }} onClick={onClick}>
      {label}
    </Typography>
  );
}

function DashboardCard({ title, value, color }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ borderRadius: 3, bgcolor: color }}>
        <CardContent>
          <Typography color="gray">{title}</Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function FooterItem({ icon, label, active, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        textAlign: "center",
        cursor: "pointer",
        color: active ? "#1e3a8a" : "#777"
      }}
    >
      {icon}
      <Typography fontSize={12}>{label}</Typography>
    </Box>
  );
}