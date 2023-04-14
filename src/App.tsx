import { Box, Tab, Tabs } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { AugmentedBirth, Birth, DatePickerValue, LikesMap } from "./types";
import ResultsDisplay from "./components/ResultsDisplay";
import LikesDisplay from "./components/LikesDisplay";
import { padNumber } from "./utils";

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [items, setItems] = useState<AugmentedBirth[]>([]);
  const [likesMap, setLikesMap] = useState<LikesMap>({});
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDatePickerChange = async (value: DatePickerValue | null) => {
    setIsResultsLoading(true);
    const date = dayjs(value?.$d).format("MMMM DD");
    const { $M, $D } = value!;
    const month = padNumber($M + 1);
    const day = padNumber($D);
    const { data } = await axios.get(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`
    );

    const { births } = data;

    setItems(() =>
      births.map((birth: Birth) => ({
        ...birth,
        date,
      }))
    );
    setIsResultsLoading(false);
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
            <ResultsDisplay
              items={items}
              likesMap={likesMap}
              setLikesMap={setLikesMap}
              isResultsLoading={isResultsLoading}
            />
          </>
        </div>
        <div
          style={{
            visibility: tabValue === 1 ? "visible" : "hidden",
            height: tabValue === 1 ? "unset" : "0",
          }}
        >
          <LikesDisplay likesMap={likesMap} />
        </div>
      </Box>
    </div>
  );
}

export default App;
