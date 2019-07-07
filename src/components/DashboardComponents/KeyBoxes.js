import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import BoxCreateModal from './BoxCreateModal';
import BoxesTable from './BoxesTable';


const KeyBoxes = props => {
    return (
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Key Boxes</li>
                    </ol>
                </nav>
                <BoxesTable boxes={props.keys.boxes} />
                <button type="button" className="btn btn-warning btn-block" data-toggle="modal" data-target="#boxCreateModal">
                    <span className="btn-inner--icon"><FontAwesomeIcon icon={faBoxOpen} /></span> 
                    <span className="btn-inner--text">{" "}Create a Box</span>
                </button>
                <BoxCreateModal token={props.auth.token} />
            </div>
        </div>
    );
};


export default KeyBoxes;