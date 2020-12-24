import ListInformationForm from './listInformation';
import MasterAccountForm from './createMasterAccount';
import ServiceAgreement from './serviceAgreement';
import SummaryReport from './summaryReport';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const AccountManagerForms = () => {

    return (
        <div className="formContainer">
            <Tabs defaultActiveKey="1" type="card" size="default">
                <TabPane tab="List Information" key="1">
                    <ListInformationForm />
                </TabPane>
                <TabPane tab="Create New Master Account" key="2">
                    <MasterAccountForm />
                </TabPane>
                <TabPane tab="Add New Service Agreement" key="3">
                    <ServiceAgreement />
                </TabPane>
                <TabPane tab="Create Summary Report" key="4">
                    <SummaryReport />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AccountManagerForms;