import React from 'react';

export const ThemeContext = React.createContext({
  tema: 'branco',
  mudarTema: () => {},
});
