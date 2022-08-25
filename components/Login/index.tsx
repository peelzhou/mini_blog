import { useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  const { isShow = false } = props;
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });

  const handleClose = () => {};
  const handleVerifyCode = () => {};
  const handleLogin = () => {};
  const handleOAuthGitHub = () => {};
  const handleFormChange = (e: HTMLInputElement) => {
    const { name, value } = e?.target;
    setForm({
      ...form,
      [name]: value,
    });
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
          <span className={styles.verifyCode} onClick={handleVerifyCode}>
            Get code
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
