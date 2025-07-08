import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { supabase } from '../../supabaseClient';

import Item from '../../components/Itens';
import BtnAdd from '../../components/AddButton';
import LoggedUser from '../../components/LoggedUser';

interface Tarefa {
  id: string;
  titulo: string;
}

const Page = () => {
  const [userEmail, setUserEmail] = useState<string>('Convidado');
  const [userId, setUserId] = useState<string | null>(null);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return;
      }
      if (data.user) {
        setUserId(data.user.id);
        setUserEmail(data.user.email || 'Convidado');
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchTarefas = async () => {
      const { data, error } = await supabase
        .from('tarefas')
        .select('id, titulo')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar tarefas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as tarefas');
        return;
      }

      setTarefas(data || []);
    };

    fetchTarefas();
  }, [userId]);

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tarefas').delete().eq('id', id);
      if (error) throw error;
      setTarefas(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível excluir a tarefa');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Erro', 'Não foi possível sair');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <LoggedUser email={userEmail} onLogout={handleLogout} />

      <Item
        data={tarefas}
        onDelete={handleDeleteTask}
        onEdit={(id, titulo) => router.push({ pathname: '(auth)/editar-tarefa', params: { id, titulo } })}
      />

      <BtnAdd onPress={() => router.push('/(auth)/nova-tarefa')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 22 },
});

export default Page;
