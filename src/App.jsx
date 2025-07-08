import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiDollarSign, FiChevronRight, FiMenu, FiX, FiBell } from 'react-icons/fi';

// Your existing imports (unchanged)
import EmployeePolicy from './components/EmployeePolicy';
import HRPolicy from './components/HRPolicy';
import EmployeeSalary from './components/EmployeeSalary';
import { EmployeeDataProvider } from './EmployeeDataContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", name: "Employee Policy", icon: <FiHome className="mr-3" /> },
    { path: "/hr-policy", name: "HR Policy", icon: <FiUsers className="mr-3" /> },
    { path: "/employee-salary", name: "Employee Salary", icon: <FiDollarSign className="mr-3" /> }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col top-0 left-0 z-50 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700 lg:justify-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            HR Portal
          </h2>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link 
              to={item.path} 
              key={item.path}
              className={`flex items-center py-3 px-6 transition-all duration-200 ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={toggleSidebar}
            >
              {item.icon}
              <span className="flex-1">{item.name}</span>
              {location.pathname === item.path && (
                <FiChevronRight className="ml-2 transition-transform duration-200" />
              )}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center transition-transform hover:scale-105 duration-200">
              <span className="font-bold">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">HR Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Navbar = ({ toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full h-16 flex items-center z-30 transition-all duration-300 ${
      scrolled ? 'bg-gray-900 shadow-lg' : 'bg-gradient-to-r from-blue-600 to-blue-800'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden mr-4 p-1 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">
            <span className="hidden sm:inline">Human Resources</span>
            <span className="sm:hidden">HR</span> Management System
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors duration-200 relative">
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <FiBell className="w-6 h-6 text-white" />
          </button>
          
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 duration-200">
            <span className="text-white font-medium text-sm">AU</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <EmployeeDataProvider>
      <Router>
        <div className="min-h-screen min-w-screen  bg-gray-100">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="flex pt-16">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="flex-1 overflow-hidden ml-0 lg:ml-2 transition-all duration-300">
              <div className="p-4 overflow-y-scroll md:p-8">
                <Routes>
                  <Route path="/" element={<EmployeePolicy />} />
                  <Route path="/hr-policy" element={<HRPolicy />} />
                  <Route path="/employee-salary" element={<EmployeeSalary />} />
                  <Route path="*" element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                        <h2 className="text-2xl font-medium text-gray-700 mb-6">Page Not Found</h2>
                        <Link 
                          to="/" 
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
                        >
                          Return to Dashboard
                        </Link>
                      </div>
                    </div>
                  } />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </EmployeeDataProvider>
  );
};

export default App;