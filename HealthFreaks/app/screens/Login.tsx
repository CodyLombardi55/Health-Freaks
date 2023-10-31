import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, ActivityIndicator, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

/* Needed to properly load our custom font */
const customFonts = {
  'hitMePunk': require('../../assets/fonts/hitMePunk.ttf')
}

const Login = () => {
    const [email, setEmail] = useState('');         //email text entry current state
    const [password, SetPassword] = useState('');   //password text entry current state
    const [loading, setLoading] = useState(false);  //loading state
    const [hidePassword, setHidePassword] = useState(true); //password entry visibility state
    const auth = FIREBASE_AUTH;
    const [loaded] = useFonts(customFonts); // Load custom fonts using useFonts

    async function loadFonts(){
      await Font.loadAsync(customFonts);
    }

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
            <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.image}>
                <KeyboardAvoidingView behavior='padding' style={{ marginHorizontal: 20 }}>
                    <Text style={styles.title}>Health Freaks</Text>
                    <TextInput value={email} style={styles.inputField} placeholder="Email" placeholderTextColor='#999' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
                    <View style={[styles.inputField, { padding: 0 }]}>
                        <TextInput secureTextEntry={hidePassword} value={password} style={styles.inputToggle} placeholder="Password" placeholderTextColor='#999' autoCapitalize='none' onChangeText={(text) => SetPassword(text)}></TextInput>
                        <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={32} color="white" style={{ alignSelf: 'center', padding: 10 }} onPress={() => { setHidePassword(!hidePassword) }} />
                    </View>
                    {loading ? <ActivityIndicator size="large" color="#0000ff" />
                        : <>
                            <View style={{ marginTop: 32, flexDirection: 'column', rowGap: 10 }}>
                              <TouchableOpacity style={styles.loginButtons} onPress={signIn}>
                                <Text style={styles.customButtonText}>LOGIN</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.loginButtons} onPress={signUp}>
                                <Text style={styles.customButtonText}>SIGN UP</Text>
                              </TouchableOpacity>
                            </View>
                        </>}
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: 'rgba(255, 255, 255, 0.9)',
    shadowOffset: { width: 10, height: 0 },
    shadowRadius: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    width: '80%',
    marginHorizontal: 'auto',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'white',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.69)',
    color: 'violet',
    flexDirection: 'row',
    fontSize: 20,
    shadowColor: 'violet',
    shadowOffset: { width: 0, height: 0 }, 
    shadowRadius: 20, 
  },
  inputToggle: {
    fontSize: 20,
    flex: 1,
    padding: 10,
    paddingRight: 13,
    borderRadius: 4,
    borderColor: 'white',
    color: 'violet',
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 32,
    color: 'deeppink',
    fontFamily: Platform.OS === 'ios' ? 'hitMePunk' : 'hitMePunk',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButtons: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    padding: 10,
    shadowColor: 'seagreen',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 4,
    backgroundColor: 'rgba(0, 0, 0, .69)',
    
  },
  customButtonText: {
    color: 'lightgreen',
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: 18,
  },
});

