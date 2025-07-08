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
  },
  {
    id: 3,
    name: 'Carlos Martinez',
    empId: 'EMP003',
    number: '+1-555-0125',
    address: '789 Pine St, Miami, FL 33101',
    experience: '1 year',
    dateOfJoining: '2024-01-10',
    salary: 60000
  },
  {
    id: 4,
    name: 'Aisha Khan',
    empId: 'EMP004',
    number: '+1-555-0126',
    address: '321 Maple Ave, Houston, TX 77002',
    experience: '2 years',
    dateOfJoining: '2023-06-01',
    salary: 67000
  },
  {
    id: 5,
    name: 'Liu Wei',
    empId: 'EMP005',
    number: '+1-555-0127',
    address: '654 Cedar Rd, Seattle, WA 98101',
    experience: '4 years',
    dateOfJoining: '2021-11-15',
    salary: 90000
  },
  {
    id: 6,
    name: 'Fatima Zahra',
    empId: 'EMP006',
    number: '+1-555-0128',
    address: '987 Spruce St, Chicago, IL 60601',
    experience: '2 years',
    dateOfJoining: '2023-03-20',
    salary: 71000
  },
  {
    id: 7,
    name: 'Ivan Petrov',
    empId: 'EMP007',
    number: '+1-555-0129',
    address: '159 Elm St, Boston, MA 02108',
    experience: '3 years',
    dateOfJoining: '2022-12-05',
    salary: 78000
  },
  {
    id: 8,
    name: 'Sara Svensson',
    empId: 'EMP008',
    number: '+1-555-0130',
    address: '753 Willow Dr, Denver, CO 80202',
    experience: '1 year',
    dateOfJoining: '2024-02-18',
    salary: 62000
  },
  {
    id: 9,
    name: 'Mohammed Al-Farsi',
    empId: 'EMP009',
    number: '+1-555-0131',
    address: '852 Aspen Ct, Phoenix, AZ 85001',
    experience: '5 years',
    dateOfJoining: '2020-09-10',
    salary: 95000
  },
  {
    id: 10,
    name: 'Emily Brown',
    empId: 'EMP010',
    number: '+1-555-0132',
    address: '951 Birch Blvd, San Francisco, CA 94102',
    experience: '2 years',
    dateOfJoining: '2023-05-25',
    salary: 68000
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