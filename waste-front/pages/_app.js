import React from 'react';
import './login.css';
import 'antd/dist/antd.css';
import {wrapper} from '../components/store';

const MyApp = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp);