import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import { useRouter } from 'next/router'
import Head from 'next/head';
import { message, Tabs} from 'antd';
import Logout from '../components/logout';
import {
    ListInformationForm,
    SummaryReport,
    ServiceAgreement,
    MasterAccountForm
 } from '../components/Forums/accountManager/';


const { TabPane } = Tabs;

const AccountManager = () => {

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);
    const role = useSelector(state => state.role);

    useEffect(() => {
        if(!isLogged){
            message.error("Please login first");
            router.push('/login');
        }else if(isLogged && role !== 'accountManager'){
            message.error("You have no access to this page!");
            router.push(`/${role}`);
        }
    },[])

    return (
        <div >
            <Head>
                <title>Account Manager</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {isLogged && role === 'accountManager' ? 
                <div>
                    <Logout /> 
                    <div className="formContainer">
                        <Tabs defaultActiveKey="1" type="card" size='default'>
                            <TabPane tab="List Information" key="1">
                                <ListInformationForm /> 
                            </TabPane>
                            <TabPane tab="Create New Master Account" key="2">
                                <MasterAccountForm />
                            </TabPane>
                            <TabPane tab="Add New Service Agreement" key="3">
                                <ServiceAgreement />
                            </TabPane>
                            <TabPane tab="Create Summary Report" key="4">
                                <SummaryReport />
                            </TabPane>
                        </Tabs>
                    </div>
                </div> : null}
        </div>
    )
}

export default AccountManager;