import React from 'react';
import { Button } from 'antd';
import PropTypes from "prop-types";

const SubmitButton = ({loading, text, setLoading}) => {

    return (
        <div className="submitContainer">
            <Button 
                className="submitButton" 
                type="primary" 
                shape="round" 
                loading={loading} 
                size="large" 
                onClick={() => setLoading(true)}
                htmlType="submit"
            >   {text}
            </Button>
        </div>
        
    )
}

SubmitButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    setLoading : PropTypes.func.isRequired,
};

export default SubmitButton;