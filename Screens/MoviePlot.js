import * as React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import firebase from "firebase";
import { Card, Rating, LinearProgress } from "react-native-elements";

export default class MoviePlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      movieName: this.props.navigation.getParam("movie")["Title"],
      poster: this.props.navigation.getParam("movie")["Poster"],
      rating: "",
      plot: "",
      movieData: [],
    };
  }

  getInfo = async () => {
    fetch(
      "https://www.omdbapi.com/?t=" + this.state.movieName + "&apikey=cb93eda6"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          movieData: responseJson,
          rating: responseJson["Ratings"],
        });
        console.log(this.state.movieData);
      });
  };

  componentDidMount() {
    this.getInfo();
  }
  render() {
    if (this.state.movieData.length!==0) {
      return (
        <View style={styles.container}>
          <View style={{ flexDirection: "row", height: "60%" }}>
            <Image
              source={{ uri: this.state.poster }}
              style={{
                margin: "5%",
                flex: 0.8,
              }}
            />

            <View
              style={{
                flex: 0.4,
                marginVertical: "5%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {this.state.movieName}
              </Text>
              <View style={styles.dataContainer}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  Released On :{" "}
                </Text>
                <Text style={[styles.text, { fontStyle: "italic" }]}>
                  {this.state.movieData.Released}
                </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  Runtime :{" "}
                </Text>
                <Text style={[styles.text, { fontStyle: "italic" }]}>
                  {this.state.movieData.Runtime}
                </Text>
              </View>

              {this.state.rating ? (
                <Rating
                  tintColor="#F1F1F0"
                  imageSize={20}
                  fractions="{1}"
                  readonly
                  type="heart"
                  ratingCount={5}
                  startingValue={this.state.rating[0]["Value"].slice(0, 3) / 2}
                />
              ) : null}
            </View>
          </View>
          <ScrollView>
            <View style={styles.dataContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Director :{" "}
              </Text>
              <Text style={[styles.text, { fontStyle: "italic" }]}>
                {this.state.movieData.Director}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>Plot : </Text>
              <Text style={[styles.text, { fontStyle: "italic" }]}>
                {this.state.movieData.Plot}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Language :{" "}
              </Text>
              <Text style={[styles.text, { fontStyle: "italic" }]}>
                {this.state.movieData.Language}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Actors :{" "}
              </Text>
              <Text style={[styles.text, { fontStyle: "italic" }]}>
                {this.state.movieData.Actors}
              </Text>
            </View>

            <View style={styles.dataContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Genre :{" "}
              </Text>
              <Text style={[styles.text, { fontStyle: "italic" }]}>
                {this.state.movieData.Genre}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Writer :{" "}
              </Text>
              <Text style={[styles.text, { fontStyle: "italic" }]}>
                {this.state.movieData.Writer}
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return <LinearProgress color="#A98AB0" />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1F0",
    flex: 1,
    padding: "4%",
  },
  dataContainer: {
    padding: "3%",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  text: {
    color: "#383940",
    fontSize: 18,
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
});
