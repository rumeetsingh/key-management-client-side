import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import { Link } from 'react-router-dom';


class Navbar extends React.Component{

    renderNavItems = () => {
        if(this.props.auth.isSignedIn){
            return (
                <ul className="navbar-nav ml-lg-auto">
                    <li className="nav-item">
                        <span className="nav-link nav-link-icon">
                            {this.props.auth.details.email}
                        </span>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link nav-link-icon cursor-pointer" id="navbar-default_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="ni ni-settings-gear-65"></i>
                            <span className="nav-link-inner--text d-lg-none">Settings</span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-default_dropdown_1">
                            <span className="dropdown-item cursor-pointer" onClick={() => this.props.signOut()}>Sign Out</span>
                        </div>
                    </li>
                </ul>
            );
        }else{
            return (
                <ul className="navbar-nav ml-lg-auto">
                    <li className="nav-item">
                        <Link className="nav-link nav-link-icon" to="/signup">
                            Create Account
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link nav-link-icon" to="/signin">
                            Sign In
                        </Link>
                    </li>
                </ul>
            );
        };
    };

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning no-select">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img style={{height:'50px'}} src="https://res.cloudinary.com/dgf6joms9/image/upload/v1562309829/foxedo-kms-logo_kjo5l2.png" alt="Foxedo KMS" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-default">
                        <div className="navbar-collapse-header">
                            <div className="row">
                                <div className="col-6 collapse-brand">
                                    <a href="index.html">
                                        <img src="https://res.cloudinary.com/dgf6joms9/image/upload/v1562309941/foxedo-kms-logo-2_etcuit.png" alt="Foxedo KMS" />
                                    </a>
                                </div>
                                <div className="col-6 collapse-close">
                                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {this.renderNavItems()}
                    </div>
                </div>
            </nav>
        );
    };
}


const mapStateToProps = state => {
    return {
        auth : state.auth
    };
};

export default connect(mapStateToProps,{ signOut, })(Navbar);