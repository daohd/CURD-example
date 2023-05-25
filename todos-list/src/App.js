import logo from './logo.svg';
import './App.css';

import { Home } from './Home';
import { Customer } from './Customer';
import { Product } from './Product';
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          My React App
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Customer">
                Customer
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Product">
                Product
              </NavLink>
            </li>
          </ul>
        </nav>

        
          <Routes>
          <Route path='/home' Component={Home}></Route>
          <Route path='/Customer' Component={Customer}></Route>
          <Route path='/Product' Component={Product}></Route>
          </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
