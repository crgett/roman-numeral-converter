import React, { useEffect, useState } from 'react';

import { Button, Form, TextField, View } from '@adobe/react-spectrum';
import useRomanNumeral from '../hooks/useRomanNumeral';

export const FORM_ERROR =
  'Please provide a valid number in the range 1 - 3999.';

const RomanNumeralConverter = () => {
  const [number, setNumber] = useState<string>('');
  const [error, setError] = useState<string | undefined>('');

  const {
    numberToRomanNumeral,
    result,
    error: fetchError,
    isLoading,
  } = useRomanNumeral();

  useEffect(() => {
    if (
      !/^\d+$/.test(number) ||
      parseInt(number) === 0 ||
      parseInt(number) >= 4000
    ) {
      setError(FORM_ERROR);
    } else {
      setError(undefined);
    }
  }, [number]);

  const getValidationState = () => {
    if (number === '') return undefined;
    return error === undefined ? 'valid' : 'invalid';
  };

  return (
    <View maxWidth="size-6000">
      <h2>Roman numeral converter</h2>
      <Form
        validationBehavior="native"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          numberToRomanNumeral(number);
        }}
      >
        <TextField
          label="Enter a number"
          name="number"
          value={number}
          onChange={setNumber}
          isRequired
          autoFocus
          inputMode="numeric"
          maxLength={4}
          validationState={getValidationState()}
          errorMessage={error}
        />
        <Button variant="secondary" type="submit">
          Convert to roman numeral
        </Button>
      </Form>
      <h3 data-testid="output">
        Roman numeral: {isLoading ? 'loading...' : result}
      </h3>
      {fetchError && (
        <h3 data-testid="errorMsg" style={{ color: 'red' }}>
          {fetchError}
        </h3>
      )}
    </View>
  );
};

export default RomanNumeralConverter;
