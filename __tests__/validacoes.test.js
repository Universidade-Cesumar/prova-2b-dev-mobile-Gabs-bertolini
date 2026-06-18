const { validarRetirada } = require('../src/utils/validacoes');

describe('validarRetirada', () => {
  test('retornar false para quantidade zero', () => {
    expect(validarRetirada(10, 0)).toBe(false);
  });

  test('retornar false para quantidade negativa', () => {
    expect(validarRetirada(10, -5)).toBe(false);
  });

  test('retornar false para quantidade maior que o saldo atual', () => {
    expect(validarRetirada(5, 10)).toBe(false);
  });

  test('retornar true para quantidade menor que o saldo', () => {
    expect(validarRetirada(10, 5)).toBe(true);
  });

  test('retornar true para quantidade igual ao saldo', () => {
    expect(validarRetirada(10, 10)).toBe(true);
  });
});
