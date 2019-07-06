import React from 'react';
import { Router,Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInWithToken } from '../actions';
import history from '../history';
import Spinner from './Spinner';
import Navbar from './Navbar';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';


class App extends React.Component{

    state = { phase:1 }

    componentDidMount = async () => {
        if(localStorage.getItem('FoxedoKMSAccess')){
            await this.props.signInWithToken(localStorage.getItem('FoxedoKMSAccess'))
        };
        this.setState({phase:0});
    };

    render(){
        if(this.state.phase===1){
            return <Spinner />
        };
        return(
            <Router history={history}>
                <Navbar />
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
            </Router>
        );
    };
}


export default connect(null,{ signInWithToken, })(App);