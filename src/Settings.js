import { Box, Typography, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Center Container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          textAlign="center"
          fontWeight="600"
        >
          Settings
        </Typography>

        {/* Options Card */}
        <Card
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            boxShadow: 3,
            cursor: "pointer",
            "&:hover": { bgcolor: "#f0f4ff" },
          }}
          onClick={() => navigate("/manage-test")}
        >
          Manage Test
        </Card>

        <Card
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            boxShadow: 3,
            "&:hover": { bgcolor: "#f9fafc" },
          }}
        >
          Language
        </Card>

        <Card
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            boxShadow: 3,
            "&:hover": { bgcolor: "#f9fafc" },
          }}
        >
          Other
        </Card>

        {/* Sign Out Button */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: 2,
          }}
          onClick={() => navigate("/")}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}