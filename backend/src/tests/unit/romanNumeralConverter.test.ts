import convertToRomanNumeral from "../../utils/romanNumeralConverter";

describe("convertToRomanNumeral()", () => {
  it("converts 1 to I", () => {
    expect(convertToRomanNumeral(1)).toBe("I");
  });
  it("converts 2 to II", () => {
    expect(convertToRomanNumeral(2)).toBe("II");
  });
  it("converts 3 to III", () => {
    expect(convertToRomanNumeral(3)).toBe("III");
  });
  it("converts 4 to IV", () => {
    expect(convertToRomanNumeral(4)).toBe("IV");
  });
  it("converts 5 to V", () => {
    expect(convertToRomanNumeral(5)).toBe("V");
  });
  it("converts 6 to VI", () => {
    expect(convertToRomanNumeral(6)).toBe("VI");
  });
  it("converts 7 to VII", () => {
    expect(convertToRomanNumeral(7)).toBe("VII");
  });
  it("converts 8 to VIII", () => {
    expect(convertToRomanNumeral(8)).toBe("VIII");
  });
  it("converts 9 to IX", () => {
    expect(convertToRomanNumeral(9)).toBe("IX");
  });
  it("converts 10 to X", () => {
    expect(convertToRomanNumeral(10)).toBe("X");
  });
  it("converts 89 to LXXXIX", () => {
    expect(convertToRomanNumeral(89)).toBe("LXXXIX");
  });
  it("converts 567 to DLXVII", () => {
    expect(convertToRomanNumeral(567)).toBe("DLXVII");
  });
  it("converts 1234 to MCCXXXIV", () => {
    expect(convertToRomanNumeral(1234)).toBe("MCCXXXIV");
  });
  it("converts 3999 to MMMCMXCIX", () => {
    expect(convertToRomanNumeral(3999)).toBe("MMMCMXCIX");
  });
});
