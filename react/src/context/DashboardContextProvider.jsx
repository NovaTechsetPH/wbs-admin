import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext({
  date: new Date(),
  setDate: () => {},
});

export const DashboardContextProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());

  return (
    <DashboardContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
