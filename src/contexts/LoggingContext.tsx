import { FC, useState, createContext } from 'react';
import { LogType } from 'src/models/log';
type LoggingContext = {
    logs: Array<LogType>;
    addLog: (message: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LoggingContext = createContext<LoggingContext>(
  {} as LoggingContext
);

export const LoggingProvider: FC = ({ children }) => {
    const [logs, setLogs] = useState<LogType[]>([]);

    const addLog = (message: string) => {
        const newLog: LogType = { message: message, time: new Date() };
        console.log(message);
        setLogs(logs => [newLog, ...logs]);
    }

    return (
        <LoggingContext.Provider
            value={{ logs, addLog }}
        >
            {children}
        </LoggingContext.Provider>
    );
};
