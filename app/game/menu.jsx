import React, { useState } from 'react';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div id="wrapper" className={isClosed ? 'toggled' : ''}>
      <div className={`overlay ${isClosed ? 'closed' : ''}`} onClick={toggleSidebar}></div>

      <nav className={`navbar navbar-inverse fixed-top ${isClosed ? 'toggled' : ''}`} id="sidebar-wrapper" role="navigation">
        <ul className="nav sidebar-nav">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <a href="#">Brand</a>
            </div>
          </div>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Animais <span className="caret"></span></a>
            <ul className="dropdown-menu animated fadeInLeft" role="menu">
              <div className="dropdown-header">Animais</div>
              <li><a href="#">Cachorros</a></li>
              <li><a href="#">Gatos</a></li>
              <li><a href="#">Répteis</a></li>
              <li><a href="#">Marinhos</a></li>
            </ul>
          </li>
          <li><a href="#">Objetos</a></li>
          <li><a href="#">Famosos</a></li>
          <li><a href="#">Filmes</a></li>
          <li><a href="#">Comida</a></li>
          <li><a href="#">Música</a></li>
          <li><a href="#">Televisão</a></li>
          <li><a href="#">História</a></li>
        </ul>
      </nav>

      <div id="page-content-wrapper">
        <button type="button" className={`hamburger animated fadeInLeft ${isClosed ? 'is-open' : 'is-closed'}`} data-toggle="offcanvas" onClick={toggleSidebar}>
          <span className="hamb-top"></span>
          <span className="hamb-middle"></span>
          <span className="hamb-bottom"></span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
