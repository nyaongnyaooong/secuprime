import axios from "axios";
import { UserModify } from "../../interfaces/user.interface";


const modifyRecord = async (initCode: number | undefined, modifiedUser: UserModify) => {
  if(isNaN(Number(modifiedUser.guest_code))) throw new Error('고객코드는 숫자만 입력가능합니다')
  await axios.patch('/api/user/' + initCode, modifiedUser)

}

export { modifyRecord };