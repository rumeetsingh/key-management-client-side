import React from 'react';
import { connect } from 'react-redux';
import { deselectBox } from '../../actions';
import _ from 'lodash';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import BoxDeleteModal from './KeyBoxDetailComponents/BoxDeleteModal';
import KeyCreateModal from './KeyBoxDetailComponents/KeyCreateModal';
import KeysTable from './KeyBoxDetailComponents/KeysTable';


class KeyBoxDetail extends React.Component{

    cleanDate = date => {
        let d = new Date(date);
        return <Moment>{d}</Moment>
    };

    componentWillUnmount = () => {
        this.props.deselectBox();
    };

    render() {
        return (
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><span onClick={() => this.props.deselectBox()} className="link-like">Key Boxes</span></li>
                            <li className="breadcrumb-item active" aria-current="page">{this.props.data.name}</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col">
                            <span className="text-warning">Box Name: </span>{this.props.data.name}
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-danger btn-sm" data-toggle="modal" data-target="#boxDeleteModal">Delete Box</button>
                            <BoxDeleteModal token={this.props.token} data={this.props.data} />
                        </div>
                    </div>
                    <span className="text-warning">Created On: </span>{this.cleanDate(this.props.data.created_on)}
                    <br />
                    <span className="text-warning">Box ID: </span>{_.truncate(this.props.data.id,{ length:20,separator: '-',omission: '**********' })}
                    <div className="heading-title text-warning mt-4 mb-3">KEYS</div>
                    <KeysTable boxId={this.props.data.id} token={this.props.token} />
                    <button type="button" className="btn btn-warning btn-block" data-toggle="modal" data-target="#keyCreateModal">
                        <span className="btn-inner--icon"><FontAwesomeIcon icon={faKey} /></span> 
                        <span className="btn-inner--text">{" "}Create a Key</span>
                    </button>
                    <KeyCreateModal boxId={this.props.data.id} token={this.props.token} />
                </div>
            </div>
        );
    };
}


export default connect(null,{ deselectBox })(KeyBoxDetail);