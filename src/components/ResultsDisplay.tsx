import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress } from "@mui/material";
import { AugmentedBirth, LikesMap } from "../types";

type ListItemProps = {
  item: AugmentedBirth;
  likesMap: LikesMap;
  setLikesMap: (setter: () => { [x: string]: AugmentedBirth }) => void;
};

const ListItem = ({ item, likesMap, setLikesMap }: ListItemProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <StarIcon
        style={{
          opacity: likesMap.hasOwnProperty(item.text) ? 1 : 0.3,
          cursor: "pointer",
        }}
        onClick={() => {
          if (!likesMap.hasOwnProperty(item.text)) {
            setLikesMap(() => ({
              ...likesMap,
              [item.text]: item,
            }));
            return;
          }

          const newLikesMap = { ...likesMap };
          delete newLikesMap[item.text];
          setLikesMap(() => newLikesMap);
        }}
      />
      <div>{item.text}</div>
    </div>
  );
};

type ResultsDisplayProps = {
  items: AugmentedBirth[];
  likesMap: LikesMap;
  setLikesMap: (setter: () => { [x: string]: AugmentedBirth }) => void;
  isResultsLoading: boolean;
};

const ResultsDisplay = ({
  items,
  likesMap,
  setLikesMap,
  isResultsLoading,
}: ResultsDisplayProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item: AugmentedBirth) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isResultsLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (items.length === 0) {
    return <span>No data to display</span>;
  }

  return (
    <div>
      <label htmlFor="search-input">Search:</label>
      <input
        type="text"
        id="search-input"
        name="search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {filteredItems.map((item: AugmentedBirth) => (
          <ListItem
            key={item.text}
            item={item}
            likesMap={likesMap}
            setLikesMap={setLikesMap}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
