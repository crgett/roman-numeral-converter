import React from 'react';
import { render, screen } from '@testing-library/react';

import Background from './Background';

describe('Background', () => {
  it('renders children', () => {
    render(
      <Background>
        <div>Child</div>
      </Background>,
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
