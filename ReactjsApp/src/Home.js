import React, { Component } from 'react';
import { variables } from './Variables.js';
import { Table,Select } from 'antd';
import { Product } from './Product.js';
const { Option } = Select;
const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderid',
    },
    {
      title: 'Customer',
      dataIndex: 'CustomerName',
      sorter: (a, b) => a.Customer - b.CustomerId,
     
    },
    {
      title: 'ProductID',
      dataIndex: 'ProductId',
      sorter: (a, b) => a.ProductId - b.ProductId,
    },
   
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Customers: [],
            Products: [],
            Orders:[],
            modalTitle: "",
            OrderID: 0,
            Customer: 0,
            Product: 0,
            lstProduct:[],
           
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Product/GetProduct')
        .then(response => response.json())
        .then(data => {
            this.setState({ Products: data });
        });
        fetch(variables.API_URL + 'Order/GetOrders')
        .then(response => response.json())
        .then(data => {
            this.setState({ Orders: data });
        });
        
            fetch(variables.API_URL + 'Customer/GetCustomer')
            .then(response => response.json())
            .then(data => {
                this.setState({ Customers: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeProduct = (e) => {
        this.setState({ Product: e.target.value });
    }
    changeCustomer = (e) => {
        this.setState({ Customer: e.target.value });
    }
    

    addClick() {
        this.setState({
            modalTitle: "Add Order",
            OrderId: 0,
            Customer: undefined,
            Product: undefined,
          lstProduct:[],
          
        });
    }
   

    createClick() {
      var lstTemp =  [];
      lstTemp.push({
            ProductId: Product,
          });
        // lstProduct= lstProduct.push(ProductId:Product)
        // lstProduct = lstProduct.push({
        //     ...o,
        //     ProductId: Product,
        //   }));
        // }
        fetch(variables.API_URL + 'Order/createOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustomerId: this.state.Customer,
                ProductId: this.state.Product,
               
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    

   

   

    render() {
        const {
            Customers,
            Products,
            Orders,
            modalTitle,
            OrderID,
            Product,
            Customer,
            lstProduct,
            
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Order
                </button>
                <Table columns={columns} dataSource={Orders} onChange={onChange} />
               

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-cloSse" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                            <div className="input-group mb-3">
                            <label>Customer <span style={{ color: 'red' }}>*</span></label>
                            <select className="txtCustomer" style={{width:'300px', marginLeft:'10px', border: '1px solid gray',borderRadius:'10px',height:'30px'}}
                                                onChange={this.changeCustomer}
                                                placeholder="chọn sản phẩm"
                                                value={Customer}>
                                                {Customers.map(dep =>
                                                    <option key={dep.CustomerId} value={dep.CustomerId}>
                                                        {dep.FullName}
                                                    </option>)}
                                            </select>
                                            
                                        </div>
                                        <div className="input-group mb-5">
                                        <label>Product<span style={{ color: 'red' }}>*</span></label>
                                        <select className="txtShop" style={{width:'300px', marginLeft:'10px', border: '1px solid gray',borderRadius:'10px',height:'30px'}}
                                                onChange={this.changeProduct}
                                                placeholder="chọn sản phẩm"
                                                value={Product}>
                                                {Products.map(dep =>
                                                    <option key={dep.ProductId} value={dep.ProductId}>
                                                        {dep.ProductName}
                                                    </option>)}
                                            </select>
                                            {/* <Select
                                            style={{ width: '300px' ,marginLeft:'20px'}}
                                            mode='multiple'
                                           
                                            
                                            onChange={this.changeProduct}
                                           
                                            placeholder='Chọn Sản phẩm'
                                            value={Product} 
                                            >

                                            {Products.map(pro => (
                                                <Option key={pro.ProductId} filter={pro.ProductName} value={pro.ProductName}>{pro.ProductId} - {pro.ProductName}</Option>
                                            ))}

                                        </Select> */}
                                        </div>
                                <button type="button"
                                        className="btn btn-primary "
                                        onClick={() => this.createClick()}
                                        style={{float:'right', marginTop:'10px',borderRadius:'10px'}}
                                    >Create</button>
                               
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}