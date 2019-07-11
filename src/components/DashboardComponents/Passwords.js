import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import PasswordCreateModal from './PasswordCreateModal';
import PasswordsTable from './PasswordsTable';


const Passwords = props => {
    return (
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Passwords</li>
                    </ol>
                </nav>
                <PasswordsTable />
                <button type="button" className="btn btn-warning btn-block" data-toggle="modal" data-target="#passwordCreateModal">
                    <span className="btn-inner--icon"><FontAwesomeIcon icon={faLock} /></span> 
                    <span className="btn-inner--text">{" "}Create a Password</span>
                </button>
                <PasswordCreateModal token={props.token} />
            </div>
        </div>
    );
}


export default Passwords;