import { Search } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useLayoutEffect,
} from "react";

function SearchBar({
  searchTerm,
  serSearchTerm,
}: {
  searchTerm: string;
  serSearchTerm: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({
      pathname: `/search/${encodeURIComponent(searchTerm)}`,
    });
  };

  useEffect(() => {
    if (router.query.searchTerm) {
      serSearchTerm(router.query.searchTerm as string);
    }
  }, [router.query.searchTerm]);
  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: {
          sm: 5,
        },
      }}>
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => serSearchTerm(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px", color: "red" }}>
        <Search />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
