import React, { useState, useRef } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Form, Divider, Input, DatePicker, Select, message } from 'antd';
import {
    CREATE_ENTRY_API,
    TRUCK_API,
    CONTAINER_API,
} from '../../../constants/api';
import { SubmitButton } from '../shared/';

const CreateEntryForm = () => {
    const formRef = useRef(null);
    const [ownTruck, setTruck] = useState(null);
    const [containers, setContainers] = useState([]);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        axios.post(CREATE_ENTRY_API, {
                agreement: values.agreement,
                driver_id: values.driver_id,
                truck_id: values.truck_id,
                cid_drop_off: values.cid_drop_off,
                date_time: values['date_time'].format('YYYY-MM-DD'),
            }).then((res) => {
                setLoading(false);
                message.success(res.data['success']);
                formRef.current.resetFields();
                setTruck(null);
                setContainers([]);
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            });
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    }

    const agreementValidator = async (agreement) => {
        if (!agreement) return Promise.reject();
        try {
            let response = await axios.get(CONTAINER_API(agreement));
            if (agreement !== service) {
                formRef.current.setFieldsValue({ cid_drop_off: null });
                setService(agreement);
            }
            setContainers(response.data.containers);
            return Promise.resolve();
        } catch (err) {
            setContainers([]);
            formRef.current.setFieldsValue({ cid_drop_off: null });
            let msg = JSON.parse(err.response.request.response);
            return Promise.reject(msg['error']);
        }
    };

    const driverValidator = async (driver_id) => {
        if (!driver_id) return Promise.reject();
        try {
            let response = await axios.get(TRUCK_API(driver_id));
            setTruck(response.data.truck_id);
            if (response.data.truck_id) {
                formRef.current.setFieldsValue({
                    truck_id: response.data.truck_id,
                });
            }
            return Promise.resolve();
        } catch (err) {
            setTruck(null);
            formRef.current.setFieldsValue({ truck_id: null });
            let msg = JSON.parse(err.response.request.response);
            return Promise.reject(msg['error']);
        }
    };

    return (
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <Form.Item
                    label="Agreement Number"
                    name="agreement"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Enter the agreement number',
                        },
                        () => ({
                            validator(rule, value) {
                                return agreementValidator(value);
                            },
                        }),
                    ]}
                >
                    <Input
                        allowClear
                        type="number"
                        placeholder="Enter the agreement number"
                    />
                </Form.Item>
                <Form.Item
                    label="Driver Id"
                    name="driver_id"
                    hasFeedback
                    rules={[
                        { required: true, message: 'Enter the driver id' },
                        () => ({
                            validator(rule, value) {
                                return driverValidator(value);
                            },
                        }),
                    ]}
                >
                    <Input
                        allowClear
                        type="number"
                        placeholder="Enter the driver id"
                    />
                </Form.Item>
                <Form.Item
                    label="Truck Id"
                    name="truck_id"
                    rules={[{ required: true, message: 'Enter the truck id' }]}
                >
                    <Input
                        allowClear
                        disabled={ownTruck !== null}
                        placeholder="Enter the truck id"
                    />
                </Form.Item>
                <Form.Item
                    label="Drop Off CID"
                    name="cid_drop_off"
                    rules={[
                        {
                            required: true,
                            message: 'Select the container to drop off',
                        },
                    ]}
                >
                    <Select placeholder="Select container to drop off">
                        {containers.map((cid, index) => (
                            <Select.Option key={index} value={cid}>
                                {cid}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Date Time"
                    name="date_time"
                    hidden={containers.length <= 0}
                    rules={[
                        {
                            type: 'object',
                            required: true,
                            message: 'Please select date time!',
                        },
                    ]}
                >
                    <DatePicker className="datePicker" disabledDate={disabledDate} />
                </Form.Item>
                <SubmitButton
                    text="Create"
                    loading={loading}
                    setLoading={setLoading}
                />
            </Form>
            <Divider />
        </div>
    );
};

export default CreateEntryForm;
