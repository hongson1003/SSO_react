import { useEffect, useRef } from 'react';
import Header from '../src/components/header/Header';
import AppRoutes from './routers/AppRoutes';
import { doGetAccount } from './redux/actions/accountAction';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  let firstOne = useRef(false);
  useEffect(() => {
    const getAccount = async () => {
      if (firstOne.current === false) {
        firstOne.current = true;
        dispatch(doGetAccount());
      }
    }
    getAccount();
  }, [dispatch]);



  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
