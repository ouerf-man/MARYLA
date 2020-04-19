import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, Dimensions } from 'react-native';
import { Input, Button } from "react-native-elements"
import auth from "@react-native-firebase/auth"
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            errors: null
        };
    }

    onLogin() {
        const { username, password } = this.state;
        auth()
            .signInWithEmailAndPassword(username+"@email.tn", password)
            .then(() => this.props.navigation.navigate('register'))
            .catch(error => {Alert.alert('erreur', error.message)})

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.inputext}>Login Form</Text>
                <View style={styles.inputs}>
                    <View style={styles.input}>
                        <Input
                            value={this.state.username}
                            onChangeText={(username) => this.setState({ username })}
                            placeholder="patente"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            placeholder="password"
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{ alignItems: "center" }}>
                    <Button
                        buttonStyle={{ width: 180, backgroundColor: '#151616', borderRadius: 10 }}
                        title="Login"
                        onPress={() => this.onLogin()}
                    />
                    <Text style={{ color: "white", marginTop: 20 }}>Or</Text>
                    <Button
                        buttonStyle={{ width: 150, backgroundColor: '#fff', borderRadius: 10, marginTop: 20 }}
                        title="Register"
                        titleStyle={{ color: "#151616" }}
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: "#df3051"
    },
    inputs: {
        width: Dimensions.get("window").width - Dimensions.get("window").width / 5
    },
    input: {
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 10,
    },
    inputext: {
        width: 200,
        height: 44,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'white',
        color: "white",
        marginBottom: 10,
        borderRadius: 10
    },
});