import React from 'react';
import { reduxForm,Field } from 'redux-form';
import api from '../../../apis';
import { connect } from 'react-redux';
import { fetchKeys } from '../../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';


class KeyCreateModal extends React.Component{

    encryptString = (password) => {
        const encodeBase64 = utils.encodeBase64;
        const nonce = nacl.randomBytes(24);
        const secretKey = Buffer.from((process.env.REACT_APP_NOT_SECRET_CODE).toString(), 'utf8')
        const secretData = Buffer.from(password, 'utf8')
        const encrypted = nacl.secretbox(secretData, nonce, secretKey)
        const result = `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`
        return result;
    };

    renderInput = ({input,placeholder}) => {
        return (
            <div className="form-group">
                <div className="input-group input-group-alternative mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                </div>
                <input className="form-control" {...input} placeholder={placeholder} type="text" autoComplete="off" minLength="2" required />
                </div>
            </div>
        );
    };

    onSubmit = async ({name,value}) => {
        try{
            value = this.encryptString(value);
            let box_id = this.props.boxId;
            await api.post('/keys/keys/',{ name,value,box_id },{ headers : { Authorization : `Bearer ${this.props.token}` } });
            await this.props.fetchKeys(this.props.token,this.props.boxId);
            window.$('#keyCreateModal').modal('hide');
        }catch(errors){
            console.log(errors);
        };
    };

    render() {
        return (
            <div className="modal fade" id="keyCreateModal" tabIndex="-1" role="dialog" aria-labelledby="keyCreateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">Create a Key</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Read <a target="_blank" rel="noopener noreferrer" href="https://github.com/rumeetsingh/foxedo-kms-python">docs</a> for how to access your keys.</p>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="name" component={this.renderInput} placeholder="Key Name" />
                                <Field name="value" component={this.renderInput} placeholder="Value" />
                                <button type="submit" className="btn btn-warning mt-3">Create</button>
                                <button type="button" className="btn btn-link text-warning  ml-auto mt-3" data-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


const KeyCreateModalWrapper = reduxForm({ form : 'createKey' })(KeyCreateModal)

export default connect(null,{ fetchKeys })(KeyCreateModalWrapper);