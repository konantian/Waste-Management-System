import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Input, Divider, Table, Select, message } from 'antd';
import { INFORMATION_API, CREATE_AGREEMENT_API } from '../../../constants/api';
import { serviceColumns } from '../../../constants/columns';
import { waste_types } from '../../../constants/types';
import { AccountInput, SubmitButton } from '../shared/';

const ServiceAgreement = () => {
    const formRef = useRef(null);
    const userId = useSelector((state) => state.userId);
    const [agreement, setAgreement] = useState([]);
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        axios.post(CREATE_AGREEMENT_API, {
                pid: userId,
                account_no: values.account_no,
                location: values.location,
                waste_type: values.waste_type,
                pick_up_schedule: values.pick_up_schedule,
                local_contact: values.local_contact,
                internal_cost: values.internal_cost,
                price: values.price,
            }).then((res) => {
                message.success(res.data['success']);
                axios.get(INFORMATION_API, {
                        params: {
                            pid: userId,
                            account: values.account_no,
                        },
                    }).then((res) => {
                        setLoading(false);
                        setAgreement(res.data.service_agreements);
                        formRef.current.resetFields();
                    });
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            });
    };

    return (
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <AccountInput />
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: 'Enter the location' }]}
                >
                    <Input allowClear placeholder="Enter the location" />
                </Form.Item>
                <Form.Item
                    label="Local Contact"
                    name="local_contact"
                    rules={[
                        { required: true, message: 'Enter the local contact' },
                    ]}
                >
                    <Input allowClear placeholder="Enter the local contact" />
                </Form.Item>
                <Form.Item
                    label="Waste Type"
                    name="waste_type"
                    rules={[
                        { required: true, message: 'Select the waste type' },
                    ]}
                >
                    <Select placeholder="Select waste type">
                        {waste_types.map((type, index) => (
                            <Select.Option
                                key={index}
                                value={type.toLowerCase()}
                            >
                                {type}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Pick Up Schedule"
                    name="pick_up_schedule"
                    rules={[
                        {
                            required: true,
                            message: 'Enter the pick up schedule',
                        },
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Enter the pick up schedule"
                    />
                </Form.Item>
                <Form.Item
                    label="Internal Cost"
                    name="internal_cost"
                    rules={[
                        { required: true, message: 'Enter the internal cost' },
                    ]}
                >
                    <Input
                        prefix="$"
                        type="number"
                        suffix="USD"
                        placeholder="Enter the internal cost of service"
                    />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Enter the price' }]}
                >
                    <Input
                        prefix="$"
                        type="number"
                        suffix="USD"
                        placeholder="Enter the price of service"
                    />
                </Form.Item>
                <SubmitButton
                    text="Add"
                    loading={loading}
                    setLoading={setLoading}
                />
            </Form>
            <Divider />
            {agreement.length > 0 ? (
                <Table
                    className="informationTable"
                    columns={serviceColumns}
                    dataSource={agreement}
                    pagination={false}
                />
            ) : null}
        </div>
    );
};

export default ServiceAgreement;
