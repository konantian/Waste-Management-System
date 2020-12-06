import React,{useState,useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form,Button,Card, Divider,message } from 'antd';
import {SUMMARY_REPORT_API} from '../../../constants/api';
import AccountInput from './accountInput';

const SummaryReport = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [report, setReport] = useState(null);
    const [account, setAccount] = useState(null);

    const onFinish = values => {

        axios.get(SUMMARY_REPORT_API,
            {
            params : {
                pid : userId,
                account : values.account_no
            }}).then((res) => {
                setReport(res.data);
                setAccount(values.account_no);
                formRef.current.resetFields();
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                setReport(null);
                setAccount(null);
                message.error(msg['error']);
            })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <AccountInput />
                <div className="submitContainer">
                    <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
                </div>
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