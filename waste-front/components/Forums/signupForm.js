import React from 'react';
import Link from 'next/link';
import { Form, Input, Button, Select } from 'antd';

const SignUpForm = ({ onFinish, loading, setLoading }) => {

    return (
        <Form className="form" onFinish={onFinish}>
            <Form.Item
                label="User Id"
                name="userId"
                rules={[{required: true,message: 'Please input your userId!',}]}
            >
                <Input placeholder="Enter your user id"/>
            </Form.Item>
            <Form.Item 
                label="Role" 
                name="role"
                rules={[{required: true,message: 'Please input your role!',},]}
                >
                <Select placeholder="Select your role">
                    <Select.Option value="account manager">Account Manager</Select.Option>
                    <Select.Option value="supervisor">Supervisor</Select.Option>
                    <Select.Option value="dispatcher">Dispatcher</Select.Option>
                    <Select.Option value="driver">Driver</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true,message: 'Please input your username!',}]}
            >
                <Input placeholder="Enter your username"/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true,message: 'Please input your password!',}]}
            >
                <Input.Password placeholder="Enter your password"/>
            </Form.Item>
            <div className="loginButtons">
                <Form.Item >
                    <Link href="/login">
                        <Button className="authnButton" type="primary" shape="round" size="large" >Log in</Button>
                    </Link>
                </Form.Item>
                <Form.Item >
                    <Button className="authButton" loading={loading} type="primary" onClick={() => setLoading(true)} shape="round" size="large" htmlType="submit">Sign Up</Button>
                </Form.Item>
            </div>
        </Form>
    )

}

export default SignUpForm;