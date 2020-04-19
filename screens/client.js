import React from 'react';
import { Icon, Input, Button } from "react-native-elements"
import { View, StyleSheet, Text, StatusBar, Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore"
class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cin: "",
            error: null,
            isLoading: false
        }
    }

    handleSubmit() {
        this.setState({ isLoading: true })
        let regex = RegExp('^[0-9]{8}$')
        if (!regex.test(this.state.cin)) {
            Alert.alert('erreur', "cin invalide")
            this.setState({isLoading:false})
            return
        }
        firestore().collection('people')
        .where('cin', '==', this.state.cin).get()
            .then(snap => {
                if (snap.empty) {
                   return firestore()
                        .collection('people')
                        .add({
                            cin: this.state.cin,
                            count: 2,
                            dateBuy: '',
                            dateReBuy: ''
                        })
                        .then(document => {
                            this.props.navigation.navigate('stock', document)
                        })
                }
                this.props.navigation.navigate('stock',snap._docs[0]._data)
            })
            .then(()=> this.setState({isLoading:false}))
            .catch(err=>Alert.alert('erreur', err.message))
        //this.props.navigation.navigate('stock')
    }
    handleChange(val) {
        this.setState({ cin: val })
    }
    render() {
        return (
            <>
                <StatusBar barStyle="light-content" />
                <View style={styles.bg}>
                    <View>
                        <View style={styles.icon}>
                            <Icon
                                raised
                                type="font-awesome"
                                name="user"
                                size={34}
                                color="black"
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='cin'
                                keyboardType="numeric"
                                value={this.state.cin}
                                onChangeText={(val) => this.handleChange(val)}
                                leftIcon={
                                    <Icon
                                        type="font-awesome"
                                        name='user'
                                        size={24}
                                        color='black'
                                    />
                                }
                            />
                        </View>
                        <View style={styles.icon}>
                            <Text style={{ fontSize: 20, color: "white" }}>
                                NUMERO DE CIN
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button
                            loading={this.state.isLoading}
                            buttonStyle={{ width: 180, backgroundColor: '#151616', borderRadius: 10 }}
                            title="Continuer"
                            onPress={() => this.handleSubmit()}
                        />
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: "#df3051",
        paddingLeft: 40,
        paddingRight: 40
    },
    input: {
        backgroundColor: "white",
        color: "white",
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 20
    },
    icon: {
        alignItems: "center",
    },
})

export default Client