import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import Footer from './FooterComponent';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sort: null,
    };
  }

  render() {
    const { products, sort } = this.state;
    const prods = products.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                width="300px"
                height="300px"
                alt=""
              />
            </Link>
            <figcaption className="text-center">
              {item.name}
              <br />
              Price: {item.price}
            </figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div className="text-center">
        <ul>
        <h2 className="text-center">LIST PRODUCTS</h2>
        <select className='select'
          value={sort}
          onChange={(e) => this.handleSortChange(e.target.value)}
        >
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select></ul>
        {prods}
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  handleSortChange = (sort) => {
    this.setState({ sort }, () => {
      if (this.state.sort === 'nameAsc') {
        this.state.products.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.state.sort === 'nameDesc') {
        this.state.products.sort((a, b) => b.name.localeCompare(a.name));
      } else if (this.state.sort === 'priceAsc') {
        this.state.products.sort((a, b) => a.price - b.price);
      } else if (this.state.sort === 'priceDesc') {
        this.state.products.sort((a, b) => b.price - a.price);
      }
    });
  };

  apiGetProductsByKeyword(keyword) {
    axios
      .get('/api/customer/products/search/' + keyword)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result });
      });
  }

  apiGetProductsByCatID(cid) {
    axios
      .get('/api/customer/products/category/' + cid)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result });
      });
  }
}

export default withRouter(Product);