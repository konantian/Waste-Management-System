import React,{useState, useRef} from 'react';
import axios from 'axios';
import { Form, Button,Divider, Input,DatePicker,Select, message} from 'antd';
import {CREATE_ENTRY_API, TRUCK_API, CONTAINER_API} from '../../../constants/api';

const CreateEntryForm = () => {

    const formRef = useRef(null);
    const [ownTruck, setTruck] = useState(null);
    const [containers, setContainers] = useState([]);

    const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select date time!',
          },
        ],
      };

    const onFinish = values => {

        let datePicker = values['date_time'];
        let dateTime = datePicker.format('YYYY-MM-DD');

        axios.post(CREATE_ENTRY_API,
            {
                "agreement" : values.agreement,
                "driver_id" : values.driver_id,
                "truck_id" : values.truck_id,
                "cid_drop_off" : values.cid_drop_off,
                "date_time" : dateTime
            }).then(res => {
                message.success(res.data['success']);
                formRef.current.resetFields();
                setTruck(null);
                setContainers([]);
            }).catch((err) => {
                let msg = JSON.parse(err.response.request.response);
                message.error(msg['error']);
            })
    }

    const onFieldChange = ({agreement, driver_id}) => {

        if(driver_id !== undefined && driver_id !== ''){
            axios.get(TRUCK_API(driver_id)).then((res) => {
                setTruck(res.data.truck_id);
                formRef.current.setFieldsValue({truck_id : res.data.truck_id});
            }).catch((err) => {
                console.log(err);
            })
        }
        if(agreement !== undefined && agreement !== ''){
            axios.get(CONTAINER_API(agreement)).then((res) => {
                setContainers(res.data.containers);
                formRef.current.setFieldsValue({cid_drop_off : null});
            }).catch((err) => {
                console.log(err);
            })
        }
        
    }

    return(
        <div>
            <Form className="form" 
                  onFinish={onFinish} 
                  ref={formRef}
                  onValuesChange={onFieldChange}
                >
                <Form.Item
                    label="Agreement Number"
                    name="agreement"
                    rules={[{required: true,message: 'Enter the agreement number',}]}
                    
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Driver Id"
                    name="driver_id"
                    rules={[{required: true,message: 'Enter the driver id',}]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Truck Id"
                    name="truck_id"
                    rules={[{required: true,message: 'Enter the truck id',}]}
                >
                    <Input  disabled={ownTruck !== null} />
                </Form.Item>

                <Form.Item 
                    label="Drop Off CID" 
                    name="cid_drop_off"
                    rules={[{required: true,message: 'Select the container to drop off',},]}
                    >
                    <Select placeholder="Select container to drop off">
                        {containers.map((cid) => 
                            <Select.Option value={cid}>{cid}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item 
                    label="Date Time" 
                    name="date_time"
                    hidden={containers.length <= 0}
                    {...config}
                    >
                    <DatePicker className="datePicker" />
                </Form.Item> 
                <Button className="dispatcherButton" type="primary" shape="round" size="large" htmlType="submit">Submit</Button>
            </Form>
            <Divider />
        </div>
    )

}

export default CreateEntryForm;
