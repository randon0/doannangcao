import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      showLinks: false,
      notificationBlink: false,
      showNotifications: false,
    };
  }

  componentDidMount() {
    this.apiGetNotifications();

    // Kiểm tra xem có thông tin đăng nhập trong sessionStorage không
    const storedToken = sessionStorage.getItem('token');
    const storedCustomer = sessionStorage.getItem('customer');

    if (storedToken && storedCustomer) {
      this.context.setToken(storedToken);
      this.context.setCustomer(JSON.parse(storedCustomer));
    }

    // Bắt đầu nhấp nháy khi component được mount
    this.blinkInterval = setInterval(() => {
      this.setState((prevState) => ({
        notificationBlink: !prevState.notificationBlink,
      }));
    }, 1000); // 1 giây
  }

  componentWillUnmount() {
    // Hủy đăng ký interval khi component unmount
    clearInterval(this.blinkInterval);
  }

  apiGetNotifications = () => {
    axios.get('/api/customer/notifications').then((res) => {
      const result = res.data;
      this.setState({ notifications: result });
    });
  };

  render() {
    return (
      <div>
        

        <div className="float-left">
          {this.context.token === '' ? (
            <div></div>
            
          ) : (
            <div
              className="profile-container"
              onMouseEnter={() => this.toggleLinks(true)}
              onMouseLeave={() => this.toggleLinks(false)}
            >
              <div className="profile-info">
                Xin Chào <b>{this.context.customer.name} </b> |
              </div>
              {this.state.showLinks && (
                <div className="profile-links">
                  <Link to='/myprofile'>Thông Tin Cá Nhân</Link>
                  <Link to='/myorders'>Đơn Hàng Đã Đặt</Link>
                  <Link to='/home' onClick={() => this.lnkLogoutClick()}>
                    Đăng Xuất
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="float-clear" />
        
      </div>
    );
  }

  lnkLogoutClick() {
    // Xóa thông tin đăng nhập khỏi sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('customer');

    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
    localStorage.removeItem('mycart'); // Xóa giỏ hàng khỏi local storage
  }

  toggleLinks(show) {
    this.setState({ showLinks: show });
  }

  toggleNotifications = () => {
    this.setState((prevState) => ({
      showNotifications: !prevState.showNotifications,
      notificationBlink: false,
    }));
  };
}

export default Inform;
