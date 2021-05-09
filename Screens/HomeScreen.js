import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Avatar, Header,LinearProgress } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import firebase from "firebase";
import db from "../config";
import * as ImagePicker from "expo-image-picker";
import AppHeader from "../components/Header";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      firstName: "",
      lastName: "",
      age: "",
      longitude: "",
      latitude: "",
      hobbies: "",
      docId: "",
      image: "#",
      validated: false,
      showFirstNameInfo: false,
      showLastNameInfo: false,
      showAgeInfo: false,
      showHobbiesInfo: false,
      from: this.props.navigation.getParam("from"),
    };
    this.requestRef = null;
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.setState({
        image: uri,
      });
      this.uploadImage(uri, this.state.emailId);
    }
  };

  getUserData = async () => {
    this.requestRef = db
      .collection("users")
      .where("email", "==", this.state.emailId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var user = doc.data();
          this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            hobbies: user.hobbies,
            image: user.image,
            docId: doc.id,
          });
        });
      });
  };
  componentDidMount = async () => {
    if (this.state.from == "DisplayScreen") {
      this.getUserData();
    }
    await navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        longitude: position.coords.longitude.toFixed(3).toString(),
        latitude: position.coords.latitude.toFixed(3).toString(),
      });
    });
  };

  componentWillUnmount() {
    this.requestRef;
  }

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);
    return ref.put(blob).then((response) => {
      // this.fetchImage(imageName);
    });
  };

  validate = () => {
    if (
      !this.state.firstName ||
      this.state.firstName.length < 3 ||
      /\d/g.test(this.state.firstName)
    ) {
      this.setState({ showFirstNameInfo: true });
    } else {
      this.setState({ showFirstNameInfo: false });
    }

    if (
      !this.state.lastName ||
      this.state.lastName.length < 3 ||
      /\d/g.test(this.state.lastName)
    ) {
      this.setState({ showLastNameInfo: true });
    } else {
      this.setState({ showLastNameInfo: false });
    }

    if (!this.state.age || !/\d/g.test(this.state.age)) {
      this.setState({ showAgeInfo: true });
    } else {
      this.setState({ showAgeInfo: false });
    }

    if (!this.state.hobbies) {
      this.setState({ showHobbiesInfo: true });
    } else {
      this.setState({ showHobbiesInfo: false });
    }

    if (
      !this.state.showFirstNameInfo &&
      !this.state.showLastNameInfo &&
      !this.state.showAgeInfo &&
      !this.state.showHobbiesInfo
    ) {
      this.setState({ validated: true });
    }
  };

  addUserInfo = async () => {
    db.collection("users").add({
      email: this.state.emailId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      hobbies: this.state.hobbies,
      image: this.state.image,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    });
    ToastAndroid.show("User data added successfully", ToastAndroid.LONG);
  };

  updateUserInfo = async () => {
    db.collection("users").doc(this.state.docId).update({
      email: this.state.emailId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      hobbies: this.state.hobbies,
      image: this.state.image,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    });
    ToastAndroid.show("User data updated successfully", ToastAndroid.LONG);
  };
  render() {
    console.log(this.state.longitude + "," + this.state.latitude);
    if(this.state.from=="DisplayScreen" && !this.state.firstName){
      return <View>
         <Header
          centerComponent={{
            text: "Home",
            style: { color: "#383940", fontSize: 20 },
          }}
          backgroundColor={"#A98AB0"}
        />
        <LinearProgress color="#A98AB0" /></View>
    }
    else{
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header
          centerComponent={{
            text: "Home",
            style: { color: "#383940", fontSize: 20 },
          }}
          backgroundColor={"#A98AB0"}
        />
        <ScrollView
          contentContainerStyle={{ alignItems: "center", width: "100%" }}
        >
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size="xlarge"
            onPress={() => {
              this.selectPicture();
            }}
            showEditButton
            containerStyle={styles.imageContainer}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.tag}>
              <Text style={styles.text}>First Name : </Text>
            </View>
            <TextInput
              placeholder={"First name"}
              style={styles.input}
              value={this.state.firstName}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
          </View>
          {this.state.showFirstNameInfo ? (
            <Text style={styles.warningText}>
              3 alphabets minimum and should not contain numbers
            </Text>
          ) : null}
          <View style={{ flexDirection: "row" }}>
            <View style={styles.tag}>
              <Text style={styles.text}>Last Name : </Text>
            </View>
            <TextInput
              placeholder={"Last name"}
              style={styles.input}
              value={this.state.lastName}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
          </View>
          {this.state.showLastNameInfo ? (
            <Text style={styles.warningText}>
              3 alphabets minimum and should not contain numbers
            </Text>
          ) : null}
          <View style={{ flexDirection: "row" }}>
            <View style={styles.tag}>
              <Text style={styles.text}>Age : </Text>
            </View>
            <TextInput
              placeholder={"age"}
              style={styles.input}
              value={this.state.age}
              onChangeText={(text) => {
                this.setState({
                  age: text,
                });
              }}
            />
          </View>
          {this.state.showAgeInfo ? (
            <Text style={styles.warningText}>Age must be a number</Text>
          ) : null}
          <View style={{ flexDirection: "row" }}>
            <View style={styles.tag}>
              <Text style={styles.text}>Location : </Text>
            </View>
            <View style={styles.input}>
              <Text>
                {this.state.longitude}&deg;N
                {", "}
                {this.state.latitude}&deg;E
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.tag}>
              <Text style={styles.text}> Hobby : </Text>
            </View>
          <Picker
            mode="dropdown"
            selectedValue={this.state.hobbies}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ hobbies: itemValue })
            }
          >
            <Picker.Item label="Reading" value="Reading" />
            <Picker.Item label="Writing" value="Writing" />
            <Picker.Item label="Sports" value="sports" />
            <Picker.Item label="Gardening" value="Gardening" />
            <Picker.Item label="Cooking" value="Cooking" />
            <Picker.Item label="Dancing" value="Dancing" />
            <Picker.Item label="Singing" value="Singing" />
            <Picker.Item label="Blogging" value="Blogging" />
          </Picker>
          </View>
          {this.state.showHobbiesInfo ? (
            <Text style={styles.warningText}>Pick one hobby</Text>
          ) : null}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("DisplayScreen");
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.validate();
                if (this.state.validated) {
                  if (this.state.from !== "DisplayScreen") {
                    this.addUserInfo();
                  } else {
                    this.updateUserInfo();
                  }

                  this.props.navigation.navigate("DisplayScreen");
                }
              }}
            >
              <Text>
                {this.state.from !== "DisplayScreen"
                  ? "Add to profile"
                  : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );

    } 
    }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1F0",
    flex: 1,
  },
  tag: {
    backgroundColor: "#F1F1F0",
    marginTop: 10,
    fontSize: 15,
    padding: 10,
    width:"30%",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#ADA9AD",
    marginTop: 10,
    width: "50%",
    fontSize: 15,
    textAlign: "left",
    padding: 10,
  },
  button: {
    backgroundColor: "#A98AB0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 0.5,
    padding: "5%",
    marginHorizontal: "5%",
    height: 50,
  },
  text: {
    color: "#383940",
    fontSize: 15,
    textAlign: "right",
  },

  warningText: {
    color: "red",
    fontSize: 10,
    fontStyle: "italic",
  },
  imageContainer: {
    alignSelf: "center",
    margin: "5%",
  },
});
