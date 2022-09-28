import { useState, createContext } from 'react';
import { getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const curUser = getUser();
  const [user, setUser] = useState(curUser);

  return <UserContext.Provider value={{ user, setUser }}>
    {children}
  </UserContext.Provider>;
};

export { UserProvider, UserContext };