import axios from 'axios';
import React, { Component } from 'react';
import './css/Active.css'

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="active-align-center">
        <div className="active-container">
        <h2 className="text-center">Xác Thực Tài Khoản</h2>
        <h3 className="text-center">Vui Lòng Kiểm Tra Email Để Lấy ID và Token</h3>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td>ID</td>
                <td><div className='active-input-container'><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></div></td>
              </tr>
              <tr>
                <td>Token</td>
                <td><div className='active-input-container'><input type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></div></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='active-submit-button' type="submit" value="Xác Thực" onClick={(e) => this.btnActiveClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Active;