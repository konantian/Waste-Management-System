import React, { useEffect } from 'react';
import { message, BackTop } from 'antd';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicHeader = dynamic(() => import('../components/header'))
const DynamicFooter = dynamic(() => import('../components/footer'))
const DriverForms = dynamic(() => import('../components/Forums/driver/'))

const Driver = () => {
    const router = useRouter();
    const isLogged = useSelector((state) => state.isLogged);
    const role = useSelector((state) => state.role);

    useEffect(() => {
        if (!isLogged) {
            message.error('Please login first');
            router.push('/login');
        } else if (isLogged && role !== 'driver') {
            message.error('You have no access to this page!');
            router.push(`/${role}`);
        }
    }, []);

    return (
        <div className="main" >
            <Head>
                <title>Driver</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <BackTop />
            <DynamicHeader role="Driver"/>
            {isLogged && role === 'driver' ? (
                <div className="pageContainer" >
                    <DriverForms />
                </div>
            ) : null}
            <DynamicFooter />
        </div>
    );
};

export default Driver;
