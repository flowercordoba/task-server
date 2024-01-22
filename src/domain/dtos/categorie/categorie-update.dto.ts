/* eslint-disable @typescript-eslint/no-explicit-any */
export class UpdateCategoryDto {
  private constructor(
    public readonly name?: string,
    public readonly available?: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateCategoryDto?] {
    const { name, available } = object;
    const errors = [];

    if (available !== undefined && typeof available !== 'boolean') {
      errors.push('Invalid type for available');
    }

    if (errors.length > 0) {
      return [errors.join(', ')];
    }

    return [undefined, new UpdateCategoryDto(name, available)];
  }
}
