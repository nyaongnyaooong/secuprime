import axios from "axios";
import { refreshRecords } from "../../functions";
import { User } from "../../interfaces/user.interface";

// Table data를 받는 userState hook의 setter 함수의 타입 지정
type Setter = React.Dispatch<React.SetStateAction<User[]>>


const deleteRecord = async (code: number, stateFunction: Setter) => {
  try {
    await axios.delete('/api/user/' + code);
    await refreshRecords(stateFunction);

  } catch {

  }
}

export { deleteRecord };