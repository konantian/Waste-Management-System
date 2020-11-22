import {useSelector, useDispatch} from 'react-redux'; 

const AccountManager = () => {

    const isLogged = useSelector(state => state.isLogged);
    const userId = useSelector(state => state.userId);
    const role = useSelector(state => state.role);
    const username = useSelector(state => state.username);

    return (
        <div>
            
        </div>
    )
}

export default AccountManager;