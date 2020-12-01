import React,{useState, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { Form, Button,Divider,DatePicker,Table, message } from 'antd';
import {LIST_TOUR_API} from '../../../constants/api';
import {tourColumns} from '../../../constants/columns';

const { RangePicker } = DatePicker;

const ListTourForm = () => {

    const formRef = useRef(null);
    const userId = useSelector(state => state.userId);
    const [tour,setTour] = useState(null);

    const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ],
      };

    const onFinish = values => {

        let rangePicker = values['range-picker']; 
        let startDate = rangePicker[0].format('YYYY-MM-DD');
        let endDate = rangePicker[1].format('YYYY-MM-DD');

        axios.get(LIST_TOUR_API,
            {
            params : {
                pid : userId,
                start_date : startDate,
                end_date : endDate
            }}).then((res) => {
                setTour(res.data);
                formRef.current.resetFields();
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
    }

    return(
        <div>
            <Form className="form" onFinish={onFinish} ref={formRef}>
                <Form.Item name="range-picker" label="Start Date - End Date" {...rangeConfig}>
                    <RangePicker />
                </Form.Item>
                <Button className="submitButton" type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
            </Form>
            <Divider />
            {tour !== null ? <Table className="tourTable" columns={tourColumns} dataSource={tour} pagination={false} /> : null}
        </div>
    )

}

export default ListTourForm;