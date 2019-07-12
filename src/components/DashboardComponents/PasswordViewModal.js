import React from 'react';
import { reduxForm,Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import api from '../../apis';
import { connect } from 'react-redux';
import { fetchPasswords } from '../../actions';
import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';
import _ from 'lodash';


class PasswordViewModal extends React.Component{

    state = { phase:0,code:null }

    componentDidMount() {
        window.$(`#passwordViewModal${this.props.data.id}`).on('hide.bs.modal',(e) => {
            clearTimeout(window.passwordViewModalTimer);
            this.setState({ code:null });
            this.props.reset();
        });
    };

    encryptString = (password) => {
        const encodeBase64 = utils.encodeBase64;
        const nonce = nacl.randomBytes(24);
        const secretKey = Buffer.from((process.env.REACT_APP_NOT_SECRET_CODE).toString(), 'utf8');
        const secretData = Buffer.from(password, 'utf8');
        const encrypted = nacl.secretbox(secretData, nonce, secretKey);
        const result = `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`;
        return result;
    };

    decryptString = (code) => {
        const decodeBase64 = utils.decodeBase64;
        const secretKey = Buffer.from((process.env.REACT_APP_NOT_SECRET_CODE).toString(), 'utf8');
        code = _.split(code,':',2);
        const nonce = decodeBase64(code[0]);
        const encrypted = decodeBase64(code[1]);
        const result = nacl.secretbox.open(encrypted,nonce,secretKey);
        if(result!==null){
            return utils.encodeUTF8(result);
        }
        return null;
    };

    renderRawPassword = () => {
        if(this.state.code!==null&&this.state.phase===2){
            return (
                <p>
                    <small>
                        Password Value: <span className="text-warning">{this.decryptString(this.state.code)}</span>
                        <br />
                        Password Value will hide after 10 seconds.
                    </small>
                </p>
            );
        };
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
        return <button type="submit" className="btn btn-danger mt-3">View</button>;
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
        let id = this.props.data.id;
        let encPAssword = this.encryptString(password);
        try{
            const response = await api.post('/keys/passcodedetail/',{ id:id,password:encPAssword },{ headers : { Authorization : `Bearer ${this.props.token}` } });
            await this.setState({ code:response.data });
            await this.setState({phase:2});
            window.passwordViewModalTimer = setTimeout(() => { this.setState({code:null}); this.props.reset(); },10000)
        }catch(errors){
            this.setState({phase:5});
        };
    };

    render() {
        return (
            <div className="modal fade" id={`passwordViewModal${this.props.data.id}`} tabIndex="-1" role="dialog" aria-labelledby="passwordViewModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">View {this.props.data.name}</h6>
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
                                {this.renderRawPassword()}
                                {this.renderLoadingBotton()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


const PasswordViewModalWrapper = reduxForm({ form:'viewPassword' })(PasswordViewModal);

export default connect(null,{ fetchPasswords })(PasswordViewModalWrapper);