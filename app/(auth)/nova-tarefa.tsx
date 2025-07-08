import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { supabase } from '../../supabaseClient';

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }
      setUserId(data.user.id);
    };

    getUser();
  }, []);

  const handleAdicionar = async () => {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Digite um título para a tarefa');
      return;
    }

    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    try {
      const { error } = await supabase.from('tarefas').insert({
        titulo: titulo.trim(),
        user_id: userId,
      });

      if (error) throw error;

      Alert.alert('Sucesso', 'Tarefa adicionada!');
      router.back();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a tarefa');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <Button title="Adicionar Tarefa" onPress={handleAdicionar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
