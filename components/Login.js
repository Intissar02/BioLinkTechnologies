//Login
import { KeyboardAvoidingView,ToastAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            ToastAndroid.show('You have been successfully logged!', ToastAndroid.SHORT);
            console.log(response);
        }
        catch(error){
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.Allcontainer} >
            <Image style={{ width: 80, height: 80 }} source={require("../assets/user.png")} />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput value={email} onChangeText={text => setEmail(text)} placeholder='Email' style={styles.input} />
                    <TextInput value={password} onChangeText={text => setPassword(text)} placeholder='Password' secureTextEntry style={styles.input} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={signIn} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Register')}} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonTextOutline}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    Allcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    container: {
        display: "flex",
        width: "100%",
        alignItems: 'center'
    },
    inputContainer: {
        width: "80%",
        display: "flex",
        gap: 12,
        marginBottom: 20
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 10
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
    button: {
        backgroundColor: '#2dbfc5',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 50
    },
    buttonOutline: {
        backgroundColor: "white",
        borderColor: "#2dbfc5",
        borderWidth: 1,
    },
    buttonTextOutline: {
        color: "#2dbfc5",
        fontWeight: "bold"
    }
})