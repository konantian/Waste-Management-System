import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, Table, Divider, message } from 'antd';
import { INFORMATION_API, CREATE_ACCOUNT_API } from '../../../constants/api';
import { accountColumns } from '../../../constants/columns';
import { CreateAccountForm, SubmitButton } from '../shared/';

const MasterAccountForm = () => {
    const formRef = useRef(null);
    const userId = useSelector((state) => state.userId);
    const [dataSource, setDataSource] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        let rangePicker = values['range-picker'];
        let startDate = rangePicker[0].format('YYYY-MM-DD');
        let endDate = rangePicker[1].format('YYYY-MM-DD');

        axios.post(CREATE_ACCOUNT_API, {
                pid: userId,
                account_no: values.account_no,
                customer_name: values.customer_name,
                contact_info: values.contact_info,
                customer_type: values.customer_type,
                start_date: startDate,
                end_date: endDate,
            }).then((res) => {
                message.success(res.data['success']);
                axios
                    .get(INFORMATION_API, {
                        params: {
                            pid: userId,
                            account: values.account_no,
                        },
                    })
                    .then((res) => {
                        setLoading(false);
                        setDataSource([res.data]);
                        formRef.current.resetFields();
                    });
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            });
    };

    return (
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <CreateAccountForm />
                <SubmitButton
                    text="Create"
                    loading={loading}
                    setLoading={setLoading}
                />
            </Form>
            <Divider />
            {dataSource !== null ? (
                <Table
                    className="informationTable"
                    columns={accountColumns}
                    dataSource={dataSource}
                    pagination={false}
                />
            ) : null}
        </div>
    );
};

export default MasterAccountForm;
