import React,{useState, useRef} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'; 
import { Form, Input, Select,DatePicker, Button, Table, Divider, message} from 'antd';
import {INFORMATION_API, CREATE_ACCOUNT_API} from '../../../constants/api';
import {customer_types} from '../../../constants/customerTypes';
import {accountColumns} from '../../../constants/columns';
const { RangePicker } = DatePicker;

const MasterAccountForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [dataSource, setDataSource] = useState(null);

    const onFinish = values => {
        
        let rangePicker = values['range-picker']; 
        let startDate = rangePicker[0].format('YYYY-MM-DD');
        let endDate = rangePicker[1].format('YYYY-MM-DD');

        axios.post(CREATE_ACCOUNT_API,
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
            axios.get(INFORMATION_API,
            {
            params : {
                pid : userId,
                account : values.account_no
            }}).then((res) => {
                let temp = [];
                temp.push(res.data);
                setDataSource(temp);
                formRef.current.resetFields();
            })
        }).catch((err) => {
            let msg = JSON.parse(err.response.request.response);
            message.error(msg['error']);
        })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <Form.Item
                    label="Master Account"
                    name="account_no"
                    rules={[{required: true,message: 'Enter the master account',}]}
                >
                    <Input allowClear type="number" />
                </Form.Item>
                <Form.Item
                    label="Customr Name"
                    name="name"
                    rules={[{required: true,message: 'Enter the customer name',}]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item
                    label="Contact Info"
                    name="contact"
                    rules={[{required: true,message: 'Enter the contact info',}]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item 
                    label="Customer Type" 
                    name="type"
                    rules={[{required: true,message: 'Select the customer type',},]}
                    >
                    <Select placeholder="Select customer type">
                        {customer_types.map((type,index) => 
                            <Select.Option key={index} value={type.toLowerCase()}>{type}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item 
                    name="range-picker" 
                    label="Start Date - End Date" 
                    rules={[{type: 'array',required: true,message: 'Please select time!',},]}
                >
                    <RangePicker />
                </Form.Item>
                <div className="submitContainer">
                    <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Create</Button>
                </div>
            </Form>
            <Divider />
            {dataSource !== null ? <Table className="informationTable" columns={accountColumns} dataSource={dataSource} pagination={false}/> : null}
        </div>
    )

}

export default MasterAccountForm;
