import React from 'react';
import { connect } from 'react-redux';
import { selectBox } from '../../actions';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';


const cleanDate = date => {
    let d = new Date(date);
    return <Moment>{d}</Moment>
};

const onSelect = (props,boxId,boxName,boxCreatedOn) => {
    props.selectBox(boxId,boxName,boxCreatedOn);
};

const renderBoxRow = props => {
    return props.boxes.map(box => {
        return (
            <tr key={box.id}>
                <td><span onClick={() => onSelect(props,box.id,box.name,box.created_on)} className="link-like"><FontAwesomeIcon icon={faBoxOpen} /> {box.name}</span></td>
                <td>{cleanDate(box.created_on)}</td>
                <td>{box.id}</td>
            </tr>
        );
    });
};


const BoxesTable = props => {
    if(props.boxes.length===0){
        return null;
    };
    return (
        <table className="table table-hover table-borderless table-responsive-md table-sm">
            <thead>
                <tr>
                    <th scope="col">BOX NAME</th>
                    <th scope="col">CREATED ON</th>
                    <th scope="col">ID</th>
                </tr>
            </thead>
            <tbody>
                {renderBoxRow(props)}
            </tbody>
        </table>
    );
};


export default connect(null,{ selectBox })(BoxesTable);