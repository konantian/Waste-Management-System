import CreateEntryForm from './createEntry';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const DispatcherForms = () => {

    return (
        <div className="formContainer">
            <Tabs defaultActiveKey="1" type="card" size="default">
                <TabPane tab="Create Entry" key="1">
                    <CreateEntryForm />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default DispatcherForms;