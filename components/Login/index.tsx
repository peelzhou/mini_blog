import { ChangeEvent, useState } from 'react';
import CountDown from 'components/CountDown';
import styles from './index.module.scss';
import { message } from 'antd';
import request from 'service/fetch';

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  const { isShow, onClose } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);

  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });

  const handleClose = () => {
    onClose && onClose();
  };
  const handleGetVerifyCode = () => {
    // setIsShowVerifyCode(true);
    if (!form?.phone) {
      message.warning('Please enter your phone number.');
      return;
    }

    request
      .post('/api/user/sendVerifyCode', {
        to: form?.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setIsShowVerifyCode(true);
        } else {
          message.error(res?.msg || 'Unknown Error');
        }
      });
  };

  const handleLogin = () => {
    request
      .post('/api/user/login', {
        ...form,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          //Successfully login
          onClose && onClose();
        } else {
          message.error(res?.msg || 'Unknown error');
        }
      });
  };
  const handleOAuthGitHub = () => {};
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>Phone Number Login</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          name="phone"
          type="text"
          placeholder="Please enter your phone number"
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className={styles.verifyCodeArea}>
          <input
            name="verify"
            type="text"
            placeholder="Please enter verify code"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              'Get code'
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          Login
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGitHub}>
          GitHub Login
        </div>
        <div className={styles.loginPrivacy}>
          Agree to the Login Privacy Notice
          <br />
          <a href="#" target="_blank" rel="noreferrer">
            Privacy Notice
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
