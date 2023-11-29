import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import './css/Login.css'
import './css/Navbar.css'
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'admin',
      txtPassword: '123'
    };
  }
  render() {
    return (
      <div className="align-center">
        <div className="login-container">
        <h2 className="text-center">Đăng Nhập Thành Viên</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr className='text-center'>
                <td >Tài Khoản</td>
                <td>
                <div className="input-container">
                  <input className="custom-input" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></div></td>
              </tr>
              <tr className='text-center'>
              
              <td>Mật Khẩu</td>
                <td>
                <div className="input-container"><input class='input1' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></div></td>
              </tr>
              <tr>
                <td>
                  <input className="submit-button" type="submit" value="Đăng Nhập" onClick={(e) => this.btnLoginClick(e)} />
                  <td>
                  <button className="link-button" type="button" onClick={(e) => this.btnResetPasswordClick(e)}>Quên Mật Khẩu</button>
                  </td>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        </div>
      </div>
    );
  }
  btnResetPasswordClick(e) {
    e.preventDefault();
    // Add logic to handle the reset password action
    // You can navigate to the reset password page or show a modal, etc.
    // For example:
    this.props.navigate('/reset-password');
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        // Lưu thông tin đăng nhập vào sessionStorage
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('customer', JSON.stringify(result.customer));
  
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);