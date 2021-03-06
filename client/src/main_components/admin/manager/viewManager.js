// index.component.js

import React, { Component } from 'react';
import TableRow from './TableRowManager';
import PureProgressSpinner from "../../../components/PureProgressSpinner";
import baseAxios from '../../../config/axios';

export default class ManagersIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_managers: []
        };
    }


    componentDidMount() {
        baseAxios.get('store_managers/')
            .then(response => {
                this.setState({ store_managers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }




    tabRow() {
        return this.state.store_managers.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    onResetArray = () => {
        baseAxios.get('store_managers/')
            .then(response => {
                this.setState({ store_managers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    };


    render() {
        if (this.state.store_managers.length === 0) {
            return <PureProgressSpinner message="Loading Manager Details..." />
        }

        return (
            <div>
                <h3 align="center">All Store Managers</h3>
                <button type="button" className="btn btn-warning mt-3" onClick={this.onResetArray}>
                    Refresh
                </button>
                <div class="table-responsive">
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead >
                        <tbody>
                            {this.tabRow()}
                        </tbody>
                    </table >

                </div>
            </div >
        );
    }
}