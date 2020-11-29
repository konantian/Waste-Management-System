import React, {useEffect,useState} from 'react';
import {useSelector} from 'react-redux'; 
import { useRouter } from 'next/router'
import { message, Tabs} from 'antd';
import ListInformationForm from '../components/Forums/accountManager/listInformation';
import MasterAccountForm from '../components/Forums/accountManager/masterAccountForm';
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
            <Tabs defaultActiveKey="1" type="card" size='default'>
                <TabPane tab="List Information" key="1">
                    <ListInformationForm /> 
                </TabPane>
                <TabPane tab="Create new Master Account" key="2">
                    <MasterAccountForm />
                </TabPane>
                <TabPane tab="Add new service agreement" key="3">
                    Content of card tab 3
                </TabPane>
                <TabPane tab="Create Summary Report" key="4">
                    Content of card tab 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AccountManager;