import React,{useState, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form,Button,Table, Divider, message } from 'antd';
import {INFORMATION_API} from '../../../constants/api';
import {accountColumns, serviceColumns} from '../../../constants/columns';
import AccountInput from './accountInput';

const ListInformationForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [accountData, setAccountData] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = values => {

        axios.get(INFORMATION_API,
            {
            params : {
                pid : userId,
                account : values.account_no
            }}).then((res) => {
                setLoading(false);
                setAccountData([res.data]);
                setServiceData(res.data.service_agreements);
                formRef.current.resetFields();
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                setAccountData([]);
                setServiceData([]);
                message.error(msg['error']);
            })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <AccountInput />
                <div className="submitContainer">
                    <Button className="submitButton" loading={loading} onClick={() => setLoading(true)} type="primary" shape="round" size="large" htmlType="submit">List</Button>
                </div>
            </Form>
            <Divider />
            {accountData !== null? <Table className="informationTable" columns={accountColumns} dataSource={accountData} pagination={false} /> : null}
            {serviceData !== null ? <Table className="informationTable" columns={serviceColumns} dataSource={serviceData} pagination={false} /> : null}
        </div>
    )

}

export default ListInformationForm;