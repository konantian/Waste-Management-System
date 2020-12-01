import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import {useSelector} from 'react-redux'; 

const Home = () => {

  const router = useRouter();
  const isLogged = useSelector(state => state.isLogged);
  const role = useSelector(state => state.role);
  const name = useSelector(state => state.name);

  useEffect(() => {
    if(isLogged) {
        message.success(`Welcome come back ${name}!`);
        router.push(`/${role}`);
    }else{
        router.push('/login');
    }
},[])

  return (
    <div>

    </div>
  )
}

export default Home;