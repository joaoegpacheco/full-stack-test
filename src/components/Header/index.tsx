import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="p-4 bg-gray-800 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">To Do App</h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Menu
        </button>
      </div>
      {isMenuOpen && (
        <nav className="mt-4 space-y-2">
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
      )}
    </header>
  );
};

export default Header;