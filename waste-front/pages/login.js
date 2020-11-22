import React from 'react';
import { Form, Input, Button,message } from 'antd';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {

    const router = useRouter();

    const onFinish = values => {
        axios.post('http://localhost:5000/login/',
            {
                "username" : values.username,
                "password" : values.password
            }).then((res) => {
                message.success(res.data['success']);
                let role = res.data['role'];
                router.push(`/${role}`);
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
      };

    return (
        <div className="formContainer">
            <Form className="form" onFinish={onFinish}>
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
                <div className="buttons">
                    <Form.Item >
                        <Button className="loginButton" type="primary" shape="round" size="large" htmlType="submit">Log in</Button>
                    </Form.Item>
                    <Form.Item >
                        <Link href="/signup">
                            <Button className="loginButton" type="primary" shape="round" size="large" >Sign Up</Button>
                        </Link>
                    </Form.Item>
                </div>
            </Form>
        </div>
        
    )
}

export default Login;