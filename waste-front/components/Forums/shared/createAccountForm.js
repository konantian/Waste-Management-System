import React from 'react';
import { Form, DatePicker, Select, Input } from 'antd';
import { customer_types } from '../../../constants/types';
const { RangePicker } = DatePicker;

const CreateAccountForm = () => {
    return (
        <div>
            <Form.Item
                label="Master Account"
                name="account_no"
                rules={[
                    { required: true, message: 'Enter the master account' },
                ]}
            >
                <Input
                    allowClear
                    type="number"
                    placeholder="Enter a new master account"
                />
            </Form.Item>
            <Form.Item
                label="Customer Name"
                name="customer_name"
                rules={[{ required: true, message: 'Enter the customer name' }]}
            >
                <Input allowClear placeholder="Enter the customer name" />
            </Form.Item>
            <Form.Item
                label="Contact Info"
                name="contact_info"
                rules={[{ required: true, message: 'Enter the contact info' }]}
            >
                <Input allowClear placeholder="Enter the contact information" />
            </Form.Item>
            <Form.Item
                label="Customer Type"
                name="customer_type"
                rules={[
                    { required: true, message: 'Select the customer type' },
                ]}
            >
                <Select placeholder="Select customer type">
                    {customer_types.map((type, index) => (
                        <Select.Option key={index} value={type.toLowerCase()}>
                            {type}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="range-picker"
                label="Start Date - End Date"
                rules={[
                    {
                        type: 'array',
                        required: true,
                        message: 'Please select time!',
                    },
                ]}
            >
                <RangePicker />
            </Form.Item>
        </div>
    );
};

export default CreateAccountForm;
