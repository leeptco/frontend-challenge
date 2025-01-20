import React from 'react';
import './css/main.css'; 

const Header = ({ activePage, setActivePage }) => {
  return (
   
<header className="header">
         <ul className="nav-list">
          <li className="nav-item"><button
        className={`tab ${activePage === 'all' ? 'active' : ''}`}
        onClick={() => setActivePage('all')}
      >
        Все котики
      </button>
      </li>
           <li className="nav-item">
           <button
        className={`tab tablong ${activePage === 'favorites' ? 'active' : ''}`}
        onClick={() => setActivePage('favorites')}
      >
        Любимые котики
      </button>
           </li>
         </ul>
     </header>
  );
};

export default Header;