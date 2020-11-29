import React,{useState} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Table, Divider,message } from 'antd';

const ListInformationForm = () => {

    const userId = useSelector(state => state.userId);
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {title: 'Account No.','dataIndex': 'account_no'},
        {title: 'Account Mgr','dataIndex': 'account_mgr'},
        {title: 'Customr Name','dataIndex': 'customer_name'},
        {title: 'Contact Info','dataIndex': 'contact_info'},
        {title: 'Customer Type','dataIndex': 'customer_type'},
        {title: 'Start Date','dataIndex': 'start_date'},
        {title: 'End Date','dataIndex': 'end_date'},
        {title: 'Total Amount','dataIndex': 'total_amount'},
    ]

    const onFinish = values => {

        axios.get('http://localhost:5000/api/accountManager/listInformation/',
            {
            params : {
                pid : userId,
                account : values.account
            }}).then((res) => {
                let temp = [];
                temp.push(res.data);
                setDataSource(temp);
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                setDataSource([]);
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
            <Table className="informationTable" columns={columns} dataSource={dataSource} pagination={false} />

        </div>
    )

}

export default ListInformationForm;