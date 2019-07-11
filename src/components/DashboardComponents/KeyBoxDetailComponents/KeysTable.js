import React from 'react';
import { connect } from 'react-redux';
import { fetchKeys,setKeysToNull } from '../../../actions';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey,faEye,faEyeSlash,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';
import KeyDeleteModal from './KeyDeleteModal';


class KeyRow extends React.Component{

    state = { visible:false }

    cleanDate = date => {
        let d = new Date(date);
        return <Moment>{d}</Moment>
    };

    renderId = () => {
        if(this.state.visible){
            return <td>{this.props.data.id}</td>
        }else{
            return <td>{_.truncate(this.props.data.id,{ length:20,separator: '-',omission: '**********' })}</td>
        };
    };

    renderEyeIcon = () => {
        if(this.state.visible){
            return <td><span onClick={() => this.setState({visible:false})} className="link-like"><FontAwesomeIcon icon={faEyeSlash} /></span></td>
        }else{
            return <td><span onClick={() => this.setState({visible:true})} className="link-like"><FontAwesomeIcon icon={faEye} /></span></td>
        };
    };

    render() {
        return (
            <tr>
                <td><span className="no-select"><FontAwesomeIcon icon={faKey} /> {this.props.data.name}</span></td>
                <td>{this.cleanDate(this.props.data.created_on)}</td>
                {this.renderId()}
                {this.renderEyeIcon()}
                <td>
                    <span className="link-like no-select text-danger" data-toggle="modal" data-target={`#keyDeleteModal${this.props.data.id}`}><FontAwesomeIcon icon={faTrashAlt} /></span>
                    <KeyDeleteModal data={this.props.data} token={this.props.token} />
                </td>
            </tr>
        );
    };
}


class KeysTable extends React.Component{

    componentDidMount = async () => {
        await this.props.fetchKeys(this.props.token,this.props.boxId)
    };

    componentWillUnmount = () => {
        this.props.setKeysToNull();
    };

    renderKeyRow = () => {
        return this.props.keys.map(key => {
            return  <KeyRow key={key.id} token={this.props.token} data={key} /> ;
        });
    }

    render() {
        if(this.props.keys===null){
            return <div className="d-flex justify-content-center"><div className="spinner-border mt-2 mb-5" role="status"><span className="sr-only"></span></div></div>
        }else if(this.props.keys.length===0){
            return null;
        };
        return (
            <table className="table table-hover table-borderless table-responsive-md table-sm">
                <thead>
                    <tr>
                        <th scope="col">KEY NAME</th>
                        <th scope="col">CREATED ON</th>
                        <th scope="col">ID</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderKeyRow()}
                </tbody>
            </table>
        );
    };
}


const mapStateToProps = state => {
    return {
        keys : state.keys.keys
    }
}

export default connect(mapStateToProps,{ fetchKeys,setKeysToNull })(KeysTable);