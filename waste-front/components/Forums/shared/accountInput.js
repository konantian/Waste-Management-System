import React, { useState } from 'react';
import { Form, Input, AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useSWR from 'swr';
import { ACCOUNT_API } from '../../../constants/api';

const AccountInput = () => {
    const userId = useSelector((state) => state.userId);
    const [accounts, setAccounts] = useState([]);
    const [options, setOptions] = useState([]);

    const fetcher = () => {
        axios.get(ACCOUNT_API(userId)).then((res) => {
            const master_accounts = res.data.accounts.map((account) => {
                return { value: account };
            });
            setAccounts(master_accounts);
        }).catch((err) => {
            console.log(err);
        });
    };

    const { data, error } = useSWR(ACCOUNT_API, fetcher);

    const handleSearch = (value) => {
        setOptions(value ? accounts : []);
    };

    return (
        <Form.Item
            label="Master Account"
            name="account_no"
            rules={[{ required: true, message: 'Enter the master account' }]}
        >
            <AutoComplete
                options={options}
                onSearch={handleSearch}
                disabled={accounts.length === 0}
                filterOption={(inputValue, option) =>
                    option.value.indexOf(inputValue) !== -1
                }
            >
                <Input.Search
                    size="large"
                    placeholder={accounts.length > 0 ? 
                        "Select the master account" : "Loading available accounts..."}
                    enterButton
                    loading={accounts.length === 0}
                />
            </AutoComplete>
        </Form.Item>
    );
};

export default AccountInput;
