import React from 'react';
import KeyBoxes from './DashboardComponents/KeyBoxes';


class Dashboard extends React.Component{

    componentDidMount = () => {
        document.title = "Dashboard | Foxedo KMS";
    };

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-header heading-title text-warning">
                                Hello
                            </div>
                            <div className="card-body">
                                This is card body
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 mt-3">
                        <KeyBoxes />
                    </div>
                </div>
            </div>
        );
    };
}


export default Dashboard;