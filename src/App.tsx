import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importação de componentes
// import Login from "./components/Login";
import SignUpOrLogin from "./components/SignUpOrLogin";
// import TodoList from "./components/TodoList";
// import Carousel from "./components/Carousel";

// Importação de páginas
// import HomePage from "./pages/HomePage";

// Importação de estilos
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Coopers</h1>
            <div className="space-x-4">
              {/* <a href="#login" className="hover:text-gray-200">Login</a>
              <a href="#signup" className="hover:text-gray-200">Sign Up</a>
              <a href="#todo" className="hover:text-gray-200">To-Do List</a> */}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex flex-col items-center space-y-12 py-12">
          <Routes>
            <Route path="/" element={<SignUpOrLogin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
