import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { defaultTheme, Provider } from '@adobe/react-spectrum';

import RomanNumeralConverter, { FORM_ERROR } from './RomanNumeralConverter';
import useRomanNumeral from '../hooks/useRomanNumeral';

jest.mock('../hooks/useRomanNumeral');

describe('RomanNumeralConverter', () => {
  const mockUseRomanNumeral = useRomanNumeral as jest.MockedFunction<
    typeof useRomanNumeral
  >;
  const mockNumberToRomanNumeral = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders input and button', () => {
    mockUseRomanNumeral.mockReturnValue({
      result: '',
      error: '',
      isLoading: false,
      numberToRomanNumeral: mockNumberToRomanNumeral,
    });
    render(
      <Provider theme={defaultTheme}>
        <RomanNumeralConverter />
      </Provider>,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls numberToRomanNumeral on form submit', () => {
    mockUseRomanNumeral.mockReturnValue({
      result: '',
      error: '',
      isLoading: false,
      numberToRomanNumeral: mockNumberToRomanNumeral,
    });
    render(
      <Provider theme={defaultTheme}>
        <RomanNumeralConverter />
      </Provider>,
    );
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(button);
    waitFor(() => {
      expect(mockUseRomanNumeral).toHaveBeenCalledWith('1');
    });
  });

  it('display form error when applicable', () => {
    mockUseRomanNumeral.mockReturnValue({
      result: '',
      error: '',
      isLoading: false,
      numberToRomanNumeral: mockNumberToRomanNumeral,
    });
    render(
      <Provider theme={defaultTheme}>
        <RomanNumeralConverter />
      </Provider>,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByText(FORM_ERROR)).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '1' } });
    expect(screen.queryByText(FORM_ERROR)).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: '4000' } });
    expect(screen.getByText(FORM_ERROR)).toBeInTheDocument();
  });

  it('displays loading... when loading', () => {
    mockUseRomanNumeral.mockReturnValue({
      result: '',
      error: '',
      isLoading: true,
      numberToRomanNumeral: mockNumberToRomanNumeral,
    });
    render(
      <Provider theme={defaultTheme}>
        <RomanNumeralConverter />
      </Provider>,
    );
    expect(screen.getByTestId('output')).toHaveTextContent('loading...');
  });

  it('displays result when available', () => {
    mockUseRomanNumeral.mockReturnValue({
      result: 'I',
      error: '',
      isLoading: false,
      numberToRomanNumeral: mockNumberToRomanNumeral,
    });
    render(
      <Provider theme={defaultTheme}>
        <RomanNumeralConverter />
      </Provider>,
    );
    expect(screen.getByTestId('output')).toHaveTextContent('I');
  });

  it('displays fetch error when applicable', () => {
    const errorMsg = 'Number out of range (1-3999): 4000';
    mockUseRomanNumeral.mockReturnValue({
      result: '',
      error: errorMsg,
      isLoading: false,
      numberToRomanNumeral: mockNumberToRomanNumeral,
    });
    render(
      <Provider theme={defaultTheme}>
        <RomanNumeralConverter />
      </Provider>,
    );
    expect(screen.getByTestId('errorMsg')).toHaveTextContent(errorMsg);
  });
});
