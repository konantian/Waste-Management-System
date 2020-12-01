import React from 'react';
import { useDispatch,useSelector} from 'react-redux'; 
import {logout} from '../redux/actions';
import Link from 'next/link';
import {Button, message} from 'antd';

const Logout = () => {

    const dispatch = useDispatch();
    const name = useSelector(state => state.name);

    const handleLogout = () =>{
        dispatch(logout());
        message.success(`Thanks for using our waste management system, ${name}!`)
    }


    return (
        <div className="logoutContainer">
            <Link href="/login">
                <Button className="logoutButton" type="primary" size="large" shape="round" onClick={handleLogout}>Log Out</Button>
            </Link>
        </div>
    )
}

export default Logout;

