import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [isOnline, setIsOnline] = useState(true); // Add state for app mode. But still need some work

  return (
    <UserContext.Provider value={{ name, setName, isOnline, setIsOnline }}>
      {children}
    </UserContext.Provider>
  );
};