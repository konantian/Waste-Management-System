import React, { useEffect, useState } from 'react';
import { Form, Input, AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ACCOUNT_API } from '../../../constants/api';

const AccountInput = () => {
    const userId = useSelector((state) => state.userId);
    const [accounts, setAccounts] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get(ACCOUNT_API(userId)).then((res) => {
                let master_accounts = [];
                res.data.accounts.forEach((account) => {
                    master_accounts.push({ value: account });
                });
                setAccounts(master_accounts);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

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
                filterOption={(inputValue, option) =>
                    option.value.indexOf(inputValue) !== -1
                }
            >
                <Input.Search
                    size="large"
                    placeholder="Select the master account"
                    enterButton
                />
            </AutoComplete>
        </Form.Item>
    );
};

export default AccountInput;
