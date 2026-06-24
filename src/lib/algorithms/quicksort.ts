export type SortOrder = 'asc' | 'desc';

export function quickSort<T>(items: T[], compare: (left: T, right: T) => number): T[] {
  if (items.length <= 1) return items;

  const [pivot, ...rest] = items;
  const lower: T[] = [];
  const higher: T[] = [];

  rest.forEach((item) => {
    if (compare(item, pivot) < 0) {
      lower.push(item);
    } else {
      higher.push(item);
    }
  });

  return [...quickSort(lower, compare), pivot, ...quickSort(higher, compare)];
}

export function withOrder<T>(compare: (left: T, right: T) => number, order: SortOrder) {
  return order === 'asc' ? compare : (left: T, right: T) => compare(right, left);
}
