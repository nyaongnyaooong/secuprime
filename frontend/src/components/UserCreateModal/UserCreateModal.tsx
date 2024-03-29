import { AxiosError } from "axios";
import { createRecord } from "./functions";
import { UserCreateModalProps } from "./props.interface";

const UserCreateModal: React.FC<UserCreateModalProps> = (props) => {
  const { hidden, controlModal, formValue, setFormValue, refresh } = props;
  const { setHiddenModal } = controlModal;

  // const [formValue, setFormValue] = useState<UserModify>(userInit);


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
      onSubmit={
        async (event) => {
          event.preventDefault();
          try {
            await createRecord(formValue);
            setHiddenModal(true);
            await refresh();
          } catch (err) {
            if (err instanceof AxiosError) {
              console.log(err)
              if (err.response?.data.message === 'duplicate guest code') alert('이미 존재하는 고객 코드입니다');
              else alert('서버 에러입니다');
            } else {
              alert(err);

            }
          }

        }
      }
      onClick={
        (event) => {
          event.preventDefault()
          event.stopPropagation()
          setHiddenModal(true);
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
          <button type='button' onClick={() => setHiddenModal(true)}>취소</button>
        </div>

      </div>
    </form>
  )
}

export default UserCreateModal;