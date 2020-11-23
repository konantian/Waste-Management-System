import React, {useEffect} from 'react';
import { useDispatch} from 'react-redux'; 
import {logout} from '../components/redux/actions';
import { useRouter } from 'next/router'

const Logout = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(logout());
        router.push('/login');
    },)

    return (
        <div>
            
        </div>
    )
}

export default Logout;

