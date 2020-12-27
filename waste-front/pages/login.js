import React, { useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'; 
import { login, setUserId, setRole, setUsername, setName } from '../redux/actions';
import { LOGIN_API } from '../constants/api';

const DynamicLoginForm= dynamic(() => import('../components/Forums/loginForm'))
const DynamicFooter = dynamic(() => import('../components/footer'))

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
                dispatchAuth(userId, role, values.username, name);
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
        <div className="main" >
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="loginContainer">
                {!isLogged ?
                    <DynamicLoginForm 
                        loading={loading} 
                        setLoading={setLoading} 
                        formRef={formRef} 
                        onFinish={onFinish}
                    /> : null}
                <DynamicFooter />
            </div>
        </div>
            
    )
}

export default Login;