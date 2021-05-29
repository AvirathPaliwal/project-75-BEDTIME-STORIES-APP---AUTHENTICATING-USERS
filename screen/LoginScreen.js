import React from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet,Image } from 'react-native'
import firebase from 'firebase/app'
export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            passWord: ''

        }

    }
    login = async (email, password) => {

        if (email && password) {

            try {
                const respones = await firebase.auth().signInWithEmailAndPassword(email, password)
                if (respones) {
                    this.props.navigation.navigate('WriteStoryScreen')
                }
            }
            catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('User does not exists');
                        break;
                    case 'auth/invalid-email':
                        alert('Incorrect email or passsword');
                        break;
                }

            }
        }
        else {
            alert('Please enter email or Password')

        }


    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                  <Image style={{ width: 400, height: 400 }}
                   source={require('../assets/bedtime.jpg')}
                  />
                   <Text style={{textAlign:'center',fontSize:30,fontFamily:"Comic Sans MS"}}>BEDTIME STORY</Text>
                </View>
                <View>
                     
                    <TextInput
                        placeholder='enter your email'
                        keyboardType='email-address'
                        onChangeText={(email) => {
                            this.setState({
                                emailId: email,
                            })
                        }}
                        style={styles.inputBox}
                    />
                    <TextInput
                        placeholder='enter your Password'
                        secureTextEntry={true}
                        onChangeText={(pass) => {
                            this.setState({
                                passWord: pass
                            })
                        }}
                        style={styles.inputBox}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.Login}
                        onPress={() => {
                            this.login(this.state.emailId, this.state.passWord);
                        }}>
                        <Text style={styles.LoginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Login:{
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#eaeaea',
        width: 150,
        height: 30,
        borderRadius : 15,
        borderWidth : 2
    },
    LoginText:{
        textAlign: 'center',
        color: '#ff2e63',
        fontWeight: 'bold',
        fontFamily : 'Comic Sans MS'
    },
    inputBox:{
        height: 50,
      borderWidth: 2,
      margin: 10,
      fontFamily : 'Comic Sans MS',
      borderRadius : 15
    }
});
