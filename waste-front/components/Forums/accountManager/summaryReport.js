import React,{useState} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Card, Divider,message } from 'antd';

const SummaryReport = () => {

    const userId = useSelector(state => state.userId);
    const [report, setReport] = useState(null);
    const [account, setAccount] = useState(null);

    const onFinish = values => {

        axios.get('http://localhost:5000/api/accountManager/summaryReport/',
            {
            params : {
                pid : userId,
                account : values.account
            }}).then((res) => {
                setReport(res.data);
                setAccount(values.account);
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                setReport(null);
                setAccount(null);
                message.error(msg['error']);
            })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish}>
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
            {report !== null ? 
                <Card title={`Summary Report for ${account}`} className="report" >
                    <p><strong>Number of Service Agreements  </strong><span>{report.count}</span></p>
                    <p><strong>Sum of the prices  </strong><span>{report.cost_sum}</span></p>
                    <p><strong>Sum of the internal cost  </strong><span>{report.price_sum}</span></p>
                    <p><strong>Number of waste type  </strong><span>{report.type_count}</span></p>
                </Card> : null
            }

        </div>
    )

}

export default SummaryReport;