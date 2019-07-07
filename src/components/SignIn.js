import React from 'react';
import { connect } from 'react-redux';
import { reduxForm,Field } from 'redux-form';
import Spinner from './Spinner';
import { signIn } from '../actions';
import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';


class SignIn extends React.Component{

    state = { phase:0 }

    componentDidMount = () => {
        document.title = "Sign In | Foxedo KMS";
        if(this.props.auth.accountJustCreated===true){
            this.setState({phase:5});
        };
    };

    encryptString = (password) => {
        const encodeBase64 = utils.encodeBase64;
        const nonce = nacl.randomBytes(24);
        const secretKey = Buffer.from((process.env.REACT_APP_NOT_SECRET_CODE).toString(), 'utf8')
        const secretData = Buffer.from(password, 'utf8')
        const encrypted = nacl.secretbox(secretData, nonce, secretKey)
        const result = `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`
        return result;
    };

    renderAlert = () => {
        if(this.state.phase===5){
            return (
                <div className="alert alert-success text-center" role="alert">
                    Account Created Successfully!
                </div>
            );
        }else if(this.state.phase===2){
            return (
                <div className="alert alert-danger text-center" role="alert">
                    Incorrect Email or Password!
                </div>
            );
        };
    };

    renderInputError = (meta) => {
        if(meta.touched&&meta.error){
            return <small>{meta.error}</small>;
        };
    };

    renderInput = ({input,type,placeholder,icon,meta}) => {
        return(
            <div className="form-group">
                {this.renderInputError(meta)}
                <div className="input-group input-group-alternative mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className={icon}></i></span>
                </div>
                <input className="form-control" {...input} placeholder={placeholder} type={type} autoComplete="off" />
                </div>
            </div>
        );
    };

    onSubmit = async ({email,password}) => {
        await this.setState({phase:1});
        password = this.encryptString(password)
        await this.props.signIn({email,password});
        if(this.props.auth.errors){
            this.setState({phase:2});
        };
    };

    render(){
        if(this.state.phase===1){
            return <Spinner />
        };
        return(
            <main>
                <div style={{paddingTop:'35px',paddingBottom:'35px'}} className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {this.renderAlert()}
                        <div className="card bg-secondary shadow border-0">
                        <div className="card-header bg-white">
                            <div className="heading-title text-warning text-center">Sign In</div>
                        </div>
                        <div className="card-body px-lg-5 py-lg-5">
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name='email' component={this.renderInput} type="email" placeholder="Email" icon="ni ni-email-83" />
                                <Field name='password' component={this.renderInput} type="password" placeholder="Password" icon="ni ni-lock-circle-open" />
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning mt-4">Sign In</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        )
    }
}


const validate = fv => {

    const errors = {};

    if(!fv.email){
        errors.email = "You must enter your email.";
    }

    if(!fv.password){
        errors.password = "You must enter a password.";
    }

    return errors;

}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

const SignInWrapper = reduxForm({ form:'signIn',validate })(SignIn);

export default connect(mapStateToProps,{ signIn })(SignInWrapper);