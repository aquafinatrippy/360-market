import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const Spinner = () => {
  return (
    <div className="loadingSpinnerComponent">
      <CircularProgress />
    </div>
  );
};
