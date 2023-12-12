import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext({
  date: new Date(),
  setDate: () => {},
  employeeId: 0,
  setEmployeeId: () => {},
});

export const DashboardContextProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [employeeId, setEmployeeId] = useState(0);

  return (
    <DashboardContext.Provider
      value={{
        date,
        setDate,
        employeeId,
        setEmployeeId,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
