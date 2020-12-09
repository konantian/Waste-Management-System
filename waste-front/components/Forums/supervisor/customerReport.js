import React,{useState,useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import useSWR from 'swr';
import { Form, Select, Button,Card, Divider,message } from 'antd';
import {CUSTOMER_REPORT_API,CUSTOMER_LIST_API} from '../../../constants/api';

const CustomerReportForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [customer, setCustomer] = useState([]);
    const [report, setReport] = useState(null);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetcher = (url) => {
        axios.get(CUSTOMER_LIST_API, {
            params : {
                pid : userId
            }
        }).then(res => {
            setCustomer(res.data.customers);
        })
    }

    const {data, error} = useSWR(CUSTOMER_LIST_API, fetcher);

    const onFinish = values => {

        axios.get(CUSTOMER_REPORT_API,
            {
            params : {
                account : values.account
            }}).then((res) => {
                setLoading(false);
                setReport(res.data);
                setAccount(values.account);
                formRef.current.resetFields();
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                setReport(null);
                setAccount(null);
                message.error(msg['error']);
            })
    }

    return (
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                {customer.length > 0 ?
                <Form.Item 
                    label="Master Account" 
                    name="account"
                    rules={[{required: true,message: 'Select the master account',},]}
                    >
                    <Select placeholder="Select master account">
                        {customer.map((cst,index) => 
                            <Select.Option key={index} value={cst}>{cst}</Select.Option>
                        )}
                    </Select>
                </Form.Item> : null}

                <div className="submitContainer">
                    <Button className="submitButton" loading={loading} onClick={() => setLoading(true)}  type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
                </div>
            </Form>
            <Divider />
            {report !== null ? 
                <Card title={`Summary Report for ${account}`} className="report" >
                    <p><strong>Manager Name </strong><span>{report.manager_name}</span></p>
                    <p><strong>Number of Service Agreements  </strong><span>{report.service_count}</span></p>
                    <p><strong>Sum of the prices  </strong><span>{report.cost_sum}</span></p>
                    <p><strong>Sum of the internal cost  </strong><span>{report.price_sum}</span></p>
                    <p><strong>Number of waste type  </strong><span>{report.type_count}</span></p>
                </Card> : null
            }
        </div>
    )
}

export default CustomerReportForm;