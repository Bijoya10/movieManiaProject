import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  Modal,
  ScrollView,
  KeyboardAvoidingView,Image
} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class SignUpLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      isModalVisible: false,
      confirmPassword: "",
      firstLogin: false,
    };
  }

  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        if (this.state.firstLogin)
          this.props.navigation.navigate("HomeScreen", { from: "LoginScreen" });
        else this.props.navigation.navigate("DisplayScreen");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("Passwords don't match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((response) => {
          this.setState({ firstLogin: true });
          this.userLogin(username, password);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.isModalVisible}
      >
        <KeyboardAvoidingView style={styles.container}>
          <Text style={[styles.text, { fontSize: 35,fontStyle:"italic"}]}>Registration</Text>
          <TextInput
            placeholder="abc@email.com"
            value={this.state.emailId}
            style={styles.input}
            keyboardType={"email-address"}
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />

          <TextInput
            placeholder="Password"
            value={this.state.password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TextInput
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                confirmPassword: text,
              });
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userSignUp(
                this.state.emailId,
                this.state.password,
                this.state.confirmPassword
              );
              //this.setState({isModalVisible:false})
            }}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <Image source={require("../assets/logo.png")} style={{width:100,height:100}}/>
        <Text style={[styles.text, { fontSize: 35,fontStyle:"italic"}]}>Movie Mania</Text>

        <TextInput
          placeholder="abc@email.com"
          keyboardType={"email-address"}
          style={styles.input}
          value={this.state.emailId}
          onChangeText={(text) => {
            this.setState({
              emailId: text,
            });
          }}
        />

        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text style={styles.text}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F1F0",
    flex: 1,
  },
  input: {
    backgroundColor: "#ADA9AD",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginTop: 10,
    borderWidth: 2,
    width: "80%",
    height: 60,
    fontSize: 20,
    textAlign:"center",
    padding: 15,
  },
  button: {
    backgroundColor: "#A98AB0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 2,
    width: 150,
    height: 50,
  },
  text: {
    color: "#383940",
    fontSize: 18,
    fontWeight: "bold",
  }
});
