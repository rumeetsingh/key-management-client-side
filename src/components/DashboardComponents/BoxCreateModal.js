import React from 'react';
import { reduxForm,Field } from 'redux-form';
import { fetchBoxes } from '../../actions';
import { connect } from 'react-redux';
import api from '../../apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'


class BoxCreateModal extends React.Component{

    renderInput = ({input}) => {
        return (
            <div className="form-group">
                <div className="input-group input-group-alternative mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faBoxOpen} /></span>
                </div>
                <input className="form-control" {...input} placeholder="Box Name" type="text" autoComplete="off" minLength="2" required />
                </div>
            </div>
        );
    };

    onSubmit = async ({name}) => {
        try{
            await api.post('/keys/boxes/',{ name },{ headers : { Authorization : `Bearer ${this.props.token}` } });
            await this.props.fetchBoxes(this.props.token);
            window.$('#boxCreateModal').modal('hide')
        }catch(errors){
            console.log(errors);
        };
    };

    render(){
        return (
            <div className="modal fade" id="boxCreateModal" tabIndex="-1" role="dialog" aria-labelledby="boxCreateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">Create a Box</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>You can store your keys inside a Box.</p>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="name" component={this.renderInput} />
                                <button type="submit" className="btn btn-warning mt-3">Create</button>
                                <button type="button" className="btn btn-link text-warning  ml-auto mt-3" data-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};


const BoxCreateModalWrapper = reduxForm({ form:'createBox' })(BoxCreateModal);

export default connect(null,{ fetchBoxes })(BoxCreateModalWrapper);
