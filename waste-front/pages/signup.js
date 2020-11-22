import React from 'react';
import { Form, Input, Button,message } from 'antd';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'

const SignUp = () =>{

    const router = useRouter();

    const onFinish = values => {
        axios.post('http://localhost:5000/signup/',
            {
                "userId" : values.userId,
                "role" : values.role,
                "login" : values.username,
                "password" : values.password
            }).then((res) => {
                message.success(res.data['success']);
                router.push('/login');
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
      };

    return (
        <div className="formContainer">
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
                    rules={[{required: true,message: 'Please input your role!',}]}
                >
                    <Input placeholder="Enter your role"/>
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
                <div className="buttons">
                    <Form.Item >
                        <Button className="signButton" type="primary" shape="round" size="large" htmlType="submit">Sign Up</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
        
    )
}

export default SignUp;