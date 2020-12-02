import React,{useState} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import useSWR from 'swr';
import { Table, message } from 'antd';
import {MANAGER_REPORT_API} from '../../../constants/api';
import {managerColumns} from '../../../constants/columns';

const ManagerReportForm = () => {

    const userId = useSelector(state => state.userId);
    const [report, setReport] = useState(null);

    const fetcher = (url) => {
        
        axios.get(url,
            {
            params : {
                pid : userId
            }}).then((res) => {
                setReport(res.data);
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                setReport(null);
                message.error(msg['error']);
            })
    }

    const {data,error} = useSWR(MANAGER_REPORT_API, fetcher);

    return (
        <div>
            <Table columns={managerColumns} dataSource={report} pagination={false} />
        </div>
    )
}

export default ManagerReportForm;