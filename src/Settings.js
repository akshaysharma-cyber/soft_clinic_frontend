import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* ⚙️ SETTINGS ICON */}
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      {/* 🔽 POPUP MENU */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            minWidth: 180
          }
        }}
      >
        {/* Manage Test */}
        <MenuItem
          onClick={() => {
            navigate("/manage-test");
            handleClose();
          }}
        >
          Manage Test
        </MenuItem>

        {/* Language */}
        <MenuItem
          onClick={() => {
            alert("Language clicked");
            handleClose();
          }}
        >
          Language
        </MenuItem>

        {/* Other */}
        <MenuItem
          onClick={() => {
            alert("Other clicked");
            handleClose();
          }}
        >
          Other
        </MenuItem>

        {/* Divider style effect */}
        <MenuItem
          sx={{ color: "red" }}
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}