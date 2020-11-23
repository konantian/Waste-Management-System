import React from 'react';
import '../styles/login.css';
import 'antd/dist/antd.css';
import {wrapper} from '../components/store';
import {useStore} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const MyApp = ({Component, pageProps}) => {
    const store = useStore((state) => state);
    return(
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
            <Component {...pageProps} />
        </PersistGate>
    )
};

export default wrapper.withRedux(MyApp);