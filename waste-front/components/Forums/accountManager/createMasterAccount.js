import React,{useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'; 
import { Form, Input, Select,DatePicker, Button, Table, Divider, message} from 'antd';
const { RangePicker } = DatePicker;

const MasterAccountForm = () => {

    const userId = useSelector(state => state.userId);
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {title: 'Account No.','dataIndex': 'account_no'},{title: 'Account Mgr','dataIndex': 'account_mgr'},{title: 'Customr Name','dataIndex': 'customer_name'},
        {title: 'Contact Info','dataIndex': 'contact_info'},{title: 'Customer Type','dataIndex': 'customer_type'},{title: 'Start Date','dataIndex': 'start_date'},
        {title: 'End Date','dataIndex': 'end_date'},{title: 'Total Amount','dataIndex': 'total_amount'},
    ]

    const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ],
      };

    const onFinish = values => {
        
        let rangePicker = values['range-picker']; 
        let startDate = rangePicker[0].format('YYYY-MM-DD');
        let endDate = rangePicker[1].format('YYYY-MM-DD');

        axios.post("http://localhost:5000/api/accountManager/createAccount/",
        {
            "pid" : userId,
            "account_no" : values.account_no,
            "customer_name" : values.name,
            "contact_info" : values.contact,
            "customer_type" : values.type,
            "start_date" : startDate,
            "end_date" : endDate
        }).then((res) => {
            message.success(res.data['success']);
            axios.get('http://localhost:5000/api/accountManager/listInformation/',
            {
            params : {
                pid : userId,
                account : values.account_no
            }}).then((res) => {
                let temp = [];
                temp.push(res.data);
                setDataSource(temp);
            })
        }).catch((err) => {
            let msg = JSON.parse(err.response.request.response);
            message.error(msg['error']);
        })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish}>
                <Form.Item
                    label="Master Account"
                    name="account_no"
                    rules={[{required: true,message: 'Enter the master account',}]}
                >
                <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Customr Name"
                    name="name"
                    rules={[{required: true,message: 'Enter the customer name',}]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Contact Info"
                    name="contact"
                    rules={[{required: true,message: 'Enter the contact info',}]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                    label="Customer Type" 
                    name="type"
                    rules={[{required: true,message: 'Select the customer type',},]}
                    >
                    <Select placeholder="Select customer type">
                        <Select.Option value="municipal">Municipal</Select.Option>
                        <Select.Option value="commercial">Commericial</Select.Option>
                        <Select.Option value="industrial">Industrial</Select.Option>
                        <Select.Option value="residential">Residential</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="range-picker" label="Start Date - End Date" {...rangeConfig}>
                    <RangePicker />
                </Form.Item>
                <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
            </Form>
            <Divider />
            {dataSource.length > 0 ? <Table className="informationTable" columns={columns} dataSource={dataSource} pagination={false}/> : null}
        </div>
    )

}

export default MasterAccountForm;