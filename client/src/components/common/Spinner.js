import React from "react";
import spiner from "./spinner.gif";

export const Spiner = () => {
  return (
    <div>
      <img
        src={spiner}
        alt="loading"
        style={{ width: 200, margin: "auto", display: "block" }}
      />
    </div>
  );
};
