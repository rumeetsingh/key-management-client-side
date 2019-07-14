import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt,faKey,faLock } from '@fortawesome/free-solid-svg-icons'


class HomePublic extends React.Component{

    componentDidMount = () => {
        document.title = "Foxedo KMS";
    };

    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row mt-5 mb-5">
                    <div className="col">
                        <span className="heading-title text-warning" style={{fontSize:'2rem'}}>Welcome to Foxedo Key Management Service</span>
                    </div>
                </div>
                <div style={{marginTop:'4rem',marginBottom:'4rem'}} className="row justify-content-center">
                    <div className="col-md-3 text-success">
                        <div style={{fontSize:'6rem'}}>
                            <FontAwesomeIcon icon={faShieldAlt} />
                        </div>
                        <div className="heading-title">
                            High Level Security
                        </div>
                    </div>
                    <div className="col-md-3 text-primary">
                        <div style={{fontSize:'6rem'}}>
                            <FontAwesomeIcon icon={faKey} />
                        </div>
                        <div className="heading-title ">
                            Store your Keys
                        </div>
                    </div>
                    <div className="col-md-3 text-danger">
                        <div style={{fontSize:'6rem'}}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <div className="heading-title">
                            Store your Passwords
                        </div>
                    </div>
                </div>
                <div>
                    <Link to='signup/'><button type="button" className="btn btn-warning btn-lg mt-4 mb-5">Get Started</button></Link>
                </div>
            </div>
        );
    };
}


export default HomePublic;