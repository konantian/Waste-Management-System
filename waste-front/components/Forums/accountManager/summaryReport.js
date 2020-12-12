import React,{useState,useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form,Button, Divider,message } from 'antd';
import {SUMMARY_REPORT_API} from '../../../constants/api';
import {AccountInput, ReportCard} from '../shared/';

const SummaryReport = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [report, setReport] = useState(null);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = values => {

        axios.get(SUMMARY_REPORT_API,
            {
            params : {
                pid : userId,
                account : values.account_no
            }}).then((res) => {
                setLoading(false);
                setReport(res.data);
                setAccount(values.account_no);
                formRef.current.resetFields();
            }).catch((err) => {
                setLoading(false);
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
                    <Button className="submitButton" loading={loading} onClick={() => setLoading(true)} type="primary" shape="round" size="large" htmlType="submit">Create</Button>
                </div>
            </Form>
            <Divider />
            {report !== null ? <ReportCard account={account} report={report} /> : null}
        </div>
    )

}

export default SummaryReport;