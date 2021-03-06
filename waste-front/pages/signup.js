import React, { useState, useEffect } from 'react';
import { message  } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'; 
import { SIGNUP_API } from '../constants/api';

const DynamicSignUpForm= dynamic(() => import('../components/Forums/signupForm'))
const DynamicFooter = dynamic(() => import('../components/footer'))

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
        <div className="main" >
            <Head>
                <title>Sign Up</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="authContainer">
                {!isLogged ? <DynamicSignUpForm loading={loading} setLoading={setLoading} onFinish={onFinish} /> : null}
            </div>
            <DynamicFooter />
        </div>        
    )
}

export default SignUp;