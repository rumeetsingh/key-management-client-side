import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock,faTrashAlt,faEye } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import PasswordDeleteModal from './PasswordDeleteModal';
import PasswordViewModal from './PasswordViewModal';


class PasswordRow extends React.Component{

    cleanDate = date => {
        let d = new Date(date);
        return <Moment>{d}</Moment>
    };

    render() {
        return (
            <tr>
                <td><span className="no-select"><FontAwesomeIcon icon={faLock} /> {this.props.data.name}</span></td>
                <td>{this.cleanDate(this.props.data.created_on)}</td>
                <td>
                    <span className="link-like no-select" data-toggle="modal" data-target={`#passwordViewModal${this.props.data.id}`}><FontAwesomeIcon icon={faEye} /></span>
                    <PasswordViewModal data={this.props.data} token={this.props.token} />
                </td>
                <td>
                    <span className="link-like no-select text-danger" data-toggle="modal" data-target={`#passwordDeleteModal${this.props.data.id}`}><FontAwesomeIcon icon={faTrashAlt} /></span>
                    <PasswordDeleteModal data={this.props.data} token={this.props.token} />
                </td>
            </tr>
        );
    };
}


class PasswordsTable extends React.Component{

    renderPasswordRow = () => {
        return this.props.passwords.map(pass => {
            return <PasswordRow key={pass.id} data={pass} token={this.props.token} />
        });
    };

    render() {
        if(this.props.passwords.length===0){
            return null;
        };
        return (
            <table className="table table-hover table-borderless table-responsive-md table-sm">
            <thead>
                <tr>
                    <th scope="col">PASSWORD NAME</th>
                    <th scope="col">CREATED ON</th>
                </tr>
            </thead>
            <tbody>
                {this.renderPasswordRow()}
            </tbody>
        </table>
        );
    };
}


const mapStateToProps = state => {
    return {
        passwords : state.keys.passwords,
        token : state.auth.token,
    };
};

export default connect(mapStateToProps,)(PasswordsTable);