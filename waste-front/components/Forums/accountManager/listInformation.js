import React,{useState} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Table, Divider,message } from 'antd';
import {INFORMATION_API} from '../../../constants/api';

const ListInformationForm = () => {

    const userId = useSelector(state => state.userId);
    const [accountData, setAccountData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const accountColumns = [
        {title: 'Account No.','dataIndex': 'account_no'},
        {title: 'Account Mgr','dataIndex': 'account_mgr'},
        {title: 'Customr Name','dataIndex': 'customer_name'},
        {title: 'Contact Info','dataIndex': 'contact_info'},
        {title: 'Customer Type','dataIndex': 'customer_type'},
        {title: 'Start Date','dataIndex': 'start_date'},
        {title: 'End Date','dataIndex': 'end_date'},
        {title: 'Total Amount','dataIndex': 'total_amount'},
    ]
    const serviceColumns = [
        {title: 'Serivce No.','dataIndex': 'service_no'},
        {title: 'Master Account','dataIndex': 'master_account'},
        {title: 'Location','dataIndex': 'location'},
        {title: 'Waste Type','dataIndex': 'waste_type'},
        {title: 'Pick Up Schedule','dataIndex': 'pick_up_schedule'},
        {title: 'Local Contact','dataIndex': 'local_contact'},
        {title: 'Internal Cost','dataIndex': 'internal_cost'},
        {title: 'Price','dataIndex': 'price'},
    ]

    const onFinish = values => {

        axios.get(INFORMATION_API,
            {
            params : {
                pid : userId,
                account : values.account
            }}).then((res) => {
                let temp = [];
                temp.push(res.data);
                setAccountData(temp);
                setServiceData(res.data.service_agreements);
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                setAccountData([]);
                setServiceData([]);
                message.error(msg['error']);
            })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish}>
                <Form.Item
                    label="Master Account"
                    name="account"
                    rules={[{required: true,message: 'Enter the master account',}]}
                >
                <Input type="number" />
                </Form.Item>
                <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
            </Form>
            <Divider />
            {accountData.length > 0 ? <Table className="informationTable" columns={accountColumns} dataSource={accountData} pagination={false} /> : null}
            {serviceData.length > 0 ? <Table className="informationTable" columns={serviceColumns} dataSource={serviceData} pagination={false} /> : null}

        </div>
    )

}

export default ListInformationForm;