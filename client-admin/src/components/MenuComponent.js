import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import './Menu.css';




class Menu extends Component {
  static contextType = MyContext;

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <div class ="navbar">
            <ul className="menu">
              <li className="menu"><Link to='/admin/home'>Home</Link></li>
              <li className="menu"><Link to='/admin/category'>Category</Link></li>
              <li className="menu"><Link to='/admin/notification'>Notification</Link></li>
              <li className="menu"><Link to='/admin/product'>Product</Link></li>
              <li className="menu"><Link to='/admin/order'>Order</Link></li>
              <li className="menu"><Link to='/admin/customer'>Customer</Link></li>
            </ul>
          </div>
        </div>
        <div className="float-right">
          <Link to='/admin/home' onClick={() => this.lnkLogoutClick()} className="logout-link">
            <span>Logout</span>
            <i className="fas fa-sign-out-alt"></i>
          </Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
}

export default Menu;
