// expried === true
export function checkExpFile(exp: number): boolean {
  const timeNow = Date.now();

  return exp < timeNow;
}
