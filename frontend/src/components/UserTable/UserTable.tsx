import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { User } from "../../interfaces/user.interface";
import { modifyRecord, deleteRecord, refreshRecords } from "./functions";

const UserTable: React.FC = () => {
  const [tableData, setTableData] = useState<User[]>([]);

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
    <table>
      <thead>
        <tr>
          <th>고객 번호</th>
          <th>성함</th>
          <th>생년월일</th>
          <th>전화번호</th>
          <th>주소</th>
          <th>메일주소</th>
          <th></th>
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
                <td>
                  <button onClick={() => modifyRecord(record.guest_code, setTableData)}>수정</button>
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