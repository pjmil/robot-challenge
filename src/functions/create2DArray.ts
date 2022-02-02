/**
 * Creates the multidimensional array
 * @param lengthX
 * @param lengthY
 * @returns
 */
export default function create(
  lengthX: number,
  lengthY: number
): Array<Array<number>> {
  return new Array(lengthX).fill(0).map(() => new Array(lengthY).fill(0));
}
