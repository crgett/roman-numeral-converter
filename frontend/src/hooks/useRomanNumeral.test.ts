import { act, renderHook } from '@testing-library/react';

import useRomanNumeral, { URL } from './useRomanNumeral';

describe('useRomanNumerals', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('has the expected initial state', () => {
    const { result } = renderHook(() => useRomanNumeral());
    expect(result.current.result).toBe('');
    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('sets result on success', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ input: '1', output: 'I' }),
    });
    const { result } = renderHook(() => useRomanNumeral());
    await act(async () => {
      await result.current.numberToRomanNumeral('1');
    });
    expect(fetch).toHaveBeenCalledWith(`${URL}?query=1`);
    expect(result.current.result).toBe('I');
    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('sets error on server error', async () => {
    const mockError = 'Number out of range (1-3999): 4000';
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: mockError }),
    });
    const { result } = renderHook(() => useRomanNumeral());
    await act(async () => {
      await result.current.numberToRomanNumeral('4000');
    });
    expect(fetch).toHaveBeenCalledWith(`${URL}?query=4000`);
    expect(result.current.result).toBe('');
    expect(result.current.error).toBe(
      `Failed to convert number: ${mockError}.`,
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('sets error on network error', async () => {
    const mockError = 'Network failure';
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(mockError));
    const { result } = renderHook(() => useRomanNumeral());
    await act(async () => {
      await result.current.numberToRomanNumeral('1');
    });
    expect(fetch).toHaveBeenCalledWith(`${URL}?query=1`);
    expect(result.current.result).toBe('');
    expect(result.current.error).toBe(
      `Failed to convert number: ${mockError}.`,
    );
    expect(result.current.isLoading).toBe(false);
  });
});
