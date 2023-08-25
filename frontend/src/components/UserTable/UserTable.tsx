import React from "react";
import { deleteRecord } from "./functions";
import { UserTableProps } from "./props.interface";


const UserTable: React.FC<UserTableProps> = ({ tableData, setTableData, controlModal, setFormValue, setModifyInitCode }) => {
  const { setHiddenModal, setHiddenModifyModal } = controlModal;

  return (
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>성함</th>
          <th>생년월일</th>
          <th>전화번호</th>
          <th>주소</th>
          <th>메일주소</th>
          <th className="tableHide"></th>
        </tr>
      </thead>
      <tbody>
        {
          tableData.map((record, recordIndex) => {
            return (
              <tr key={recordIndex}>
                <td>{record.guest_code}</td>
                <td>{record.guest_name}</td>
                <td>{record.guest_birth}</td>
                <td>{record.guest_hp}</td>
                <td>{record.guest_addr}</td>
                <td>{record.guest_mail}</td>
                <td className="tableHide">
                  <button onClick={() => {
                    setFormValue(record);
                    setModifyInitCode(record.guest_code);
                    setHiddenModal(true);
                    setHiddenModifyModal(false);
                  }}>수정</button>
                  <button onClick={() => deleteRecord(record.guest_code, setTableData)}>삭제</button>
                </td>
              </tr>
            )
          })
        }

      </tbody>
    </table>
  );
}

export default UserTable;