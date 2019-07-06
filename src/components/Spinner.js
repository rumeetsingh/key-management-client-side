import React from 'react';


const SpinnerBorder = () => {
    return (
        <div className="container-fluid">
            <div style={{height:'85vh'}} className="row justify-content-center align-items-center">
                <div className="col text-center">
                    <div style={{marginTop:'50px',marginBottom:'50px'}} className="spinner-border text-warning" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SpinnerBorder;