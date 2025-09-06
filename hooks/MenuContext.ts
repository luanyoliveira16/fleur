import { createContext, useContext, useState } from "react";

const MenuContext = createContext({
  visible: false,
  openMenu: () => {},
  closeMenu: () => {},
});

export function MenuProvider({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        visible,
        openMenu: () => setVisible(true),
        closeMenu: () => setVisible(false),
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
