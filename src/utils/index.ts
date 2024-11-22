/* eslint-disable import/prefer-default-export */

export const getRandomIdxArr = (arrLength: number) => {
  const idxArr = Array(arrLength)
    .fill(null)
    .map((el, idx) => idx);

  return idxArr.sort(() => Math.random() - 0.5);
};
