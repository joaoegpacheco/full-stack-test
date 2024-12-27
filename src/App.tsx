import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";

// Importação de componentes
import SignUpOrLogin from "./components/SignUpOrLogin";
// import TodoList from "./components/TodoList";
// import Carousel from "./components/Carousel";
// import Header from "./components/Header";

const App: React.FC = () => {
  return (
    // <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        {/* <Header /> */}
        {/* Main content */}
        <main className="flex flex-col items-center space-y-12 py-12">
          {/* <Routes>
            <Route path="/" element={<SignUpOrLogin />} />
          </Routes> */}
          <SignUpOrLogin/>
          {/* <TodoList/> */}
          {/* <Carousel/> */}
        </main>
      </div>
    // </Router>
  );
};

export default App;
