import React from "react";

import usePersistedState from "../hooks/usePersistedState";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");

    const [purchasedItems, setPurchasedItems] = usePersistedState({
      cursor: 0,
      grandma: 0,
      farm: 0,
    }, "purchased-items");

    const items = [
        { id: "cursor", name: "Cursor", cost: 10, value: 1 },
        { id: "grandma", name: "Grandma", cost: 100, value: 10 },
        { id: "farm", name: "Farm", cost: 1000, value: 80 },
      ];
      
      const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
          const numOwned = purchasedItems[itemId];
          const item = items.find((item) => item.id === itemId);
          const value = item.value;
          return acc + value * numOwned;
        }, 0);
      };

    return (
        <GameContext.Provider
            value={{
                numCookies,
                setNumCookies,
                purchasedItems,
                setPurchasedItems,
                calculateCookiesPerSecond,
            }}
        >
            {children}
        </GameContext.Provider>
    );
  };
  