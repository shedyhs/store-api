export abstract class BaseRepository {
  camelToSnake(fieldName: string) {
    return fieldName.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
  }
}
