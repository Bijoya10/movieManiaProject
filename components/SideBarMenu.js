import * as React from "react";
import {View, TouchableOpacity,Text, StyleSheet} from "react-native";
import {DrawerItems} from "react-navigation-drawer";
import firebase from "firebase";

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={{margin:"5%",padding:"3%",borderBottomWidth:3}}>
                <Text style={[styles.text, { fontStyle: "italic" }]}>Movie Mania</Text>

                </View>
                
                <View style={{flex:0.8}}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={{flex:0.2}}>
                    <TouchableOpacity
                     style={styles.button}
                     onPress={()=>{
                        this.props.navigation.navigate("SignUpLoginScreen");
                        firebase.auth().signOut();
                     }}>
                        <Text>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

var styles=StyleSheet.create({
    container: {
        backgroundColor: "#F1F1F0",
        flex: 1,
        paddingTop:50
      },
    button: {
        backgroundColor: "#A98AB0",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        marginTop: 10,
        borderWidth: 0.5,
        padding:"5%",
        marginHorizontal:"5%",
        height: 50,
      },
      text: {
        color: "#383940",
        fontSize: 18,
        fontWeight: "bold",
      },
})