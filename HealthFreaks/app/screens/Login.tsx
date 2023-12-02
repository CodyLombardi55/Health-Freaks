import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, ActivityIndicator, ImageBackground, Platform, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { NavigationProp, Router } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';

/* Needed to properly load our custom font */
const customFonts = {
  'hitMePunk': require('../../assets/fonts/hitMePunk.ttf'),
  'streetSoul': require('../../assets/fonts/streetSoul.ttf')
}
export async function loadCustomFonts() {
  await Font.loadAsync(customFonts);
}

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('');         //email text entry current state
  const [password, SetPassword] = useState('');   //password text entry current state
  const [loading, setLoading] = useState(false);  //loading state
  const [hidePassword, setHidePassword] = useState(true); //password entry visibility state
  const auth = FIREBASE_AUTH;
  const [loaded, setLoaded] = useState(false); // Load custom fonts using useFonts
  const [passwordResetVisible, setPasswordResetVisible] = useState(false);

  async function loadFonts() {
    await Font.loadAsync(customFonts);
    setLoaded(true);
  }

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('Home');
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

  const resetPassword = async () => {
    try {
      const response = await sendPasswordResetEmail(auth, email);
      alert('Password reset link has been sent!');
      setPasswordResetVisible(false);
    } catch (error) {
      console.log(error);
      alert('Password reset failed: ' + error.message);
    }
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (loaded) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.image}>
          <KeyboardAvoidingView behavior='padding' style={{ marginHorizontal: 20 }}>
            <Text style={styles.title}>Health Freaks</Text>
            <TextInput keyboardType="email-address" value={email} style={styles.inputField} placeholder="Email" placeholderTextColor='#999' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
            <View style={[styles.inputField, { padding: 0 }]}>
              <TextInput secureTextEntry={hidePassword} keyboardType="ascii-capable" value={password} style={styles.inputToggle} placeholder="Password" placeholderTextColor='#999' autoCapitalize='none' onChangeText={(text) => SetPassword(text)}></TextInput>
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
                  <TouchableOpacity style={styles.loginButtons} onPress={() => { setPasswordResetVisible(true) }}>
                    <Text style={styles.customButtonText}>FORGOT PASSWORD</Text>
                  </TouchableOpacity>
                </View>
              </>}
            <Modal
              visible={passwordResetVisible}
              onRequestClose={() => { setPasswordResetVisible(false) }}
              animationType='slide'
            >
              <View style={styles.container}>
                <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.image}>
                  <View style={{ padding: 20 }}>
                    <Text style={styles.title}>Enter your email:</Text>
                    <TextInput keyboardType="email-address" value={email} style={styles.inputField} placeholder="Email" placeholderTextColor='#999' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
                    <View style={{ marginTop: 32, flexDirection: 'column', rowGap: 10 }}>
                      <TouchableOpacity style={styles.loginButtons} onPress={resetPassword}>
                        <Text style={styles.customButtonText}>SEND RESET LINK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.loginButtons} onPress={() => { setPasswordResetVisible(false) }}>
                        <Text style={styles.customButtonText}>CANCEL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </Modal>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'white',
    shadowColor: 'rgba(255, 255, 255, 0.9)',
    shadowOffset: { width: 10, height: 0 },
    shadowRadius: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    width: '100%',
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
    alignSelf: 'center'
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
    borderRadius: 40,
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