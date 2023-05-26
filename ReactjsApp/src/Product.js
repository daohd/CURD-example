import React, { Component } from 'react';
import { variables } from './Variables.js';
import { Table } from 'antd';
const columns = [
    {
      title: 'Product ID',
      dataIndex: 'ProductId',
      sorter: (a, b) => a.ProductId - b.ProductId,
    },
    {
      title: 'ProductName',
      dataIndex: 'ProductName',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: '30%',
    },
    {
      title: 'Shop',
      dataIndex: 'shopid',
      sorter: (a, b) => a.shopid - b.shopid,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
      },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
export class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Shops: [],
            Products: [],
            modalTitle: "",
            ProductId: 0,
            ProductName: "",
            Shop: 0,
            DateOfJoining: "",
            PhotoFileName: "anonymous.png",
            PhotoPath: variables.PHOTO_URL
        }
    }

    refreshList() {

        fetch(variables.API_URL + 'Product/GetProduct')
            .then(response => response.json())
            .then(data => {
                this.setState({ Products: data });
            });

            fetch(variables.API_URL + 'Shop/getShop')
            .then(response => response.json())
            .then(data => {
                this.setState({ Shops: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeProductName = (e) => {
        this.setState({ ProductName: e.target.value });
    }
    changeShop = (e) => {
        this.setState({ Shop: e.target.value });
    }
    changeDateOfJoining = (e) => {
        this.setState({ DateOfJoining: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Product",
            ProductId: 0,
            ProductName: "",
            Customer: "",
            DateOfJoining: "",
            PhotoFileName: "anonymous.png"
        });
    }
    editClick(emp) {
        debugger;
        this.setState({
            modalTitle: "Edit Product",
            ProductId: emp.ProductId,
            ProductName: emp.ProductName,
            Shop: emp.Shop,
            DateOfJoining: emp.DateOfJoining,
            PhotoFileName: emp.PhotoFileName
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
                ProductName: this.state.ProductName,
                ShopID: this.state.Shop,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName: this.state.PhotoFileName
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


    updateClick() {
        fetch(variables.API_URL + 'Product/updateProduct', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductId: this.state.ProductId,
                ProductName: this.state.ProductName,
                ShopID: this.state.Shop,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName: this.state.PhotoFileName
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

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'Product/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'Product/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoFileName: data });
            })
    }

    render() {
        const {
            Shops,
            Products,
            modalTitle,
            ProductId,
            ProductName,
            Shop,
            DateOfJoining,
            PhotoPath,
            PhotoFileName
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Product
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
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                        <label>Product Name<span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" className="form-control"
                                                value={ProductName}
                                                onChange={this.changeProductName} />
                                        </div>

                                        <div className="input-group mb-3">
                                        <label>Shop<span style={{ color: 'red' }}>*</span></label>
                                            <select className="form-select"
                                                onChange={this.changeShop}
                                                value={Shop}>
                                                {Shops.map(dep =>
                                                    <option key={dep.ShopId} value={dep.ShopId}>
                                                        {dep.ShopName}
                                                    </option>)}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                        <label>Date of Joining<span style={{ color: 'red' }}>*</span></label>
                                            <input type="date" className="form-control"
                                                value={DateOfJoining}
                                                onChange={this.changeDateOfJoining} />
                                        </div>


                                    </div>
                                    {/* <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                            src={PhotoPath + PhotoFileName} />
                                        <input className="m-2" type="file" 
                                        onChange={this.imageUpload} />
                                    </div> */}
                                </div>

                                {ProductId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary "
                                        onClick={() => this.createClick()}
                                        style={{float:'right', marginTop:'10px',borderRadius:'10px'}}
                                    >Create</button>
                                    : null}

                                {ProductId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.updateClick()}
                                        style={{float:'right', marginTop:'10px',borderRadius:'10px'}}
                                    >Update</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}