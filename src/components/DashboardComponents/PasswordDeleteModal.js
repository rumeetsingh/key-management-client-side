import React from 'react';
import { reduxForm,Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import api from '../../apis';
import { connect } from 'react-redux';
import { fetchPasswords } from '../../actions';
import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';


class PasswordDeleteModal extends React.Component{

    state = { phase:0 }

    encryptString = (password) => {
        const encodeBase64 = utils.encodeBase64;
        const nonce = nacl.randomBytes(24);
        const secretKey = Buffer.from((process.env.REACT_APP_NOT_SECRET_CODE).toString(), 'utf8')
        const secretData = Buffer.from(password, 'utf8')
        const encrypted = nacl.secretbox(secretData, nonce, secretKey)
        const result = `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`
        return result;
    };

    renderWrongPasswordError = () => {
        if(this.state.phase===5){
            return <small className="text-danger">Sorry, Wrong Password!</small>
        };
        return null;
    };

    renderLoadingBotton = () => {
        if(this.state.phase===1){
            return (
                <button className="btn btn-danger mt-3" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                </button>
            );
        };
        return <button type="submit" className="btn btn-danger mt-3">Delete</button>;
    };

    renderInput = ({input}) => {
        return (
            <div className="form-group">
                <div className="input-group input-group-alternative mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                    </div>
                    <input className="form-control" {...input} placeholder="Password" type="password" autoComplete="off" required />
                </div>
                {this.renderWrongPasswordError()}
            </div>
        );
    };

    onSubmit = async ({password}) => {
        await this.setState({phase:1});
        let id = this.encryptString(this.props.data.id);
        let encPAssword = this.encryptString(password);
        try{
            await api.post('/keys/passcodedelete/',{ id:id,password:encPAssword },{ headers : { Authorization : `Bearer ${this.props.token}` } });
            await window.$(`#passwordDeleteModal${this.props.data.id}`).modal('hide');
            await this.props.fetchPasswords(this.props.token);
        }catch(errors){
            this.setState({phase:5});
        };
    };

    render() {
        return (
            <div className="modal fade" id={`passwordDeleteModal${this.props.data.id}`} tabIndex="-1" role="dialog" aria-labelledby="passwordDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">Delete {this.props.data.name}</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this Password?</p>
                            <br />
                            <p>Please Enter your password.</p>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="password" component={this.renderInput} />
                                {this.renderLoadingBotton()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


const PasswordDeleteModalWrapper = reduxForm({ form:'deletePassword' })(PasswordDeleteModal);

export default connect(null,{ fetchPasswords })(PasswordDeleteModalWrapper);