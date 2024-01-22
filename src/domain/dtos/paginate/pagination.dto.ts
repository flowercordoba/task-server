/**
 * PaginationDto es una clase que encapsula y valida la información de paginación.
 */
export class PaginationDto {
  /**
   * Constructor privado para crear una instancia de PaginationDto.
   *
   * @param page - El número de página actual.
   * @param limit - La cantidad máxima de elementos por página.
   */
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  /**
   * Método estático para crear una instancia de PaginationDto.
   *
   * Realiza la validación de los parámetros 'page' y 'limit'.
   *
   * @param page - El número de página (por defecto es 1).
   * @param limit - El límite de elementos por página (por defecto es 10).
   * @returns Un array que contiene un mensaje de error (si lo hay) y una instancia de PaginationDto.
   */
  static create(page: number = 1, limit: number = 10): [string?, PaginationDto?] {
    // Valida que 'page' y 'limit' sean números
    if (isNaN(page) || isNaN(limit)) {
      return ['Page and Limit must be numbers'];
    }

    // Valida que 'page' y 'limit' sean mayores que 0
    if (page <= 0) {
      return ['Page must be greater than 0'];
    }
    if (limit <= 0) {
      return ['Limit must be greater than 0'];
    }

    // Si pasa todas las validaciones, crea y devuelve una nueva instancia de PaginationDto
    return [undefined, new PaginationDto(page, limit)];
  }
}
