import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import { useRouter } from 'next/router'
import { message } from 'antd';
import Head from 'next/head';
import Logout from '../components/logout';

const Supervisor = () => {

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);
    const role = useSelector(state => state.role);

    useEffect(() => {
        if(!isLogged){
            message.error("Please login first");
            router.push('/login');
        }else if(isLogged && role !== 'supervisor'){
            message.error("You have no access to this page!");
            router.push(`/${role}`);
        }
    },[])

    return (
        <div>
            <Head>
                <title>Supervisor</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {isLogged && role === 'supervisor' ? <Logout /> : null}
        </div>
    )
}

export default Supervisor;