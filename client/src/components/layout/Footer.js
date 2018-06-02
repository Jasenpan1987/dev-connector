import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} dev connectors
    </footer>
  );
};
