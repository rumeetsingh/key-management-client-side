import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import BoxCreateModal from './BoxCreateModal';


class KeyBoxes extends React.Component{
    render() {
        return (
            <div className="card">
                <div className="card-header heading-title text-warning">
                    Key Boxes
                </div>
                <div className="card-body">
                    <button type="button" className="btn btn-warning btn-block" data-toggle="modal" data-target="#boxCreateModal">
                        <span className="btn-inner--icon"><FontAwesomeIcon icon={faBoxOpen} /></span> 
                        <span className="btn-inner--text">{" "}Create a Box</span>
                    </button>
                    <BoxCreateModal />
                </div>
            </div>
        );
    };
}


export default KeyBoxes;