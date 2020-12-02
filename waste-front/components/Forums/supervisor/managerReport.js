import React,{useState,useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Card, Divider,message } from 'antd';
import {MANAGER_REPORT_API} from '../../../constants/api';

const ManagerReportForm = () => {

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

export default ManagerReportForm;