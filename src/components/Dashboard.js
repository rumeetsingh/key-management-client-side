import React from 'react';
import KeyBoxes from './DashboardComponents/KeyBoxes';
import KeyBoxDetail from './DashboardComponents/KeyBoxDetail';
import Passwords from './DashboardComponents/Passwords';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faBoxOpen,faLock } from '@fortawesome/free-solid-svg-icons'
import { deselectBox } from '../actions';
import { connect } from 'react-redux';


class Dashboard extends React.Component{

    componentDidMount = () => {
        document.title = "Dashboard | Foxedo KMS";
    };

    renderKeyBoxesCard = () => {
        if(this.props.ui.selectedBox===null){
            return (
                <KeyBoxes auth={this.props.auth} keys={this.props.keys} />
            );
        };
        return <KeyBoxDetail token={this.props.auth.token} data={this.props.ui.selectedBox} />
    };

    render(){
        return(
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-2">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link btn-warning active mt-3" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                <span style={{marginRight:'0.5rem'}}><FontAwesomeIcon icon={faUser} /></span>Home
                            </a>
                            <a onClick={() => this.props.deselectBox()} className="nav-link btn-warning mt-2" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                <span style={{marginRight:'0.5rem'}}><FontAwesomeIcon icon={faBoxOpen} /></span>Key Boxes
                            </a>
                            <a className="nav-link btn-warning mt-2" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                <span style={{marginRight:'0.5rem'}}><FontAwesomeIcon icon={faLock} /></span>Passwords
                            </a>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active mt-3" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">Profile</div>
                            <div className="tab-pane fade mt-3" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                {this.renderKeyBoxesCard()}
                            </div>
                            <div className="tab-pane fade mt-3" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <Passwords token={this.props.auth.token} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    };
}


const mapStateToProps = state => {
    return {
        auth : state.auth,
        keys : state.keys,
        ui : state.ui,
    };
};

export default connect(mapStateToProps,{ deselectBox })(Dashboard);