import React, { useEffect, useState } from 'react';
import './App.css';
import UserCreateModal from './components/UserCreateModal/UserCreateModal';
import UserModifyModal from './components/UserModifyModal/UserModifyModal';
import UserTable from './components/UserTable/UserTable';
import { refreshRecords, resetRecord } from './functions';
import { User, UserModify } from './interfaces/user.interface';
// import dotenv from 'dotenv';


const App: React.FC = () => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [hiddenModal, setHiddenModal] = useState<boolean>(true);
  const [hiddenModifyModal, setHiddenModifyModal] = useState<boolean>(true);
  const [formValue, setFormValue] = useState<UserModify>({});
  const [modifyInitCode, setModifyInitCode] = useState<number | undefined>();

  const controlModal = {
    setHiddenModal,
    setHiddenModifyModal
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        refreshRecords(setTableData);
      } catch {

      }

    }
    fetchData();
  }, [])

  return (
    <div className='main'>
      <div className='mainButtonArea'>
        <button onClick={() => { resetRecord(setTableData) }}>초기화</button>
        <button onClick={() => {
          setFormValue({})
          setHiddenModal(false);
          setHiddenModifyModal(true);
        }}>추가</button>
      </div>

      <UserTable tableData={tableData} setTableData={setTableData} controlModal={controlModal} setFormValue={setFormValue} setModifyInitCode={setModifyInitCode} />
      <UserCreateModal hidden={hiddenModal} controlModal={controlModal} formValue={formValue} setFormValue={setFormValue} refresh={() => refreshRecords(setTableData)} />
      <UserModifyModal hidden={hiddenModifyModal} controlModal={controlModal} modifyInitCode={modifyInitCode} formValue={formValue} setFormValue={setFormValue} refresh={() => refreshRecords(setTableData)} />
    </div>
  );
}

export default App;
