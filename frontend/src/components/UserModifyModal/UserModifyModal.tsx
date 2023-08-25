import { AxiosError } from "axios";
import { modifyRecord } from "./functions";
import { UserModifyModalProps } from "./props.interface";

const UserModifyModal: React.FC<UserModifyModalProps> = ({ hidden, controlModal, formValue, setFormValue, refresh, modifyInitCode }) => {
  const { setHiddenModifyModal } = controlModal;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  return (
    <form
      className={'modal ' + (hidden ? 'hidden' : 'visible')}
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          await modifyRecord(modifyInitCode, formValue);
          setHiddenModifyModal(true);
          await refresh();
        } catch (err) {
          if (err instanceof AxiosError) {
            if (err.response?.data.message === 'user code already using') alert('이미 사용중인 고객번호입니다')
          } else {
            alert(err)
          }
        }
      }}
      onClick={
        () => {
          setHiddenModifyModal(true);
        }
      }
    >
      <div className="modalArea" onClick={(event) => event.stopPropagation()}>
        <div>
          <span>번호</span>
          <input
            type="text"
            name="guest_code"
            value={formValue.guest_code || ''}
            onChange={handleInputChange}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div>
          <span>이름</span>
          <input
            type="text"
            name="guest_name"
            value={formValue.guest_name || ''}
            onChange={handleInputChange}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div>
          <span>생년월일</span>
          <input
            type="text"
            name="guest_birth"
            value={formValue.guest_birth || ''}
            onChange={handleInputChange}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div>
          <span>전화번호</span>
          <input
            type="text"
            name="guest_hp"
            value={formValue.guest_hp || ''}
            onChange={handleInputChange}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div>
          <span>주소</span>
          <input
            type="text"
            name="guest_addr"
            value={formValue.guest_addr || ''}
            onChange={handleInputChange}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div>
          <span>메일주소</span>
          <input
            type="text"
            name="guest_mail"
            value={formValue.guest_mail || ''}
            onChange={handleInputChange}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        <div className="buttonArea" >
          <button type='submit' onClick={(event) => event.stopPropagation()}>전송</button>
          <button type='button' onClick={() => setHiddenModifyModal(true)}>취소</button>
        </div>
      </div>
    </form >
  )
}

export default UserModifyModal;