import { FC, useState, createContext, useContext } from 'react';
import { loginService } from 'src/services/Auth/Auth';
import { LoadingContext } from './LoadingContext';
type UserContext = {
  username: string,
  password: string,
  autoLogin: () => void,
  login: (any) => void,
  logout: () => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserContext = createContext<UserContext>(
  {} as UserContext
);

export const UserProvider: FC = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const loginUser = async (_username: string, _password: string) => {
    startLoading("Login...")
    const response = await loginService(_username, _password);
    stopLoading();
    if (response) {
      setUsername(_username);
      setPassword(_password);
      const encryptedAuth = btoa(JSON.stringify({ username: _username, password: _password }));
      localStorage.setItem("logging", encryptedAuth);
    } else {
      setUsername("")
      setPassword("")
    }
  }

  const autoLogin = () => {
    const storedLogging = localStorage.getItem("logging");
    if (storedLogging) {
      const logging = JSON.parse(atob(storedLogging));
      setUsername(logging.username);
      setPassword(logging.password);
    }
  }

  const login = (userInfo: any) => {
    loginUser(userInfo.username, userInfo.password)
  }

  const logout = () => {
    localStorage.removeItem("logging");
    setUsername("");
    setPassword("")
  }

  return (
    <UserContext.Provider
      value={{ username, password, login, autoLogin, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
