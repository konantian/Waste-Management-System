import React from 'react';
import Link from 'next/link';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

const LoginForm = ({ onFinish, formRef, loading, setLoading}) => {

    return (
        <Form className="form" onFinish={onFinish} ref={formRef} >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true,message: 'Please input your username!',}]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true,message: 'Please input your password!',}]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <div className="loginButtons">
                <Form.Item >
                    <Button className="loginButton" loading={loading} onClick={() => setLoading(true)} type="primary" shape="round" size="large" htmlType="submit">Log In</Button>
                </Form.Item>
                <Form.Item >
                    <Link href="/signup">
                        <Button className="loginButton" type="primary" shape="round" size="large" >Sign Up</Button>
                    </Link>
                </Form.Item>
            </div>
        </Form> 
    )
}

export default LoginForm;