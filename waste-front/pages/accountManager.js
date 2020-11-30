import React, {useEffect,useState} from 'react';
import {useSelector} from 'react-redux'; 
import { useRouter } from 'next/router'
import Head from 'next/head';
import { message, Tabs} from 'antd';
import ListInformationForm from '../components/Forums/accountManager/listInformation';
import MasterAccountForm from '../components/Forums/accountManager/createMasterAccount';
import SummaryReport from '../components/Forums/accountManager/summaryReport';

const { TabPane } = Tabs;

const AccountManager = () => {

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);

    useEffect(() => {
        if(!isLogged){
            message.error("Please login first");
            router.push('/login');
        }
    })

    return (
        <div className="accountForm">
            <Head>
                <title>Account Manager</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Tabs defaultActiveKey="1" type="card" size='default'>
                <TabPane tab="List Information" key="1">
                    <ListInformationForm /> 
                </TabPane>
                <TabPane tab="Create new Master Account" key="2">
                    <MasterAccountForm />
                </TabPane>
                <TabPane tab="Add new service agreement" key="3">
                    Content of Card Tap 3
                </TabPane>
                <TabPane tab="Create Summary Report" key="4">
                    <SummaryReport />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AccountManager;