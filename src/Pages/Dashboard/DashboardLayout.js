import { Box } from "@mui/material";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardSidebar />
    </Box>
  );
};

export default DashboardLayout;
