import { createContext, useContext, useState } from "react";

type ModalContextType = {
  isOpen: boolean;
  open: (title: string, content: string) => void;
  close: () => void;
};

const ModalContext = createContext(null as unknown as ModalContextType);

const useModal = () => useContext(ModalContext);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const open = (title: string, content: string) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
            }}
          >
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={close}>Fermer</button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider, useModal };
