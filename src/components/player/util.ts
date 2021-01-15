export const formatNumber = (number: string): string => {
  if (number === "0") return `00`;
  if (number.length < 2) return `0${number}`;
  return number;
};

export const formatTime = (time: number): string[] => {
  const minute = time / 60;
  const startNumber = Math.floor(minute);

  const endNumber = Math.floor((minute - startNumber) * 60);

  return [formatNumber(String(startNumber)), formatNumber(String(endNumber))];
};
