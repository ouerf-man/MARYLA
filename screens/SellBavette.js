import React from "react"
import { View, StyleSheet, Dimensions, Text } from "react-native"
import { Icon, Input, Button } from "react-native-elements"
import { createStackNavigator } from "@react-navigation/stack"
import firestore from "@react-native-firebase/firestore"
const Stack = createStackNavigator();

function Sell() {
    return (
        <Stack.Navigator initialRouteName="Cin" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Cin" component={CinEntry} />
            <Stack.Screen name="sell" component={SellForm} />
        </Stack.Navigator>
    )
}

const Header = (props) => {
    return (
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
                        {props.head}
                    </Text>
                </View>
            </View>
        </View>)
}

class SellForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            person:{},
            isLoading:false,
            achat:0,
            id:''
        }
    }
    
    handleSubmit(){
        this.setState({ loading: true })
        if(this.state.achat>this.state.person.count){
            Alert.alert('Limite',"Limite d\'achat déja atteint!")
            return
        }
        let newCount = this.state.person.count - this.state.achat
        let dataAchat = new Date();
        let test = new Date(this.state.person.dateReBuy)
        let dateReAchay
        if(test.getDay()<=dataAchat.getDay())
        dateReAchay = new Date(Date.now() + 21*24*60*60*1000)
        else{
         dateReAchay=this.state.person.dateReBuy
        }
        firestore()
            .collection('persons')
            .doc(this.state.id)
            .update({
                count: newCount,
                dataBuy : dataAchat,
                dateReBuy: dataAchat
            })
            .then(() => this.setState({ loading: false }))
            .catch(err => { Alert.alert('erreur', err.message) })

    }

    componentDidMount(){
        firestore().collection('people')
        .where('cin', '==', this.props.route.params.cin).get()
            .then(snap => {
                if (snap.empty) {
                   return firestore()
                        .collection('people')
                        .add({
                            cin: this.props.route.params.cin,
                            count: 2,
                            dateBuy: '',
                            dateReBuy: ''
                        })
                        .then(document => {
                            this.setState({id:document.id})
                            return document.get()
                        })
                        .then((doc)=>{
                            this.setState({person:doc.date()})
                        })
                }
                this.setState({person:snap._docs[0]._data,id: snap.docs[0].id})
            })
            .catch(err=>Alert.alert('erreur', err.message))
    }

    render() {
        let date = new Date();
        return (
            <>
                <Header head={this.props.route.params.cin}/>
                <View style={styles.sells}>
                    <View style={styles.achat}>
                        <Text style={{fontSize:20}}>
                            Panier 
                        </Text>
                        <Text style={{marginLeft:20,fontSize:26}}>{this.state.person.count}</Text>
                    </View>
                    <View style={styles.achat}>
                        <Text >
                            Achat de jour :
                        </Text>
                        <Input
                            keyboardType='numeric'
                            value={this.state.achat}
                            onChangeText={(achat) => this.setState({achat})}
                        />
                    </View>
                    <View style={styles.achat}>
                        <Text style={{fontSize:20}}>
                            Date reachat 
                        </Text>
                        <Text style={{marginLeft:20,fontSize:15}}>
                            {
                                this.state.person.count>=1 ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` : this.state.person.dateReBuy
                            }
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Button
                            loading = {this.state.isLoading}
                            buttonStyle={{ width: 180, backgroundColor: '#151616', borderRadius: 10 }}
                            title="confirmer"
                            onPress={() => this.handleSubmit()}
                        />
                    </View>
                </View>
            </>
        )
    }
}

class CinEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cin: ""
        }
    }

    handleChange(cin) {
        this.setState({ cin })
    }

    handleSubmit() {
        this.props.navigation.navigate("sell",{cin:this.state.cin})
    }

    render() {
        return (
            <>
                <Header head="Espace Pharmacien" />
                <View>
                    <View>
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
                            <Text style={{ fontSize: 20, color: "black" }}>
                                NUMERO DE CIN
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Button
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
    input: {
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 20
    },
    icon: {
        alignItems: "center",
    },
    sells:{
        padding:50,
    },
    achat:{
        marginTop:19,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
});

export default Sell