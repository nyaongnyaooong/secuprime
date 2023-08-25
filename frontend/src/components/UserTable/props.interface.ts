import { User, UserModify } from "../../interfaces/user.interface";

export interface UserTableProps {
  tableData: User[];
  setTableData: React.Dispatch<React.SetStateAction<User[]>>;
  controlModal: {
    setHiddenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setHiddenModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  setFormValue: React.Dispatch<React.SetStateAction<UserModify>>;
  setModifyInitCode: React.Dispatch<React.SetStateAction<number | undefined>>;
}