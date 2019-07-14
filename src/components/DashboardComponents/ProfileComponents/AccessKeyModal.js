import React from 'react';
import { reduxForm,Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import api from '../../../apis';
import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';
import _ from 'lodash';


class AccessKeyModal extends React.Component{

    state = { phase:0,code:null }

    componentDidMount() {
        window.$('#accessKeyModal').on('hide.bs.modal',(e) => {
            clearTimeout(window.accessKeyModalTimer);
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
                        Access Key: <span className="text-warning">{this.decryptString(this.state.code)}</span>
                        <br />
                        Access Key will hide in 10 seconds.
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
        let encPAssword = this.encryptString(password);
        try{
            const response = await api.post('/users/KLGGzGVx8yBUT7tmDZ3unqsYagYWJa/',{ password:encPAssword },{ headers : { Authorization : `Bearer ${this.props.token}` } });
            await this.setState({ code:response.data });
            await this.setState({phase:2});
            window.accessKeyModalTimer = setTimeout(() => { this.setState({code:null}); this.props.reset(); },10000)
        }catch(errors){
            this.setState({phase:5});
        };
    };

    render() {
        return (
            <div className="modal fade" id="accessKeyModal" tabIndex="-1" role="dialog" aria-labelledby="accessKeyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">View Your Acces Key</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
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


export default reduxForm({ form:'viewAccessKey' })(AccessKeyModal);