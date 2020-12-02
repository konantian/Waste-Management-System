import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import { useRouter } from 'next/router'
import { message,Tabs } from 'antd';
import Head from 'next/head';
import Logout from '../components/logout';
import {
    AssignAccountForm,
    CustomerReportForm,
    ManagerReportForm
} from '../components/Forums/supervisor/';

const { TabPane } = Tabs;

const Supervisor = () => {

    const router = useRouter();
    const isLogged = useSelector(state => state.isLogged);
    const role = useSelector(state => state.role);

    useEffect(() => {
        if(!isLogged){
            message.error("Please login first");
            router.push('/login');
        }else if(isLogged && role !== 'supervisor'){
            message.error("You have no access to this page!");
            router.push(`/${role}`);
        }
    },[])

    return (
        <div>
            <Head>
                <title>Supervisor</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {isLogged && role === 'supervisor' ? 
                <div>
                    <Logout /> 
                    <div className="formContainer">
                        <Tabs defaultActiveKey="1" type="card" size='default'>
                            <TabPane tab="Assign Account" key="1">
                                <AssignAccountForm /> 
                            </TabPane>
                            <TabPane tab="Customer Report" key="2">
                                <CustomerReportForm /> 
                            </TabPane>
                            <TabPane tab="Manager Report" key="3">
                                <ManagerReportForm /> 
                            </TabPane>
                        </Tabs>
                    </div>
                    
                </div> : null}
        </div>
    )
}

export default Supervisor;