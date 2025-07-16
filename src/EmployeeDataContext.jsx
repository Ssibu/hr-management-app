import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeDataContext = createContext();

const API_URL = 'http://localhost:5000/api/employees';

export const EmployeeDataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/all`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch employees');
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <EmployeeDataContext.Provider value={{ employees, setEmployees, loading, error }}>
      {children}
    </EmployeeDataContext.Provider>
  );
};

export const useEmployeeData = () => useContext(EmployeeDataContext); 