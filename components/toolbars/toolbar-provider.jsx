"use client";
import React from "react";
import { TooltipProvider } from "../ui/tooltip";

export const ToolbarContext = React.createContext(null);

export const ToolbarProvider = ({ editor, children }) => {
  return (
    <ToolbarContext.Provider value={{ editor }}>
      <TooltipProvider>{children}</TooltipProvider>
    </ToolbarContext.Provider>
  );
};

export const useToolbar = () => {
  const context = React.useContext(ToolbarContext);

  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }

  return context;
};
