import AssignAccountForm from './assignAccount';
import CustomerReportForm from './customerReport';
import ManagerReportForm from './managerReport';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const SupervisorForms = () => {

    return (
        <div className="formContainer">
            <Tabs defaultActiveKey="1" type="card" size="default">
                <TabPane tab="Assign Account" key="1">
                    <AssignAccountForm />
                </TabPane>
                <TabPane tab="Customer Report" key="2">
                    <CustomerReportForm />
                </TabPane>
                <TabPane tab="Manager Report" key="3">
                    <ManagerReportForm />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default SupervisorForms;