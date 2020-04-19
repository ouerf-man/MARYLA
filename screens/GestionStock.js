import React from "react"
import { View, Switch, StyleSheet, Dimensions, Text, Alert } from "react-native"
import { Icon, Button } from "react-native-elements"
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';

class GestionStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bavette: false,
            gel: false,
            user: "",
            id: "",
            loading: false
        }
    }

    handleChange(cin) {
        this.setState({ cin })
    }

    handleSubmit() {
        this.setState({ loading: true })
        firestore()
            .collection('pharmacies')
            .doc(this.state.id)
            .update({
                bavette: this.state.bavette,
                gel: this.state.gel
            })
            .then(() => this.setState({ loading: false }))
            .catch(err => { Alert.alert('erreur', err.message) })
    }

    async componentDidMount() {
        let patente = auth().currentUser.email.split('@')[0]
        firestore()
            .collection('pharmacies')
            .where('username', "==", patente
            )
            .limit(1)
            .onSnapshot(querySnapshot => {
                this.setState({
                    user: querySnapshot.docs[0]._data.name,
                    id: querySnapshot.docs[0].ref._documentPath._parts[1],
                    bavette: querySnapshot.docs[0]._data.bavette,
                    gel: querySnapshot.docs[0]._data.gel,
                })
            })
    }

    render() {
        return (
            <>
                <View style={styles.header}>
                    <View style={styles.container}>
                        <View>
                            <Icon
                                raised
                                type="font-awesome"
                                name="medkit"
                                size={40}
                            />
                        </View>
                        <View style={styles.client}>
                            <Text style={styles.clientText}>
                                Salut Mr, {this.state.user}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 50 }}>
                        <Text style={{ color: "black", fontSize: 20 }}>
                            Bavette disponible :
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#df3051" }}
                            thumbColor={this.state.bavette ? "#df3051" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.setState({ bavette: !this.state.bavette })}
                            value={this.state.bavette}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 50 }}>
                        <Text style={{ color: "black", fontSize: 20 }}>
                            Gel disponible :
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#df3051" }}
                            thumbColor={this.state.gel ? "#df3051" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.setState({ gel: !this.state.gel })}
                            value={this.state.gel}
                        />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 50 }}>
                        <Button
                            loading={this.state.loading}
                            buttonStyle={{ width: 180, backgroundColor: '#151616', borderRadius: 10 }}
                            title="Confimer"
                            onPress={() => this.handleSubmit()}
                        />
                    </View>
                </View>
            </>
        )
    }
}

const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
    header: {
        height: parseInt(height / 3),
        backgroundColor: '#df3051',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: "center"
    },
    client: {
        marginLeft: 20,
        justifyContent: "center"
    },
    clientText: {
        borderBottomWidth: 1,
        borderBottomColor: "white",
        color: "white",
        paddingBottom: 5,
        fontSize: 20
    },
    container: {
        flexDirection: "row",
        paddingLeft: width / 10
    },
    input: {
        marginTop: 50,
        marginBottom: 30,
    },
    icon: {
        alignItems: "center",
    },
});

export default GestionStock