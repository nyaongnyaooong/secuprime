import axios from "axios";
import { User } from "../../interfaces/user.interface";

// Table data를 받는 userState hook의 setter 함수의 타입 지정
type Setter = React.Dispatch<React.SetStateAction<User[]>>

const refreshRecords = async (stateFunction: Setter) => {
  try {
    const apiResponse = await axios.get('http://localhost:3001/api/user');
    if (apiResponse.data === undefined) throw new Error('server api error')

    const userList: User[] = apiResponse.data;
    stateFunction(userList)
  } catch {

  }
}

const modifyRecord = async (code: number, stateFunction: Setter) => {
  try {
    // await axios.patch('http://localhost:3001/', )
  } catch {

  }
}

const deleteRecord = async (code: number, stateFunction: Setter) => {
  try {
    await axios.delete('http://localhost:3001/api/user/' + code);
    await refreshRecords(stateFunction);

  } catch {

  }
}

export { refreshRecords, modifyRecord, deleteRecord };