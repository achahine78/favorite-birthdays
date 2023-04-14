export const padNumber = (number: number): string => {
  const stringifiedNumber = String(number);
  return stringifiedNumber.length > 1 ? stringifiedNumber : `0${stringifiedNumber}`;
};
