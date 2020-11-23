import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import { useRouter } from 'next/router'
import { message } from 'antd';

const AccountManager = () => {

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);
    const userId = useSelector(state => state.userId);
    const role = useSelector(state => state.role);
    const username = useSelector(state => state.username);

    useEffect(() => {
        if(!isLogged){
            message.error("Please login first");
            router.push('/login');
        }
    })

    return (
        <div>
            
        </div>
    )
}

export default AccountManager;