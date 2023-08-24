import axios from "axios";



const createRecord = async () => {
  try {

  } catch {

  }
}

const resetRecord = async () => {
  try {
    await axios.post('http://localhost:3001/api/user/reset')
  } catch {

  }

}

export { createRecord, resetRecord };