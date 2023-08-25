import axios from "axios";
import { UserDetailRecord } from "./interfaces/user-detail-records.interface";
import { UserRecord } from "./interfaces/user-records.interface";
import { User } from "./interfaces/user.interface";

// Table data를 받는 userState hook의 setter 함수의 타입 지정
type Setter = React.Dispatch<React.SetStateAction<User[]>>

const refreshRecords: (stateFunction: Setter) => Promise<void> = async (stateFunction) => {
  try {
    const apiResponse = await axios.get('/api/user');
    if (apiResponse.data === undefined) throw new Error('server api error')
    const { user, userDetail }: { user: UserRecord[], userDetail: UserDetailRecord[] } = apiResponse.data;

    const userList: User[] = user.map((record, recordIndex) => {
      return Object.assign(record, userDetail[recordIndex])
    })

    stateFunction(userList)
  } catch {

  }
}

const resetRecord = async (stateFunction: Setter) => {
  try {
    await axios.post('/api/user/reset')
    await refreshRecords(stateFunction)
  } catch {

  }

}

export { refreshRecords, resetRecord };