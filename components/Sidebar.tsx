import { Stack } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Union } from "../types";
import { categories } from "../utils/constants";

function Sidebar({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: Union;
  setSelectedCategory: Dispatch<SetStateAction<Union>>;
}) {
  return (
    <Stack
      direction={"row"}
      sx={{
        overflowY: "auto",
        height: {
          sx: "auto",
          md: "95%",
        },
        flexDirection: {
          md: "column",
        },
      }}
      className="">
      {categories.map((category) => (
        <button
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory ? "#FC1503" : "none",
            color: "white",
          }}
          key={category.name}
          className="category-btn">
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}>
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}

export default Sidebar;
