import React, { useEffect } from 'react';
import { message, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/header';
import ListTourForm from '../components/Forums/driver/listTour';

const { TabPane } = Tabs;

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
        <div>
            <Head>
                <title>Driver</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            {isLogged && role === 'driver' ? (
                <div>
                    <Header role="Driver"/>
                    <div className="formContainer">
                        <Tabs defaultActiveKey="1" type="card" size="default">
                            <TabPane tab="List Tour Information" key="1">
                                <ListTourForm />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Driver;
