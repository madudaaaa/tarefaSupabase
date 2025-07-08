import { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import { supabase } from '../supabaseClient/supabaseClient.js';

 
export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
 
    const signUp = async () => {
        setLoading(true);
                const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(error.message);
        } else {
            console.log('Usuário criado', data.user);
        }
        setLoading(false);
    };
 
    const signIn = async () => {
        setLoading(true);
                const { data, error } = await supabase.auth.signInWithPassword({
            email, password,
        });
        if (error) alert(error.message);
        setLoading(false);
    }
        
 
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Senha"
                />
                {loading ? (
                    <ActivityIndicator size={'small'} style={{ margin: 28 }} />
                ) : (
                    <>
                        <Button onPress={signIn} title="Login"/>
                        <Button onPress={signUp} title="Criar Conta"/>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});