import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import { API_BASE_URL } from './constants/api';
const validacoes = require('./src/utils/validacoes');

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetchMateriais();
  }, []);

  const fetchMateriais = async () => {
    setCarregando(true);
    try {
      const response = await fetch(`${API_BASE_URL}/materiais`);
      const data = await response.json();
      setMateriais(data);
    } catch (error) {
      Alert.alert('Erro de conexão', 'Não foi possível carregar os materiais. Verifique sua conexão e tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const sanitizeNumero = (value) => value.replace(/[^0-9]/g, '');

  const isLowStock = (quantidade) => Number(quantidade) < 10;

  const handleQuantidadeChange = (value) => {
    setQuantidade(sanitizeNumero(value));
  };

  const handleCadastrar = async () => {
    const quantidadeNumero = parseInt(quantidade, 10);
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do material.');
      return;
    }
    if (Number.isNaN(quantidadeNumero) || quantidadeNumero <= 0) {
      Alert.alert('Atenção', 'A quantidade deve ser um número maior que zero.');
      return;
    }

    setSalvando(true);
    try {
      await fetch(`${API_BASE_URL}/materiais`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), quantidade: quantidadeNumero }),
      });
      setNome('');
      setQuantidade('');
      Keyboard.dismiss();
      await fetchMateriais();
    } catch (error) {
      Alert.alert('Erro de conexão', 'Não foi possível cadastrar o material. Verifique sua conexão e tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  const handleAtualizarItem = (itemAtualizado) => {
    setMateriais((prevMateriais) =>
      prevMateriais.map((item) =>
        item.id === itemAtualizado.id ? itemAtualizado : item
      )
    );
  };

  const handleRemoverItem = (id) => {
    setMateriais((prevMateriais) => prevMateriais.filter((item) => item.id !== id));
  };

  const buscaNormalizada = busca.toLowerCase();

  const materiaisFiltrados = materiais.filter((item) =>
    item.nome?.toLowerCase().includes(buscaNormalizada)
  );

  const Item = ({ item }) => {
    const [retirada, setRetirada] = useState('');
    const itemIsLowStock = isLowStock(item.quantidade);

    const handleBaixar = async () => {
      const quantidadeRetirada = parseInt(retirada, 10);
      if (Number.isNaN(quantidadeRetirada) || !validacoes.validarRetirada(item.quantidade, quantidadeRetirada)) {
        Alert.alert('Atenção', 'Retirada inválida — verifique a quantidade.');
        return;
      }

      const novoSaldo = item.quantidade - quantidadeRetirada;
      try {
        const response = await fetch(`${API_BASE_URL}/materiais/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, quantidade: novoSaldo }),
        });
        const data = await response.json();
        handleAtualizarItem(data);
        setRetirada('');
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert('Erro de conexão', 'Não foi possível atualizar o material. Verifique sua conexão e tente novamente.');
      }
    };

    const handleExcluir = async () => {
      try {
        await fetch(`${API_BASE_URL}/materiais/${item.id}`, { method: 'DELETE' });
        handleRemoverItem(item.id);
        setRetirada('');
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert('Erro de conexão', 'Não foi possível excluir o material. Verifique sua conexão e tente novamente.');
      }
    };

    return (
      <View
        style={[styles.itemContainer, itemIsLowStock && styles.criticalContainer]}
        accessibilityLabel={itemIsLowStock ? 'estoque-critico' : undefined}
      >
        <View style={styles.itemInfo}>
          <Text style={styles.itemText}>Produto: {item.nome}</Text>
          <Text style={styles.itemQuantity}>Quantidade: {item.quantidade}</Text>
        </View>
        {itemIsLowStock && (
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <Text style={styles.alertText}>alerta: estoque baixo!</Text>
          </View>
        )}
        <TextInput
          style={[styles.input, styles.retiradaInput]}
          value={retirada}
          onChangeText={(value) => setRetirada(sanitizeNumero(value))}
          keyboardType="numeric"
          placeholder="Qtd"
          testID="input-retirada"
        />
        <TouchableOpacity
          style={[styles.button, styles.itemButton]}
          onPress={handleBaixar}
          testID="btn-baixar"
        >
          <Text style={styles.buttonText}>Baixar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.itemButton, styles.deleteButton]}
          onPress={handleExcluir}
          testID="btn-excluir"
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>

      {/* Formulário de cadastro */}
      <TextInput
        style={styles.input}
        placeholder="Nome do material"
        value={nome}
        onChangeText={setNome}
        testID="input-nome"
        autoCapitalize="sentences"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={handleQuantidadeChange}
        keyboardType="numeric"
        testID="input-quantidade"
        onSubmitEditing={handleCadastrar}
      />
      <TouchableOpacity
        style={[styles.button, salvando && styles.buttonDisabled]}
        onPress={handleCadastrar}
        disabled={salvando}
        testID="btn-cadastrar"
      >
        <Text style={styles.buttonText}>{salvando ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      {/* Campo de busca */}
      <TextInput
        style={styles.input}
        placeholder="Buscar material por nome..."
        value={busca}
        onChangeText={setBusca}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityHint="Digite parte do nome para filtrar a lista em memória"
        testID="input-busca"
      />

      {/* Totalizador */}
      <Text style={styles.totalText} testID="total-itens">
        Total de itens visíveis: {materiaisFiltrados.length}
      </Text>

      {/* Indicador de carregamento */}
      {carregando && (
        <ActivityIndicator style={styles.loading} size="large" color="#007AFF" />
      )}

      {/* Lista de materiais — sempre renderizada */}
      <FlatList
        style={styles.list}
        testID="lista-materials"
        data={materiaisFiltrados}
        keyExtractor={(item, index) => item.id?.toString() || item.nome || `item-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum material cadastrado no momento.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  input: {
    height: 50,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#111827',
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loading: {
    marginTop: 10,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 10,
    textAlign: 'right',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  criticalContainer: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
  },
  alertIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  alertText: {
    color: '#991b1b',
    fontSize: 12,
    fontWeight: '700',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    flexShrink: 1,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  retiradaInput: {
    width: 80,
    height: 40,
    marginBottom: 0,
  },
  itemButton: {
    marginLeft: 8,
    minWidth: 70,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  emptyText: {
    textAlign: 'center',
    color: '#475569',
    marginTop: 20,
    fontSize: 16,
  },
});
