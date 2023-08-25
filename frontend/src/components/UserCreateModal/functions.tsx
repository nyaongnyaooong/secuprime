import axios from "axios";
import { UserModify } from "../../interfaces/user.interface";


const createRecord = async (user: UserModify) => {
  if (isNaN(Number(user.guest_code))) throw new Error('고객 코드는 숫자를 입력해주세요');
  if (!user.guest_code) throw new Error('고객 코드를 입력해주세요');
  if (!user.guest_name) throw new Error('이름을 입력해주세요');
  if (!user.guest_birth) throw new Error('생년월일을 입력해주세요');
  if (!user.guest_hp) throw new Error('전화번호를 입력해주세요');
  if (!user.guest_addr) throw new Error('주소를 입력해주세요');
  if (!user.guest_mail) throw new Error('메일 주소를 입력해주세요');
  const request = await axios.post('/api/user', user)
  console.log(request)
}

export { createRecord };