import { Box, Tab, Tabs } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";

type DatePickerValue = {
  $d: string;
  $M: string;
  $D: string;
};

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDatePickerChange = async (value: DatePickerValue | null) => {
    const date = dayjs(value?.$d).format("MMMM DD");
    const { $M, $D } = value!;
    const { data } = await axios.get(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${$M}/${$D}`
    );

    const { births } = data;
    console.log(births);
  };

  return (
    <div className="App">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Birthday Selection" />
            <Tab label="Liked Birthdays" />
          </Tabs>
        </Box>
        <div
          style={{
            visibility: tabValue === 0 ? "visible" : "hidden",
            height: tabValue === 0 ? "unset" : "0",
          }}
        >
          <>
            <StaticDatePicker
              onChange={handleDatePickerChange}
              slotProps={{
                actionBar: {
                  actions: undefined,
                },
              }}
            />
          </>
        </div>
      </Box>
    </div>
  );
}

export default App;
