import React, { Component } from 'react';
import { variables } from './Variables.js';
import { Table,Select } from 'antd';
const { Option } = Select;
const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderid',
    },
    {
      title: 'Customer ID',
      dataIndex: 'CustomerId',
      sorter: (a, b) => a.CustomerId - b.CustomerId,
     
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
            Customer: "",
            Product: "",
           
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Product/GetProduct')
        .then(response => response.json())
        .then(data => {
            this.setState({ Products: data });
        });
        
            fetch(variables.API_URL + 'Customer/GetCustomer')
            .then(response => response.json())
            .then(data => {
                this.setState({ Shops: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeProduct = (e) => {
        this.setState({ Product: e.target.value });
    }
    changeShop = (e) => {
        this.setState({ Shop: e.target.value });
    }
    changeDateOfJoining = (e) => {
        this.setState({ DateOfJoining: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Order",
            OrderId: 0,
            Customer: undefined,
            Product: undefined,
          
          
        });
    }
   

    createClick() {
        fetch(variables.API_URL + 'Product/addProduct', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustomerId: this.state.ProductName,
                ProductId: this.state.Shop,
               
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
                <Table columns={columns} dataSource={Products} onChange={onChange} />
               

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
                                            <Select style={{ width: '300px' ,marginLeft:'20px'}}
                                        placeholder="Chọn khách hàng"
                                      
                                        allowClear
                                        onChange={this.changeShop}
                                        value={Customer}

                                    >
                                        {Customers.map(value => (
                                            <Option key={value.CustomerID} value={value.CustomerID}
                                            >{value.CustomerName}</Option>
                                        ))}
                                    </Select>
                                          
                                        </div>
                                        <div className="input-group mb-5">
                                        <label>Product<span style={{ color: 'red' }}>*</span></label>
                                            <Select
                                            style={{ width: '300px' ,marginLeft:'20px'}}
                                            mode='multiple'
                                           
                                            
                                            onChange={this.changeProduct}
                                           
                                            placeholder='Chọn Sản phẩm'
                                            value={Product} 
                                            >

                                            {Products.map(company => (
                                                <Option key={company.ProductID} filter={company.ProductName} value={company.ProductName}>{company.ProductID} - {company.ProductName}</Option>
                                            ))}

                                        </Select>
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