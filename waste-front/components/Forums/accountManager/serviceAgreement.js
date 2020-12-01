import React,{useState,useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button, Divider,Table,Select, message } from 'antd';
import {INFORMATION_API,CREATE_AGREEMENT_API} from '../../../constants/api';
import {serviceColumns} from '../../../constants/columns';

const SerivceAgreement = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [agreement, setAgreement] = useState([]);

    const onFinish = values => {

        axios.post(CREATE_AGREEMENT_API,
        {
            "pid" : userId,
            "account_no" : values.account_no,
            "location" : values.location,
            "waste_type" : values.waste_type,
            "pick_up_schedule" : values.pick_up_schedule,
            "local_contact" : values.local_contact,
            "internal_cost" : values.internal_cost,
            "price" : values.price
        }).then((res) => {
            message.success(res.data['success']);
            formRef.current.resetFields();
            axios.get(INFORMATION_API,
            {
            params : {
                pid : userId,
                account : values.account_no
            }}).then((res) => {
                setAgreement(res.data.service_agreements);
            })
        }).catch((err) => {
            let msg = JSON.parse(err.response.request.response);
            message.error(msg['error']);
        })
    }

    return (
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <Form.Item
                    label="Master Account"
                    name="account_no"
                    rules={[{required: true,message: 'Enter the master account',}]}
                >
                <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{required: true,message: 'Enter the location',}]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Local Contact"
                    name="local_contact"
                    rules={[{required: true,message: 'Enter the local contact',}]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                    label="Waste Type" 
                    name="waste_type"
                    rules={[{required: true,message: 'Select the waste type',},]}
                    >
                    <Select placeholder="Select waste type">
                        <Select.Option value="hazardous waste">Hazardous Waste</Select.Option>
                        <Select.Option value="plastic">Plastic</Select.Option>
                        <Select.Option value="metal">Metal</Select.Option>
                        <Select.Option value="paper">Paper</Select.Option>
                        <Select.Option value="compost">Compost</Select.Option>
                        <Select.Option value="construction waste">Construction Waste</Select.Option>
                        <Select.Option value="mixed waste">Mixed Waste</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Pick Up Schedule"
                    name="pick_up_schedule"
                    rules={[{required: true,message: 'Enter the pick up schedule',}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Internal Cost"
                    name="internal_cost"
                    rules={[{required: true,message: 'Enter the internal cost',}]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{required: true,message: 'Enter the price',}]}
                >
                    <Input type="number" />
                </Form.Item>
                <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
            </Form>
            <Divider />
            {agreement.length > 0 ? <Table className="informationTable" columns={serviceColumns} dataSource={agreement} pagination={false} /> : null}
        </div>
    )

}

export default SerivceAgreement;