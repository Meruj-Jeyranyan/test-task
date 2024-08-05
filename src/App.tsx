import React from 'react';
import Task from './components/Task/Task';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GlobalStyles} from './styles/globalStyles';

const App: React.FC = () => (
    <>
      <GlobalStyles />
      <Task />
      <ToastContainer />
    </>
);

export default App;
