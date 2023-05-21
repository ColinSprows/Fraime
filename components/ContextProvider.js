import { createContext, useState } from "react";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [context, setContext] = useState({
    prompt: 'this is a test. a prompt might go here.'
  });

  return (
    <AppContext.Provider value={{ session, setSession, context, setContext }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
