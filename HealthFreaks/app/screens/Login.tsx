import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';

const Login = () => {
    const [email, setEmail] = useState('');         //email text entry current state
    const [password, SetPassword] = useState('');   //password text entry current state
    const [loading, setLoading] = useState(false);  //loading state
    const [hidePassword, setHidePassword] = useState(true); //password entry visibility state
    const auth = FIREBASE_AUTH;


    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            alert('Check your emails!');
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <Text style={styles.title}>Health Freaks</Text>
                <TextInput value={email} style={styles.input} placeholder="Email" placeholderTextColor='#999' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
                <View style={[styles.input, styles.passwordInput]}>
                    <TextInput secureTextEntry={hidePassword} value={password} style={{ flex: 1, paddingLeft: 10 }} placeholder="Password" placeholderTextColor='#999' autoCapitalize='none' onChangeText={(text) => SetPassword(text)}></TextInput>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={32} style={{ alignSelf: 'center', padding: 4 }} onPress={() => { setHidePassword(!hidePassword) }} />
                </View>
                {loading ? <ActivityIndicator size="large" color="#0000ff" />
                    : <>
                        <View style={{marginTop:32}}>
                            <Button title="Login" onPress={signIn} />
                        </View>
                        <View style={{marginTop:8}}>
                            <Button title="Create Account" onPress={signUp} />
                        </View>
                    </>}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    passwordInput: {
        flexDirection: 'row',
        padding: 0,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 32,
    }
});

