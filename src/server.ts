const date = 'new Date(2022, 6, 1).getTime()';

const checkType = <T>(
  value: unknown,
  classType: { new (...args: any[]): T },
): boolean => {
  if (typeof value === 'object') {
    return (
      Object.prototype.toString.call(value) === `[object ${classType.name}]`
    );
  }
  return typeof value === classType.name.toLowerCase();
};
console.log(checkType(date, String));

const sortArray = <T>(array: T[], field: keyof T, isAscending = true): T[] => {
  return array.sort((a, b) => {
    if (a[field] < b[field]) {
      return isAscending ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });
};

sortArray();
