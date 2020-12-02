import React,{useState,useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Input,Button,Card, Divider,message } from 'antd';
import {ASSIGN_ACCOUNT_API} from '../../../constants/api';

const AssignAccountForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [dataSource, setDataSource] = useState(null);

    const onFinish = values => {

    }

    return (
        <div>
            
        </div>
    )
}

export default AssignAccountForm;