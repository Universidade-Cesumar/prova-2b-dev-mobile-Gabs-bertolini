export function validarRetirada(estoqueAtual, quantidade) {
  if (quantidade <= 0) return false;
  if (quantidade > estoqueAtual) return false;
  return true;
}