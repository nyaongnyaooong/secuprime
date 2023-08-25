import { User, UserModify } from "../../interfaces/user.interface";

export interface UserModifyModalProps {
  hidden: boolean;
  controlModal: {
    setHiddenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setHiddenModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  formValue: UserModify;
  setFormValue: React.Dispatch<React.SetStateAction<UserModify>>;
  // refresh: Promise<void>;
  refresh: () => Promise<void>;
  modifyInitCode: number | undefined;
}