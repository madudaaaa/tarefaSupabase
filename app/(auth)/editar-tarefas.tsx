import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { supabase } from '../../supabaseClient/supabaseClient';

export default function EditarTarefa() {
  const { id, titulo: tituloParam } = useLocalSearchParams<{ id: string; titulo: string }>();
  const [titulo, setTitulo] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (tituloParam) setTitulo(tituloParam);
  }, [tituloParam]);

  const handleAtualizar = async () => {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Digite um título para a tarefa');
      return;
    }

    try {
      const { error } = await supabase
        .from('tarefas')
        .update({ titulo: titulo.trim() })
        .eq('id', id);

      if (error) throw error;

      Alert.alert('Sucesso', 'Tarefa atualizada!');
      router.back();
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Editar título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <Button title="Salvar alterações" onPress={handleAtualizar} />
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
