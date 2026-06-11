import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [materiais, setMateriais] = useState([]);

  useEffect(() => {
    fetchMateriais();
  }, []);

  const fetchMateriais = async () => {
    setMateriais([]);
  };

  const handleQuantidadeChange = (value) => {
    setQuantidade(value.replace(/[^0-9]/g, ''));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nome}</Text>
      <Text style={styles.itemQuantity}>{item.quantidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do material"
        value={nome}
        onChangeText={setNome}
        testID="input-nome"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={handleQuantidadeChange}
        keyboardType="numeric"
        testID="input-quantidade"
      />
      <TouchableOpacity style={styles.button} testID="btn-cadastrar">
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        testID="lista-materiais"
        data={materiais}
        keyExtractor={(item) => item.id?.toString() || String(item.nome)}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum material cadastrado no momento.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
