import React, { Component } from 'react';
import { variables } from './Variables.js';
import { Table } from 'antd';
const columns = [
    {
      title: 'Shop ID',
      dataIndex: 'shopid',
      sorter: (a, b) => a.shopid - b.shopid,
    },
    {
      title: 'Shop Name',
      dataIndex: 'shopname',
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
      onFilter: (value, record) => record.shopname.includes(value),
      width: '30%',
    },
    {
      title: 'Location',
      dataIndex: 'location',
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
      onFilter: (value, record) => record.location.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
  ];
 
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
export class Shop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Shops: [],
            modalTitle: "",
            ShopName: "",
            ShopId: 0,

            ShopIdFilter: "",
            ShopNameFilter: "",
            ShopsWithoutFilter: []
        }
    }

    FilterFn() {
        var ShopIdFilter = this.state.ShopIdFilter;
        var ShopNameFilter = this.state.ShopNameFilter;

        var filteredData = this.state.ShopsWithoutFilter.filter(
            function (el) {
                return el.ShopId.toString().toLowerCase().includes(
                    ShopIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.ShopName.toString().toLowerCase().includes(
                        ShopNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ Shops: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.ShopsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ Shops: sortedData });
    }

    changeShopIdFilter = (e) => {
        this.state.ShopIdFilter = e.target.value;
        this.FilterFn();
    }
    changeShopNameFilter = (e) => {
        this.state.ShopNameFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'Shop/getShop')
            .then(response => response.json())
            .then(data => {
                this.setState({ Shops: data, ShopsWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeShopName = (e) => {
        this.setState({ ShopName: e.target.value });
    }
    changeLocation = (e) => {
        this.setState({ Location: e.target.value });
    }
    addClick() {
        this.setState({
            modalTitle: "Add Shop",
            ShopId: 0,
            ShopName: ""
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit Shop",
            ShopId: dep.ShopId,
            ShopName: dep.ShopName
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Shop/addShop', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ShopName: this.state.ShopName,
                Location:this.state.Location
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
        fetch(variables.API_URL + 'Shop/updateShop', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ShopId: this.state.ShopId,
                ShopName: this.state.ShopName,
                Location:this.state.Location
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
            fetch(variables.API_URL + 'Shop/deleteShop/' + id, {
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
            Shops,
            modalTitle,
            ShopId,
            ShopName,
            Location
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Shop
                </button>
                <Table columns={columns} dataSource={Shops} onChange={onChange} />
                

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3" style={{ marginLeft: '50px' }}>
                                <label>Shop Name<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="txtShopName" style={{width:'400px', marginLeft:'10px', border: '1px solid gray',borderRadius:'10px',height:'30px'}}
                                        value={ShopName}
                                        onChange={this.changeShopName} />
                                </div>
                                <div className="input-group mb-3" style={{ marginLeft: '50px' }}>
                                <label>Location<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="txtLocation" style={{width:'400px', marginLeft:'10px', border: '1px solid gray',borderRadius:'10px',height:'30px'}}
                                        value={Location}
                                        onChange={this.changeLocation} />
                                </div>
                                {ShopId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary "
                                        onClick={() => this.createClick()}
                                        style={{float:'right', marginTop:'10px',borderRadius:'10px'}}
                                    >Create</button>
                                    : null}

                                {ShopId !== 0 ?
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