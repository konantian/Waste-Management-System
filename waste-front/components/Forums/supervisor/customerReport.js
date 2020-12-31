import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useSWR from 'swr';
import { Form, Select, Divider, Spin, message } from 'antd';
import { CUSTOMER_REPORT_API, CUSTOMER_LIST_API } from '../../../constants/api';
import { ReportCard, SubmitButton } from '../shared';

const CustomerReportForm = () => {
    const formRef = useRef(null);
    const userId = useSelector((state) => state.userId);
    const [customer, setCustomer] = useState([]);
    const [report, setReport] = useState(null);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetcher = (url) => {
        axios.get(url, {
                params: {
                    pid: userId,
                },
            }).then((res) => {
                setCustomer(res.data.customers);
            });
    };

    const { data, error } = useSWR(CUSTOMER_LIST_API, fetcher);

    const onFinish = (values) => {
        axios.get(CUSTOMER_REPORT_API, {
                params: {
                    account: values.account,
                },
            }).then((res) => {
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
            });
    };

    return (
        <div>
            <Form onFinish={onFinish} ref={formRef}>
                {customer.length > 0 ? (
                    <Form.Item
                        label="Master Account"
                        name="account"
                        rules={[
                            {
                                required: true,
                                message: 'Select the master account',
                            },
                        ]}
                    >
                        <Select placeholder="Select master account">
                            {customer.map((cst, index) => (
                                <Select.Option key={index} value={cst}>
                                    {cst}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                ) : (
                    <div className="spinContainer">
                        <Spin
                            className="customerSpin"
                            size="large"
                            tip="Loading customers list..."
                        />
                    </div>
                )}
                <SubmitButton
                    text="Create"
                    loading={loading}
                    setLoading={setLoading}
                />
            </Form>
            <Divider />
            {report !== null ? (
                <ReportCard account={account} report={report} />
            ) : null}
        </div>
    );
};

export default CustomerReportForm;
