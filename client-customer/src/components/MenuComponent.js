import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './css/Navbar.css';
import Inform from './InformComponent';
import './css/Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      notifications: [],
      txtKeyword: '',
      showNotifications: false,
      selectedNotification: null,
      notificationBlink: false,
      showCategories: false,
    };
    this.blinkInterval = null;
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id} className="menu">
        <Link to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));

    return (
      <div className="navbar">
        <div className="logo-container">
          <Link to='/'>
            <img src="/logo192.png" alt="Home" className="logo-image" />
          </Link>
        </div>
        <div className="float-left">
        
        <ul className="menu">
        <li><Link to='/home'>Trang chủ</Link></li>
            <li className="menu" onMouseEnter={() => this.toggleCategories(true)}
              onMouseLeave={() => this.toggleCategories(false)}>
              <span>Danh Mục Sản Phẩm</span>
              {this.state.showCategories && <ul className='vertical-menu'>{cates}</ul>}
            </li>
          </ul>
        </div>
        <div style={{ display: "inline" }} class="form-switch">
          <input class="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp; Light / Dark mode
        </div>
        <div className="float-right">
          <ul className="menu">
            <li className="menu">
              <input type="search" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
              <input type="submit" value="Tìm Kiếm" onClick={(e) => this.btnSearchClick(e)} />
            </li>
            <li className="menu"><Link to='/login'>Đăng Nhập</Link>  <Link to='/signup'>Đăng Ký</Link> </li>

            <li className="menu">
              <Link to='/mycart'> Giỏ Hàng</Link>
            </li>
          </ul>

        </div>

        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  btnSearchClick = (e) => {
    e.preventDefault();
    if (this.state.txtKeyword) {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
    else {
      alert("Vui Lòng Nhập Thông Tin Tìm Kiếm");
    }
  };

  componentDidMount() {
    this.apiGetCategories();

  }



  apiGetCategories = () => {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  };
  toggleCategories(show) {
    this.setState({ showCategories: show });
  }
}

export default withRouter(Menu);
