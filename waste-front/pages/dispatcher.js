import React, { useEffect } from 'react';
import { message, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Logout from '../components/logout';
import CreateEntryForm from '../components/Forums/dispatcher/createEntry';

const { TabPane } = Tabs;

const Dispatcher = () => {
    const router = useRouter();
    const isLogged = useSelector((state) => state.isLogged);
    const role = useSelector((state) => state.role);

    useEffect(() => {
        if (!isLogged) {
            message.error('Please login first');
            router.push('/login');
        } else if (isLogged && role !== 'dispatcher') {
            message.error('You have no access to this page!');
            router.push(`/${role}`);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Dispatcher</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            {isLogged && role === 'dispatcher' ? (
                <div>
                    <Logout />
                    <div className="formContainer">
                        <Tabs defaultActiveKey="1" type="card" size="default">
                            <TabPane tab="Create Entry" key="1">
                                <CreateEntryForm />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Dispatcher;
