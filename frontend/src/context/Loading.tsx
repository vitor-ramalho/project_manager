import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface LoadingContextProps { 
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  setLoading: () => {}
});

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;