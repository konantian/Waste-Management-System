import React, { useState, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { Form, Divider, Input, DatePicker, Select, message } from 'antd';
import {
    CREATE_ENTRY_API,
    TRUCK_API,
    DRIVERS_API,
    CONTAINER_API,
    AGREEMENTS_API
} from '../../../constants/api';
import { SubmitButton } from '../shared/';

const CreateEntryForm = () => {
    const formRef = useRef(null);
    const [ownTruck, setTruck] = useState(null);
    const [containers, setContainers] = useState([]);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [services, setServices] = useState([]);

    const driverFetcher = (url) => {
        axios.get(url).then((res) => {setDrivers(res.data.drivers);});
    };

    const serviceNoFetcher = (url) => {
        axios.get(url).then((res) => {setServices(res.data.service_no);});
    }

    const { driverData, error } = useSWR(DRIVERS_API, driverFetcher);
    const { serviceNo, err } = useSWR(AGREEMENTS_API, serviceNoFetcher);

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
                    label="Agreement"
                    name="agreement"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Enter the agreement',
                        },
                        () => ({
                            validator(rule, value) {
                                return agreementValidator(value);
                            },
                        }),
                    ]}
                >
                    <Select 
                        placeholder={services.length > 0 ? 
                            "Select an agreement" : 
                            "Loading agreements..."}
                        loading={services.length === 0}
                        disabled={services.length === 0}
                    >
                        {services.map((agreement, index) => (
                            <Select.Option key={index} value={agreement}>
                                {agreement}
                            </Select.Option>
                        ))}
                    </Select>
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
                    <Select 
                        placeholder={drivers.length > 0 ? 
                            "Select a driver" : 
                            "Loading drivers..."}
                        loading={drivers.length === 0}
                        disabled={drivers.length === 0}
                    >
                        {drivers.map((driver, index) => (
                            <Select.Option key={index} value={driver}>
                                {driver}
                            </Select.Option>
                        ))}
                    </Select>
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
