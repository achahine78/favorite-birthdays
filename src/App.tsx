import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
          >
            <Tab label="Birthday Selection" />
            <Tab label="Liked Birthdays" />
          </Tabs>
        </Box>
        { value === 0 && '0'}
        { value === 1 && '1'}
      </Box>
    </div>
  );
}

export default App;