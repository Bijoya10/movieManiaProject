import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, FAB, LinearProgress } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import AppHeader from "../components/Header";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      userName: "",
      age: "",
      location: {},
      hobbies: "",
      docId: "",
      image: "#",
      longitude: "",
      latitude: "",
    };
  }

  getUserData = () => {
    db.collection("users")
      .where("email", "==", this.state.emailId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var user = doc.data();
          this.setState({
            userName: user.firstName + " " + user.lastName,
            age: user.age,
            hobbies: user.hobbies,
            emailId: user.emailId,
            image: user.image,
            longitude: user.longitude,
            latitude: user.latitude,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserData();
  }

  render() {
   if(this.state.userName.length!==0){
    return (
      <View style={styles.container}>
        <AppHeader title="Profile" navigation={this.props.navigation} />
        <View
          style={[
            styles.container,
            { alignItems: "center" },
          ]}
        >
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size="xlarge"
            showEditButton
            containerStyle={styles.imageContainer}
          />
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.text}>Name : {this.state.userName}</Text>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.text}>Age : {this.state.age}</Text>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.text}>Hobby : {this.state.hobbies}</Text>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.text}>
              Location: {this.state.longitude}&deg;N
              {", "}
              {this.state.latitude}&deg;E
            </Text>
          </Card>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("HomeScreen", {
                from: "DisplayScreen",
              });
            }}
          >
            <Icon name="edit" type="antdesign" />
          </TouchableOpacity>
        </View>
      </View>
    );

  } else {
    return <View>
       <AppHeader title="Profile" navigation={this.props.navigation} />
      <LinearProgress color="#A98AB0" /></View>
  }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1F0",
    flex: 1,
  },

  cardStyle: {
    width: "80%",
    backgroundColor: "#ADA9AD",
  },
  button: {
    position: "absolute",
    right: "3%",
    top: "2%",
    backgroundColor: "#A98AB0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 10,
    width: 50,
    height: 50,
  },
  text: {
    color: "#383940",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: "5%",
  },
});
