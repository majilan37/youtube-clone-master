import { Stack } from "@mui/material";
import Image from "next/future/image";
import Link from "next/link";
import React, { useState } from "react";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

function Header() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <>
      <Stack
        direction={"row"}
        bgcolor={"black"}
        alignItems={"center"}
        p={2}
        zIndex={10}
        sx={{
          position: "sticky",
          background: "#000",
          top: 0,
          borderBottom: "1px solid #555",
          justifyContent: "space-between",
        }}>
        <Link href={"/"}>
          <div>
            <Image
              height={45}
              style={{
                cursor: "pointer",
                objectFit: "contain",
              }}
              width={60}
              src={logo}
              alt=""
            />
          </div>
        </Link>
        <SearchBar searchTerm={searchTerm} serSearchTerm={setSearchTerm} />
      </Stack>
    </>
  );
}

export default Header;
