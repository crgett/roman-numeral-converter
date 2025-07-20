import React from 'react';

import { Flex, Provider, defaultTheme } from '@adobe/react-spectrum';

interface Props {
  children: React.ReactNode;
}

const Background = ({ children }: Props) => {
  return (
    <Provider theme={defaultTheme}>
      <Flex
        direction="column"
        height="100vh"
        marginX="size-200"
        justifyContent="start"
      >
        {children}
      </Flex>
    </Provider>
  );
};

export default Background;
