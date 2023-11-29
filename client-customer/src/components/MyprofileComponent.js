import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'customer',
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      txtSonha: '',
      txtPhuong:'',
      txtQuan:'',
      txtThanhpho: '',
    
    };
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="align-center">
        <h2 className="text-center">MY PROFILE</h2>
        <div>
          <button onClick={() => this.changeTab('customer')} className={this.state.activeTab === 'customer' ? 'active' : ''}>Customer Information</button>
          <button onClick={() => this.changeTab('address')} className={this.state.activeTab === 'address' ? 'active' : ''}>Address Information</button>
        </div>
        {this.state.activeTab === 'customer' ? (
          <form>
            <table className="align-center">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td><input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td><input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td><input type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><input type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td></td>
                  <td><input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        ) : (
          <form>
            <table className="align-center">
              <tbody>
                <tr>
                  <td>Số nhà/Đường</td>
                  <td><input type="text" value={this.state.txtSonha} onChange={(e) => { this.setState({ txtSonha: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Phường/Xã</td>
                  <td><input type="text" value={this.state.txtPhuong} onChange={(e) => { this.setState({ txtPhuong: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Quận/Huyện</td>
                  <td><input type="text" value={this.state.txtQuan} onChange={(e) => { this.setState({ txtQuan: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Thành Phố</td>
                  <td><input type="text" value={this.state.txtThanhpho} onChange={(e) => { this.setState({ txtThanhpho: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td></td>
                  <td><input type="submit" value="UPDATE ADDRESS" onClick={(e) => this.btnUpdateAddressClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
        txtSonha: this.context.customer.address ? this.context.customer.address.sonha || '' : '',
        txtPhuong: this.context.customer.address ? this.context.customer.address.phuong || '' : '',
        txtQuan: this.context.customer.address ? this.context.customer.address.quan || '' : '',
        txtThanhpho: this.context.customer.address ? this.context.customer.address.thanhpho || '' : '',
      });
    }
    const storedMycart = localStorage.getItem('mycart');
    if (storedMycart) {
      const mycart = JSON.parse(storedMycart);
      this.context.setMycart(mycart);
    }
  }

  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username, password, name, phone, email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input all customer information fields');
    }
  }

  btnUpdateAddressClick(e) {
    e.preventDefault();
    const sonha = this.state.txtSonha;
    const phuong = this.state.txtPhuong;
    const quan = this.state.txtQuan;
    const thanhpho = this.state.txtThanhpho;
    if (sonha!=="" && phuong!=="" && quan!=="" && thanhpho!=="") {
      const address = { sonha, phuong, quan, thanhpho };
      this.apiPutAddress(this.context.customer._id, address);
    } else {
      alert('Please input Số nhà, Phường, Quận và Thành Phố');
    }


  }

  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Customer information updated successfully!');
        this.context.setCustomer(result);
      } else {
        alert('Failed to update customer information!');
      }
    });
  }

  apiPutAddress(id, address) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/address/' + id, address, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Address updated successfully!');
        this.context.setCustomer(result);

      } else {
        alert('Failed to update address!');
      }
    });
  }
  

  changeTab(tab) {
    this.setState({ activeTab: tab });
  }
}

export default Myprofile;
