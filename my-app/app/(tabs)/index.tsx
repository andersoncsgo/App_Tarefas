import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const APP_ID = 'HNo744q2bYTh4x00CKzKe26uaXqEOhTbB1dCNiiT';
const REST_API_KEY = '1fyFupP8SsnTWbM9cch9pWWxVNBxp5xL4N3UMbUI';
const URL = 'https://parseapi.back4app.com/classes/exercicio';

export default function HomeScreen() {
  const [descricao, setDescricao] = useState('');
  const [tarefas, setTarefas] = useState([]);

  const headers = {
    'X-Parse-Application-Id': APP_ID,
    'X-Parse-REST-API-Key': REST_API_KEY,
    'Content-Type': 'application/json',
  };

  const buscarTarefas = async () => {
    try {
      const response = await fetch(URL, { headers });
      const text = await response.text(); 
      console.log('Resposta bruta:', text);

      const json = JSON.parse(text);
      setTarefas(json.results);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const adicionarTarefa = async () => {
    if (!descricao.trim()) return;

    const novaTarefa = {
      descricao,
      concluida: false,
    };

    try {
      await fetch(URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(novaTarefa),
      });

      setDescricao('');
      buscarTarefas();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tarefas Elegantes</Text>

      <TextInput
        style={styles.input}
        placeholder="Nova Tarefa"
        value={descricao}
        onChangeText={setDescricao}
        placeholderTextColor="#8D8D8D"
      />

      <TouchableOpacity style={styles.button} onPress={adicionarTarefa}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.objectId}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.tarefa}>• {item.descricao}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E', 
  },
  title: {
    fontSize: 36,
    fontWeight: '900', 
    color: '#F2F2F2', 
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'Georgia', 
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#5D5D5D', 
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 30,
    fontSize: 18,
    backgroundColor: '#2C2C2C',
    color: '#F2F2F2', 
    fontFamily: 'Arial',
  },
  button: {
    backgroundColor: '#D4AF37', 
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700', 
    fontFamily: 'Arial',
  },
  list: {
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#333333', 
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tarefa: {
    fontSize: 18,
    color: '#F2F2F2', 
    fontFamily: 'Arial',
  },
});
