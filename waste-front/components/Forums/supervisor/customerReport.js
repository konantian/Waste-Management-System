import React,{useState,useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Card, Divider,message } from 'antd';
import {CUSTOMER_REPORT_API,CUSTOMER_LIST_API} from '../../../constants/api';

const CustomerReportForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [report, setReport] = useState(null);

    const onFinish = values => {

    }

    return (
        <div>

        </div>
    )
}

export default CustomerReportForm;