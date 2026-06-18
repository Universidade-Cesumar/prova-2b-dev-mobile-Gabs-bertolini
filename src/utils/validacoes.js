function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (typeof quantidadeRetirada !== "number" || Number.isNaN(quantidadeRetirada)) return false;
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

module.exports = { validarRetirada };
