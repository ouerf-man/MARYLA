import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, Dimensions, ScrollView, Picker } from 'react-native';
import { Input, Button } from "react-native-elements"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            name: "",
            gov: "Ariana",
            ville: "",
            adresse: "",
            err:null,
            isLoading:false
        };
    }

    submit() {
        this.setState({isLoading:true})
        const { username, password, name, gov, ville, adresse } = this.state;
        auth()
            .createUserWithEmailAndPassword(username+"@email.tn", password)
            .then(() => {
                return firestore()
                    .collection('pharmacies')
                    .add({
                        username: username,
                        name: name,
                        gov: gov,
                        ville: ville,
                        adresse: adresse,
                        createdAt: new Date(),
                        bavette:false,
                        gel:false
                    })

            })
            .then(()=>{
                this.props.navigation.navigation('login')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                   this.setState({err:"patente déja inscrit"})
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
            });
        Alert.alert('Credentials', `${username} + ${password}`);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.inputext}>Register Form</Text>
                    <View style={styles.inputs}>
                        <View style={styles.input}>
                            <Input
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })}
                                placeholder="Nom et prénom"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                value={this.state.username}
                                onChangeText={(username) => this.setState({ username })}
                                placeholder="patente"
                                style={styles.input}
                            />
                        </View>
                        <Picker style={styles.picker} selectedValue={this.state.gov} onValueChange={(gov, i) => this.setState({ gov })}>
                            <Picker.Item label={"gov"} />
                            {govs.map((el, i) => <Picker.Item label={el} key={i} value={el} />)}

                        </Picker>
                        <View style={styles.input}>
                            <Input
                                value={this.state.ville}
                                onChangeText={(ville) => this.setState({ ville })}
                                placeholder="ville"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                value={this.state.adresse}
                                onChangeText={(adresse) => this.setState({ adresse })}
                                placeholder="adresse"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password })}
                                placeholder="mot de passe"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <Text style={{color:"white"}}>{this.state.err}</Text>
                    <View style={{ alignItems: "center" }}>
                        <Button
                            buttonStyle={{ width: 180, backgroundColor: '#151616', borderRadius: 10 }}
                            title="Register"
                            loading={this.state.isLoading}
                            onPress={() => this.submit()}
                        />

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: "#df3051",
        height: Dimensions.get('window').height
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

const govs = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Le Kef",
    "Mahdia",
    "La Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid	",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan"
]