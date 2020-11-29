import React from 'react';
import { Form, Input, Select,DatePicker, Button, Table} from 'antd';
const { RangePicker } = DatePicker;

const MasterAccountForm = () => {

    const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ],
      };

    return(
        <div>
            <Form className="form">
                <Form.Item
                    label="Master Account"
                    name="account"
                    rules={[{required: true,message: 'Enter the master account',}]}
                >
                <Input />
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
        </div>
    )

}

export default MasterAccountForm;