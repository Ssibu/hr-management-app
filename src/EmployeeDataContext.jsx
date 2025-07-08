import React, { createContext, useContext, useState } from 'react';

const EmployeeDataContext = createContext();

const initialEmployees = [
  {
    id: 1,
    name: 'John Doe',
    empId: 'EMP001',
    number: '+1-555-0123',
    address: '123 Main St, New York, NY 10001',
    experience: '3 years',
    dateOfJoining: '2023-01-15',
    salary: 75000
  },
  {
    id: 2,
    name: 'Jane Smith',
    empId: 'EMP002',
    number: '+1-555-0124',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    experience: '5 years',
    dateOfJoining: '2022-08-20',
    salary: 82000
  }
];

export const EmployeeDataProvider = ({ children }) => {
  const [employees, setEmployees] = useState(initialEmployees);
  return (
    <EmployeeDataContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeDataContext.Provider>
  );
};

export const useEmployeeData = () => useContext(EmployeeDataContext); 