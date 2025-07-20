import { useState } from 'react';

export const URL = 'http://localhost:3000/romannumeral';

const useRomanNumeral = () => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const numberToRomanNumeral = async (number: string) => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch(`${URL}?query=${number}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setResult(data.output);
    } catch (e: any) {
      setError(`Failed to convert number: ${e.message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return { numberToRomanNumeral, result, error, isLoading };
};

export default useRomanNumeral;
