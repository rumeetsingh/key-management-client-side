import React from 'react';
import { connect } from 'react-redux';
import { reduxForm,Field } from 'redux-form';
import { deselectBox,fetchBoxes } from '../../../actions';
import api from '../../../apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'


class BoxDeleteModal extends React.Component{

    state = { phase:0 }

    renderWrongPasswordError = () => {
        if(this.state.phase===5){
            return <small className="text-danger">Sorry, Wrong Password!</small>
        };
        return null;
    };

    renderLoadingBotton = () => {
        if(this.state.phase===1){
            return (
                <button class="btn btn-danger mt-3" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
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
                        <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
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
        try{
            await api.post('/keys/boxdelete/',{ id,password },{ headers : { Authorization : `Bearer ${this.props.token}` } });
            await this.props.fetchBoxes(this.props.token);
            await window.$('#boxDeleteModal').modal('hide');
            await this.props.deselectBox();
        }catch(errors){
            this.setState({phase:5});
        };
    };

    render() {
        return (
            <div className="modal fade" id="boxDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="boxDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">Delete {this.props.data.name}</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this Box?</p>
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


const BoxDeleteModalWrapper = reduxForm({ form:"deleteBox" })(BoxDeleteModal);

export default connect(null,{ deselectBox,fetchBoxes })(BoxDeleteModalWrapper);