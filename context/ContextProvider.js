import { createContext, useState, useContext } from "react";

const AppContext = createContext();
const PromptContext = createContext();
const ImageContext = createContext();

export function useAppContext() { return useContext(AppContext) }
export function usePromptContext() { return useContext(PromptContext) }
export function useImageContext() { return useContext(ImageContext) }

export function ContextProvider({ children }) {
  const [session, setSession] = useState(null);
  const [context, setContext] = useState({ prompt: 'this is a test. a prompt might go here.' });
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = (url) => setSelectedImage(url);

  return (
    <AppContext.Provider value={{ session, setSession }}>
      <PromptContext.Provider value={{ context, setContext }}>
        <ImageContext.Provider value={{ selectedImage, selectImage }}>
          {children}
        </ImageContext.Provider>
      </PromptContext.Provider>
    </AppContext.Provider>
  );
}
