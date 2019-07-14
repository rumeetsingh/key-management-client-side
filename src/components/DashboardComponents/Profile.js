import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey,faCog } from '@fortawesome/free-solid-svg-icons'
import ChangePasswordModal from './ProfileComponents/ChangePasswordModal';
import AccessKeyModal from './ProfileComponents/AccessKeyModal';


const Profile = props => {
    return (
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <div className="heading-title text-warning">{props.auth.details.name}</div>
                <div className="badge badge-warning">{props.auth.details.email}</div>
                <div className="card mt-4">
                    <div className="card-header text-warning"><span style={{marginRight:'0.5rem'}}><FontAwesomeIcon icon={faCog} /></span>Account Settings</div>
                    <div className="card-body">
                        <button type="button" className="btn btn-danger btn-sm" data-toggle="modal" data-target="#changePasswordModal">Change Password</button>
                        <ChangePasswordModal token={props.auth.token} />
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="card-header text-warning"><span style={{marginRight:'0.5rem'}}><FontAwesomeIcon icon={faKey} /></span>Access Keys</div>
                    <div className="card-body">
                        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#accessKeyModal">View Your Access Key</button>
                        <AccessKeyModal token={props.auth.token} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;