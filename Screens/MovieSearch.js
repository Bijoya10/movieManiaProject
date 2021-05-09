import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import AppHeader from "../components/Header";
import { SearchBar, Avatar,LinearProgress } from "react-native-elements";

export default class MovieScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      movieName: "",
      movieData: [],
      buttonPressed:false
    };
  }
  getInfo = async () => {
    fetch(
      "https://www.omdbapi.com/?s=" + this.state.movieName + "&apikey=cb93eda6"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          movieData: responseJson.Search,
        });
        console.log(this.state.movieData);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <AppHeader title="Search Movies" navigation={this.props.navigation} />
        {this.state.movieData.length === 0 &&
        this.state.buttonPressed === true ? (
          <LinearProgress color="#A98AB0" />
        ) : null}
        <SearchBar
          lightTheme={true}
          style={styles.input}
          placeholder="movie name"
          onChangeText={(text) => {
            this.setState({ movieName: text });
          }}
          value={this.state.movieName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({buttonPressed:true,movieData:[]})
            this.getInfo();
          }}
        >
          <Text style={styles.text}>Search</Text>
        </TouchableOpacity>

        <ScrollView style={{ marginTop: "4%" }}>
          {this.state.movieData !== undefined
            ? this.state.movieData.map((item) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.2,
                    borderColor: "#383940",
                  }}
                  onPress={() => {
                    
                    this.props.navigation.navigate("AboutMovie", {
                      movie: item,
                    });
                  }}
                >
                  <Avatar
                    rounded
                    size="small"
                    source={{ uri: item.Poster }}
                    style={{ width: 50, height: 50, margin: "3%" }}
                  />
                  <Text style={[styles.text, { textAlignVertical: "center" }]}>
                    {item.Title}
                  </Text>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#A98AB0",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 0.5,
    width: 150,
    height: 50,
  },
  text: {
    color: "#383940",
    fontSize: 18,
  },
  input: {
    borderWidth: 0.5,
  },
});
