import React from 'react';
import { connect } from 'react-redux';
import { reduxForm,Field } from 'redux-form';
import { accountJustCreated } from '../actions';
import api from '../apis';
import history from '../history';
import Spinner from './Spinner';


class SignUp extends React.Component{

    state = { phase:0 }

    componentDidMount = () => {
        document.title = "Sign Up | Foxedo KMS";
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

    checkBoxclassName = (meta) => {
        if(meta.touched&&meta.error){
            return "custom-control-label text-danger no-select"
        }else{
            return "custom-control-label no-select"
        };
    };

    renderCheckBox = ({input,meta}) => {
        return (
            <div className="row my-4">
                <div className="col-12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                    <input {...input} className="custom-control-input" id="customCheckRegister" type="checkbox" />
                    <label className={this.checkBoxclassName(meta)} htmlFor="customCheckRegister"><span>I agree with the <a target="__blank" href="https://www.privacypolicygenerator.info/live.php?token=aPo2el6t4qYsi3HbvlecCND10ry0z30s">Privacy Policy</a></span></label>
                </div>
                </div>
            </div>
        );
    };

    renderAlert = () => {
        if(this.state.phase===4){
            return <div className="alert alert-danger" role="alert">This Email Address is Already Registered</div>;
        }else if(this.state.phase===5){
            return <div className="alert alert-danger" role="alert">Something went wrong! Please try again later.</div>;
        };
        return null;
    };

    onSubmit = async ({name,email,password}) => {
        await this.setState({phase:0});
        const emailTaken = await api.get(`/users/check/?email=${email}`)
        if(emailTaken.data.message===true){
            this.setState({phase:4});
        }else{
            await this.setState({phase:1})
            try{
                await api.post('/users/create/',{ name,email,password })
                await this.props.accountJustCreated();
                history.push('/signin')
            }catch(errors){
                this.setState({phase:5})
            };
        };
    };

    render(){
        if(this.state.phase===1){
            return <Spinner />
        }
        return(
            <main>
                <div style={{paddingTop:'35px',paddingBottom:'35px'}} className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-secondary shadow border-0">
                        <div className="card-header bg-white">
                            <div className="heading-title text-warning text-center">Sign Up</div>
                        </div>
                        <div className="card-body px-lg-5 py-lg-5">
                            {this.renderAlert()}
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name='name' component={this.renderInput} type="text" placeholder="Name" icon="ni ni-hat-3" />
                                <Field name='email' component={this.renderInput} type="email" placeholder="Email" icon="ni ni-email-83" />
                                <Field name='password' component={this.renderInput} type="password" placeholder="Password" icon="ni ni-lock-circle-open" />
                                <Field name='cpassword' component={this.renderInput} type="password" placeholder="Confirm Password" icon="ni ni-lock-circle-open" />
                                <Field name='agree' component={this.renderCheckBox} />
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning mt-4">Create account</button>
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


const validate = (formValues) => {

    const errors = {}
    // eslint-disable-next-line
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!formValues.name){
        errors.name = "You must enter your name.";
    };

    if(!formValues.email){
        errors.email = "You must enter your email.";
    }else if(!mailFormat.test(formValues.email)){
        errors.email = "You have entered an invalid email address.";
    }

    if(!formValues.password){
        errors.password = "You must enter a password.";
    }else if(formValues.password.length<=9){
        errors.password = "Password must be at least 10 characters."
    }

    if(!formValues.cpassword){
        errors.cpassword = "You must enter a password.";
    }else if(formValues.cpassword!==formValues.password){
        errors.cpassword = "Passwords must match.";
    };

    if(formValues.agree===false){
        errors.agree = "Please agree the Privacy Policy"
    };

    return errors;

};


const SignUpWrapper = reduxForm({ form:'signUp',validate })(SignUp);

export default connect(null,{ accountJustCreated })(SignUpWrapper);