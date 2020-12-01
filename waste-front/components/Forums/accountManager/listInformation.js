import React,{useState, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Table, Divider,message } from 'antd';
import {INFORMATION_API} from '../../../constants/api';
import {accountColumns, serviceColumns} from '../../../constants/columns';

const ListInformationForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [accountData, setAccountData] = useState(null);
    const [serviceData, setServiceData] = useState(null);

    const onFinish = values => {

        axios.get(INFORMATION_API,
            {
            params : {
                pid : userId,
                account : values.account
            }}).then((res) => {
                let temp = [];
                temp.push(res.data);
                setAccountData(temp);
                setServiceData(res.data.service_agreements);
                formRef.current.resetFields();
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                setAccountData([]);
                setServiceData([]);
                message.error(msg['error']);
            })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <Form.Item
                    label="Master Account"
                    name="account"
                    rules={[{required: true,message: 'Enter the master account',}]}
                >
                <Input type="number" />
                </Form.Item>
                <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
            </Form>
            <Divider />
            {accountData !== null? <Table className="informationTable" columns={accountColumns} dataSource={accountData} pagination={false} /> : null}
            {serviceData !== null ? <Table className="informationTable" columns={serviceColumns} dataSource={serviceData} pagination={false} /> : null}

        </div>
    )

}

export default ListInformationForm;