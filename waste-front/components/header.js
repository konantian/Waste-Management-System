import React, { useState, useEffect } from 'react';
import Logout from './logout';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PageHeader, Descriptions, Divider} from 'antd';
import { PERSONNEL_API } from '../constants/api';

const Header = ({role}) => {

    const [info, setInfo] = useState("");
    const isLogged = useSelector(state => state.isLogged);
    const username = useSelector((state) => state.username);
    const name = useSelector((state) => state.name);
    const userId = useSelector((state) => state.userId);

    useEffect(() => {
        axios.get(PERSONNEL_API(userId)).then((res) => {
            setInfo(res.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    return (
        <div className="pageHeader">
            {isLogged ? 
            <PageHeader
                ghost={false}
                title={role}
                subTitle={name}
                extra={[<Logout key="logout"/>]}
                avatar={{ src: '/boy.png', size : 60}}
            >
                <Descriptions size="middle" column={3} className="descriptions">
                    <Descriptions.Item label="Name" labelStyle={{"fontWeight" : "bold"}}>{name}</Descriptions.Item>
                    <Descriptions.Item label="User ID" labelStyle={{"fontWeight" : "bold"}} >{userId}</Descriptions.Item>
                    <Descriptions.Item label="Email" labelStyle={{"fontWeight" : "bold"}}>{info.email}</Descriptions.Item>
                    <Descriptions.Item label="Username" labelStyle={{"fontWeight" : "bold"}}>{username}</Descriptions.Item>
                    <Descriptions.Item label="Address" labelStyle={{"fontWeight" : "bold"}}>{info.address}</Descriptions.Item>
                    <Descriptions.Item label="Supervisor" labelStyle={{"fontWeight" : "bold"}}>{info.supervisor_id || "None"}</Descriptions.Item>
                </Descriptions>
            </PageHeader> : null}
            <Divider />
        </div>
    )
}

export default Header;