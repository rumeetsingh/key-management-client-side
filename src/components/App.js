import React from 'react';
import { Router,Route,Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInWithToken } from '../actions';
import history from '../history';
import Spinner from './Spinner';
import Navbar from './Navbar';
import HomePublic from './HomePublic';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import SignIn from './SignIn';
import _ from 'lodash';

import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';


class App extends React.Component{

    state = { phase:1 }

    decryptToken = (code) => {
        const decodeBase64 = utils.decodeBase64;
        const secretKey = Buffer.from((process.env.REACT_APP_YNXEWLLNTRNXZHG).toString(), 'utf8');
        code = _.split(code,':',2);
        const nonce = decodeBase64(code[0]);
        const encrypted = decodeBase64(code[1]);
        const result = nacl.secretbox.open(encrypted,nonce,secretKey);
        return utils.encodeUTF8(result);
    };

    componentDidMount = async () => {
        if(localStorage.getItem('FoxedoKMSAccess')){
            await this.props.signInWithToken(this.decryptToken(localStorage.getItem('FoxedoKMSAccess')));
        };
        this.setState({phase:0});
    };

    renderHomeComponent = () => {
        if(this.props.auth.isSignedIn){
            return <Route path="/" exact component={Dashboard} />
        };
        return <Route path="/" exact component={HomePublic} />
    };

    render(){
        if(this.state.phase===1){
            return <Spinner heigth="100" />
        };
        return(
            <Router history={history}>
                <Navbar />
                <Switch>
                    {this.renderHomeComponent()}
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/signin" exact component={SignIn} /> 
                </Switch>
            </Router>
        );
    };
}


const mapStateToProps = state => {
    return {
        auth : state.auth,
    };
};

export default connect(mapStateToProps,{ signInWithToken, })(App);