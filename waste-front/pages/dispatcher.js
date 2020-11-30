import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import { useRouter } from 'next/router'
import { message } from 'antd';
import Head from 'next/head';
import Logout from '../components/logout';

const Dispatcher = () => {

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);
    const userId = useSelector(state => state.userId);
    const role = useSelector(state => state.role);
    const username = useSelector(state => state.username);

    useEffect(() => {
        if(!isLogged){
            message.error("Please login first");
            router.push('/login');
        }else if(isLogged && role !== 'dispatcher'){
            message.error("You have no access to this page!");
            router.push(`/${role}`);
        }
    },[])

    return (
        <div>
            <Head>
                <title>Dispatcher</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {isLogged ? <Logout /> : null}
        </div>
    )
}

export default Dispatcher;