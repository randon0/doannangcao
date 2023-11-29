import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import './css/Mycart.css'
import Footer from './FooterComponent';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td><span className="remove" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span></td>

        </tr>
        
      );
    });
    return (
      <div width="100%">
      <div className="align-center">
        <h2 className="text-center">ITEM LIST</h2>
        <table className="datatable" border="1">
          <tbody>
            <tr className="datatable">
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            {mycart}
            <tr className='underground'>
              <td colSpan="6"></td>
              <td >Total</td>
              <td >{CartUtil.getTotal(this.context.mycart)}</td>
              <td ><span className="link" id='checkout' onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>
            </tr>
          </tbody>
        </table>
       </div>
       <Footer /></div>
       
      
    );
  }
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
      localStorage.setItem('mycart', JSON.stringify(mycart));
    }
  }
  lnkCheckoutClick() {
    const customer = this.context.customer;
    if (window.confirm(
      "Kiểm tra thông tin giao hàng: \n" +
      "Thông tin người nhận: " + "\n" +
      "Tên người nhận: " + customer.name + "\n" + 
      "Số điện thoại: " + customer.phone + "\n" + 
      "Email: " + customer.email + "\n" +
      "Địa chỉ nhận hàng: "+ "số nhà "+ customer.address.sonha + ", " + customer.address.phuong + ", " + customer.address.quan + ", " + customer.address.thanhpho + "\n" +
      "Bạn đồng ý chứ...\nNếu không, Hãy cập nhập địa chỉ nhận hàng ở My Profile"
    )) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
  
        if (customer) {
          this.apiCheckout(total, items, customer);
          // Xóa giỏ hàng sau khi thanh toán
          this.context.setMycart([]);
        } else {
          this.props.navigate('/myorders');
        }
      } else {
        alert('Giỏ hàng của bạn đang trống');
      }
    }
  }
  
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
  
        // Xóa giỏ hàng sau khi thanh toán
        this.context.setMycart([]);
        localStorage.removeItem('mycart'); // Xóa giỏ hàng khỏi local storage
  
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  componentDidMount() {
    const storedMycart = localStorage.getItem('mycart');
    if (storedMycart) {
      const mycart = JSON.parse(storedMycart);
      this.context.setMycart(mycart);
    }
  }

}


export default withRouter(Mycart);