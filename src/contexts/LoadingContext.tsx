import { FC, useState, createContext, useContext } from 'react';
import { LoggingContext } from './LoggingContext';
type LoadingContext = {
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (string) => void;
  stopLoading: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LoadingContext = createContext<LoadingContext>(
  {} as LoadingContext
);

export const LoadingProvider: FC = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const { addLog } = useContext(LoggingContext);
    
    const startLoading = (message: string) => {
        addLog(message);
        setLoadingMessage(message);
        setLoading(true);
    } 
    const stopLoading = () => {
        setLoading(false)
    }

  return (
    <LoadingContext.Provider
      value={{ isLoading, loadingMessage, startLoading, stopLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
