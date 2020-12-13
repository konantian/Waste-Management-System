import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Input, message } from 'antd';
import { ASSIGN_ACCOUNT_API } from '../../../constants/api';
import { CreateAccountForm, SubmitButton } from '../shared';

const AssignAccountForm = () => {
    const formRef = useRef(null);
    const userId = useSelector((state) => state.userId);
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        let rangePicker = values['range-picker'];
        let startDate = rangePicker[0].format('YYYY-MM-DD');
        let endDate = rangePicker[1].format('YYYY-MM-DD');

        axios.post(ASSIGN_ACCOUNT_API, {
                pid: userId,
                manager: values.manager,
                account_no: values.account_no,
                customer_name: values.customer_name,
                customer_type: values.customer_type,
                contact_info: values.contact_info,
                start_date: startDate,
                end_date: endDate,
            }).then((res) => {
                setLoading(false);
                message.success(res.data['success']);
                formRef.current.resetFields();
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            });
    };

    return (
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <Form.Item
                    label="Manager"
                    name="manager"
                    rules={[
                        { required: true, message: 'Enter the manager id' },
                    ]}
                >
                    <Input
                        allowClear
                        type="number"
                        placeholder="Enter the manager id"
                    />
                </Form.Item>
                <CreateAccountForm />
                <SubmitButton
                    text="Assign"
                    loading={loading}
                    setLoading={setLoading}
                />
            </Form>
        </div>
    );
};

export default AssignAccountForm;
