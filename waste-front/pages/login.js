import React, {useEffect} from 'react';
import { Form, Input, Button,message } from 'antd';
import axios from 'axios';
import Link from 'next/link'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import {useDispatch} from 'react-redux'; 
import {login, setUserId, setRole, setUsername} from '../components/redux/actions';
import {useSelector} from 'react-redux'; 

const Login = () => {

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);
    const role = useSelector(state => state.role);

    useEffect(() => {
        if(isLogged) {
            message.success("Welcome come back!");
            router.push(`/${role}`);
        }
    },[])

    const dispatch = useDispatch();

    const onFinish = values => {
        axios.post('http://localhost:5000/api/login/',
            {
                "username" : values.username,
                "password" : values.password
            }).then((res) => {
                message.success(res.data['success']);
                let role = res.data['role'];
                let userId = res.data['userId'];
                dispatch(login());
                dispatch(setUserId(userId));
                dispatch(setRole(role));
                dispatch(setUsername(values.username));
                router.push(`/${role}`);
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
      };

    const dispatchAuth = (userId, role, username) => {
        dispatch(login());
        dispatch(setUserId(userId));
        dispatch(setRole(role));
        dispatch(setUsername(username));
    }

    return (
        <div className="formContainer">
            <Form className="form" onFinish={onFinish}>
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