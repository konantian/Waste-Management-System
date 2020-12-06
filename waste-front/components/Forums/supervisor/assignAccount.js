import React,{useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Select, DatePicker, message } from 'antd';
import {ASSIGN_ACCOUNT_API} from '../../../constants/api';
import {customer_types} from '../../../constants/customerTypes';
const { RangePicker } = DatePicker;

const AssignAccountForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);

    const onFinish = values => {

        let rangePicker = values['range-picker']; 
        let startDate = rangePicker[0].format('YYYY-MM-DD');
        let endDate = rangePicker[1].format('YYYY-MM-DD');

        axios.post(ASSIGN_ACCOUNT_API,
            {
                "pid" : userId,
                "manager" : values.manager,
                "account_no" : values.account_no,
                "customer_name" :values.customer_name,
                "customer_type" : values.type,
                "contact_info" : values.contact_info,
                "start_date" : startDate,
                "end_date" : endDate
            }).then((res) => {
                message.success(res.data['success']);
                formRef.current.resetFields();
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
    }

    return (
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <Form.Item
                    label="Manager"
                    name="manager"
                    rules={[{required: true,message: 'Enter the manager id',}]}
                >
                    <Input allowClear type="number" />
                </Form.Item>
                <Form.Item
                    label="Master Account"
                    name="account_no"
                    rules={[{required: true,message: 'Enter the account no.',}]}
                >
                    <Input allowClear type="number" />
                </Form.Item>
                <Form.Item
                    label="Customer Name"
                    name="customer_name"
                    rules={[{required: true,message: 'Enter the customer name.',}]}
                >
                    <Input />
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
                    <RangePicker className="rangePicker" />
                </Form.Item>
                <div className="submitContainer">
                    <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Assign</Button>
                </div>
            </Form>
        </div>
    )
}

export default AssignAccountForm;