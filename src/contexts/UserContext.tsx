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
        if ( response ) {
            setUsername(_username);
            setPassword(_password);
        } else {
            setUsername("")
            setPassword("")
        }
    }

    const autoLogin = ( ) => {
        loginUser(username, password);
    }

    const login = ( userInfo: any ) => {
        loginUser(userInfo.username, userInfo.password)
    }

    const logout = () => {
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
