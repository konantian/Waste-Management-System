import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'; 
import { login, setUserId, setRole, setUsername, setName } from '../redux/actions';
import { LOGIN_API } from '../constants/api';

const Login = () => {

    const formRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged);
    const role = useSelector(state => state.role);
    const name = useSelector(state => state.name);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isLogged) {
            message.success(`Welcome come back ${name}!`);
            router.push(`/${role}`);
        }else{
            const username = localStorage.getItem('username');
            if(username){
                formRef.current.setFieldsValue({username : username});
                localStorage.removeItem('username');
            }
        }   
    },[])

    const onFinish = values => {
        axios.post(LOGIN_API,
            {
                "username" : values.username,
                "password" : values.password
            }).then((res) => {
                setLoading(false);
                message.success(res.data['success']);
                let role = res.data['role'];
                let userId = res.data['userId'];
                let name = res.data['name'];
                dispatchAuth(userId, role, username, name);
                router.push(`/${role}`);
            }).catch((err) => {
                setLoading(false);
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
      };

    const dispatchAuth = (userId, role, username,name) => {
        dispatch(login());
        dispatch(setUserId(userId));
        dispatch(setRole(role));
        dispatch(setUsername(username));
        dispatch(setName(name));
    }

    return (
        <div className="loginContainer">
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {!isLogged ?
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
            </Form> : null}
        </div>
        
    )
}

export default Login;