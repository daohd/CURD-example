import React, { Component } from 'react';
import { variables } from './Variables.js';
import { Table } from 'antd';
const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'CustomerId',
      sorter: (a, b) => a.CustomerId - b.CustomerId,
    },
    {
      title: 'CustomerName',
      dataIndex: 'FullName',
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
      width: '60%',
    },
   
  ];
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
export class Customer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Customers: [],
            modalTitle: "",
            CustomerName: "",
            CustomerId: 0,
            Email: "",
            DOB:"",
            CustomerIdFilter: "",
            CustomerNameFilter: "",
            CustomersWithoutFilter: []
        }
    }

    FilterFn() {
        var CustomerIdFilter = this.state.CustomerIdFilter;
        var CustomerNameFilter = this.state.CustomerNameFilter;

        var filteredData = this.state.CustomersWithoutFilter.filter(
            function (el) {
                return el.CustomerId.toString().toLowerCase().includes(
                    CustomerIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.CustomerName.toString().toLowerCase().includes(
                        CustomerNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ Customers: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.CustomersWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ Customers: sortedData });
    }

    changeCustomerIdFilter = (e) => {
        this.state.CustomerIdFilter = e.target.value;
        this.FilterFn();
    }
    changeCustomerNameFilter = (e) => {
        this.state.CustomerNameFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'Customer/getCustomer')
            .then(response => response.json())
            .then(data => {
                this.setState({ Customers: data, CustomersWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeCustomerName = (e) => {
        this.setState({ FullName: e.target.value });
    }
    changeEmail = (e) => {
        this.setState({ Email: e.target.value });
    }
    changeDOB = (e) => {
        this.setState({ DOB: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Customer",
            CustomerId: 0,
            CustomerName: ""
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit Customer",
            CustomerId: dep.CustomerId,
            CustomerName: dep.CustomerName
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Customer/addCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FullName: this.state.CustomerName
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
        fetch(variables.API_URL + 'Customer/updateCustomer', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustomerId: this.state.CustomerId,
                FullName: this.state.CustomerName
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
            fetch(variables.API_URL + 'Customer/deleteCustomer/' + id, {
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

    render() {
        const {
            Customers,
            modalTitle,
            CustomerId,
            CustomerName,
            Email,
            DOB,
        } = this.state;

        return (
         
            <div>
  
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Customer
                </button>
                <Table columns={columns} dataSource={Customers} onChange={onChange} />
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group col-3" style={{ marginLeft: '50px' }}>
                                <label>Customer Name<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="txtCustomerName" style={{width:'400px', marginLeft:'10px', border: '1px solid gray',borderRadius:'10px',height:'30px'}}
                                        value={CustomerName} required
                                        onChange={this.changeCustomerName} />
                                </div>
                                <div className="input-group col-3" style={{ marginLeft: '50px' }}>
                                <label>Email<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="txtEmail" style={{width:'400px', marginLeft:'10px', border: '1px solid gray',borderRadius:'10px',height:'30px'}}
                                        value={Email} required
                                        onChange={this.changeEmail} />
                                </div>
                                <div className="input-group col-3" style={{ marginLeft: '50px' }}>
                                <label>Date of Birth<span style={{ color: 'red' }}>*</span></label>
                                            <input type="date" className="form-control"
                                                value={DOB}
                                                onChange={this.changeDOB} />
                                        </div>
                                {CustomerId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.createClick()}
                                        style={{float:'right', marginTop:'10px',borderRadius:'10px'}}
                                    >Create</button> 
                                    : null}

                                {CustomerId !== 0 ?
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