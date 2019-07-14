import React from 'react';
import api from '../../../apis';
import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { reduxForm,Field } from 'redux-form';


class ChangePasswordModal extends React.Component{

    state = { phase:0 }

    componentDidMount() {
        window.$('#changePasswordModal').on('hide.bs.modal',(e) => {
            this.props.reset();
            this.setState({ phase:0 });
        });
    };

    encryptString = (password) => {
        const encodeBase64 = utils.encodeBase64;
        const nonce = nacl.randomBytes(24);
        const secretKey = Buffer.from((process.env.REACT_APP_NOT_SECRET_CODE).toString(), 'utf8')
        const secretData = Buffer.from(password, 'utf8')
        const encrypted = nacl.secretbox(secretData, nonce, secretKey)
        const result = `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`
        return result;
    };

    renderWrongOldPasswordError = () => {
        if(this.state.phase===5){
            return <div class="alert alert-danger" role="alert">Old Password is Wrong!</div>;
        };
        return null;
    };

    renderInputError = (meta) => {
        if(meta.touched&&meta.error){
            return <small>{meta.error}</small>;
        };
    };

    renderInput = ({input,placeholder,meta}) => {
        return (
            <div className="form-group">
                {this.renderInputError(meta)}
                <div className="input-group input-group-alternative mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                </div>
                <input className="form-control" {...input} placeholder={placeholder} type="password" autoComplete="off" minLength="10" required />
                </div>
            </div>
        );
    };

    onSubmit = async ({old_password,new_password}) => {
        await this.setState({ phase:1 })
        try{
            old_password = this.encryptString(old_password);
            new_password = this.encryptString(new_password);
            await api.put('/users/changepassword/',{ old_password,new_password },{ headers : { Authorization : `Bearer ${this.props.token}` } });
            window.$('#changePasswordModal').modal('hide');
            this.setState({ phase:0 });
            this.props.reset();
        }catch(errors){
            this.setState({ phase:5 });
        };
    };

    renderLoadingButton = () => {
        if(this.state.phase===1){
            return (
                <button className="btn btn-danger mt-3" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                </button>
            );
        };
        return <button type="submit" className="btn btn-warning mt-3">Change</button>;
    };

    render() {
        return (
            <div className="modal fade" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">Change Password</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        {this.renderWrongOldPasswordError()}
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="old_password" component={this.renderInput} placeholder="Old Password" />
                                <Field name="new_password" component={this.renderInput} placeholder="New Password" />
                                <Field name="cnew_password" component={this.renderInput} placeholder="Confirm New Password" />
                                {this.renderLoadingButton()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


const validate = (formValues) => {

    const errors = {}

    if(!formValues.old_password){
        errors.old_password = "You must enter your old password.";
    };

    if(!formValues.new_password){
        errors.new_password = "You must enter your new password.";
    }else if(formValues.new_password.length<=9){
        errors.new_password = "Password must be at least 10 characters.";
    };

    if(!formValues.cnew_password){
        errors.cnew_password = "You must enter a password.";
    }else if(formValues.cnew_password!==formValues.new_password){
        errors.cnew_password = "Passwords must match."
    };

    return errors;

};

export default reduxForm({ form:'changePassword',validate })(ChangePasswordModal);