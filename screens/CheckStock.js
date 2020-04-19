import React from "react"
import { Icon, Button } from "react-native-elements"
import { View, StyleSheet, Dimensions, Text, Picker, Alert } from "react-native"
import firestore from "@react-native-firebase/firestore"

class CheckStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: "Bavette",
            gov: "",
            ville: "",
            error: null,
            villesDispo: [],
            phar: [],
            cbn: false,
            loading: false
        }
    }

    govChanged(val, i) {
        this.setState({ gov: val })
        const villes = [
            'krib', "gaafour", "bargou", "siliana"
        ]
        this.setState({ villesDispo: villes, ville: villes[0] })
    }

    handleSubmit() {
        let phar = []
        this.setState({ phar, cbn: false, error: null, loading: true })
        if (!this.state.ville) {
            this.setState({ error: "Merci d'avoir choisir une ville", loading: false })
            return
        }
        if (this.state.produit != "Bavette" && this.state.produit != "Gel") {
            this.setState({ error: "Merci d'avoir choisir un Produit", loading: false })
            return
        }
        firestore().collection('pharmacies')
            .where('gov', '==', this.state.gov)
            .where('ville', "==", this.state.ville)
            .get()
            .then(snap => {
                this.setState({ error: null, villesDispo: [], gov: "", loading: false })
                if (snap.empty) {
                    Alert.alert('Pas de données', "Les pharmaciens de votre ville no sont pas inscrits")
                    return
                }
                snap.forEach(element => {
                    if (this.state.produit == "Bavette") {
                        if (element.data().bavette) phar.push(element.data())

                    } else {
                        if (element.data().gel) phar.push(element.data())
                    }
                });
                this.setState({ phar, cbn: true })
            })
    }
    render() {
        const { cin, count, dateBuy, dateReBuy } = this.props.route.params
        return (
            <>
                <View style={styles.header}>
                    <View style={styles.container}>
                        <View>
                            <Icon
                                raised
                                type="font-awesome"
                                name="user"
                                size={40}
                            />
                        </View>
                        <View style={styles.client}>
                            <Text style={styles.clientText}>
                                Espace client
                           </Text>
                            <Text style={{ fontSize: 15, color: "white", marginTop: 10 }}>
                                CIN : {cin}
                            </Text>
                            <Text style={{ fontSize: 15, color: "white", marginTop: 10 }}>
                                vous pouvez encore acheter : {count}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.pickers}>
                    <Picker style={styles.picker} selectedValue={this.state.produit} onValueChange={(val) => { this.setState({ produit: val, cbn: false }) }}>
                        <Picker.Item label="Bavette" value="Bavette" />
                        <Picker.Item label="Gel" value="Gel" />
                    </Picker>
                    <Picker style={styles.picker} selectedValue={this.state.gov} onValueChange={(val, i) => this.govChanged(val, i)}>
                        <Picker.Item label={"gov"} />
                        {govs.map((el, i) => <Picker.Item label={el} key={i} value={el} />)}

                    </Picker>
                    <Picker style={styles.picker} selectedValue={this.state.ville} onValueChange={(val, i) => this.setState({ ville: val })}>
                        {this.state.villesDispo.map((el, i) => <Picker.Item label={el} key={i} value={el} />)}
                    </Picker>
                </View>
                <View>
                    {
                        this.state.phar.length ?
                            this.state.phar.map((el) => {
                                return (
                                    <View style={styles.info}>
                                        <Text style={{ fontSize: 19, marginTop: 5 }}>
                                            Mr {el.name} possède des {this.state.produit}
                                        </Text>
                                        <Text style={{ fontSize: 19, marginTop: 5 }}>
                                            Adresse : {el.adresse}
                                        </Text>
                                    </View>
                                )
                            }) :
                            this.state.cbn ? <Text>Pas de {this.state.produit}</Text> : <Text></Text>
                    }

                </View>
                <View style={{ alignItems: "center", marginTop: height / 5 }}>
                    <Button
                        loading={this.state.loading}
                        buttonStyle={{ width: 180, backgroundColor: '#151616', borderRadius: 10 }}
                        title="Chercher"
                        onPress={() => this.handleSubmit()}
                    />
                </View>
                <View style={{ marginTop: 40, alignItems: "center" }}>
                    <Text style={styles.error}>{this.state.error}</Text>
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
        fontSize: 30
    },
    container: {
        flexDirection: "row",
        paddingLeft: width / 10
    },
    pickers: {
        marginTop: height / 8,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    picker: {
        width: (width / 3) - 15
    },
    error: {
        color: "red",
        fontSize: 19
    },
    info: {
        marginTop: 10,
        paddingLeft: 20
    }
})

export default CheckStock

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
