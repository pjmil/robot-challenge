/**
 * Find the index of an ID within a multidimensional array
 * @param id
 */
export default function findById(
  id: number,
  arr: Array<Array<number>>
): Array<number> {
  for (var i = 0; i < arr.length; i++) {
    var j = arr[i].indexOf(id);
    if (j > -1) {
      return [i, j];
    }
  }

  return [];
}
