/**
 * Formatea un número a moneda con puntos de miles y coma decimal.
 * Ejemplo: 59698 -> $ 59.698,00
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS', // Cambia a 'USD' si fuera necesario
    minimumFractionDigits: 2,
  });
};