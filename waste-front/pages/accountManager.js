import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { message  } from 'antd';

const DynamicHeader = dynamic(() => import('../components/header'))
const DynamicFooter = dynamic(() => import('../components/footer'))
const AccountManagerForms = dynamic(() => import('../components/Forums/accountManager/'))

const AccountManager = () => {
    const router = useRouter();
    const isLogged = useSelector((state) => state.isLogged);
    const role = useSelector((state) => state.role);

    useEffect(() => {
        if (!isLogged) {
            message.error('Please login first');
            router.push('/login');
        } else if (isLogged && role !== 'accountManager') {
            message.error('You have no access to this page!');
            router.push(`/${role}`);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Account Manager</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            {isLogged && role === 'accountManager' ? (
                <div>
                    <DynamicHeader role="Account Manager"/>
                    <AccountManagerForms />
                    <DynamicFooter />
                </div>
            ) : null}
            
        </div>
    );
};

export default AccountManager;
