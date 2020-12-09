import React, {useState, useEffect} from 'react';
import { Form, Input, Button,message, Select } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux'; 
import {SIGNUP_API} from '../constants/api';

const SignUp = () =>{

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);
    const role = useSelector(state => state.role);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isLogged) {
            message.success("Welcome come back!");
            router.push(`/${role}`);
        }
    },[])

    const onFinish = values => {
        axios.post(SIGNUP_API,
            {
                "userId" : values.userId,
                "role" : values.role,
                "login" : values.username,
                "password" : values.password
            }).then((res) => {
                setLoading(false);
                message.success(res.data['success']);
                localStorage.setItem('username', values.username);
                router.push('/login');
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
      };

    return (
        <div className="loginContainer">
            <Head>
                <title>Sign Up</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {!isLogged ? 
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
                            <Button className="loginButton" type="primary" shape="round" size="large" >Log in</Button>
                        </Link>
                    </Form.Item>
                    <Form.Item >
                        <Button className="signButton" loading={loading} type="primary" onClick={() => setLoading(true)} shape="round" size="large" htmlType="submit">Sign Up</Button>
                    </Form.Item>
                </div>
            </Form> : null}
        </div>
        
    )
}

export default SignUp;