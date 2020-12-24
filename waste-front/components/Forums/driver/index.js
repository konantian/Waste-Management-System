import ListTourForm from './listTour';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const DriverForms = () => {

    return (
        <div className="formContainer">
            <Tabs defaultActiveKey="1" type="card" size="default">
                <TabPane tab="List Tour Information" key="1">
                    <ListTourForm />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default DriverForms;