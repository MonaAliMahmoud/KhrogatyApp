import React, { Component } from "react";
import { View, Image, FlatList, Text, ImageBackground, StatusBar } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Content,
  Left,
  Body,
  Spinner,
  Button,
} from "native-base";

type Props = {};
export default class Places extends Component<Props> {
  state = { title: "Places", places: [], loaded: 0 };
  static navigationOptions = {
    header: null
  };

  getPlaces() {
    fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
      .then(response => response.json())
      .then(resJson => {
        this.setState(
          {
            places: resJson,
            loaded: 1
          },
          function() {
            console.log(resJson);
          }
        );
      });
  }

  componentDidMount(): void {
    this.getPlaces();
  }

  render() {
    return (
      <Container>
        <View style={{ height: "15%" }}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle="light-content"
        />
          <ImageBackground
            source={require("../images/Backgrounds/theme-header.png")}
            style={{ width: "100%", height: "100%", flexDirection: "row" }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                flex: 3,
                margin: 30
              }}
            >
              {this.state.title}
            </Text>
          </ImageBackground>
        </View>
        <Content>{this.returnPlaces()}</Content>
      </Container>
    );
  }

  returnPlaces() {
    if (this.state.loaded === 0) {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Spinner />
          <Text>Loading</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.places}
          renderItem={({ item }) => (
            <Card key={item.id}>
              <CardItem>
                <Left>
                  <Image
                    style={{ width: "90%", height: 200, borderRadius: 10 }}
                    source={{ uri: item.better_featured_image.source_url }}
                  />
                </Left>
                <Body>
                  <Text
                    style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
                  >
                    {item.title.rendered}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../images/Icons/map-marker.png")}
                      style={{ width: 15, height: 15 }}
                    />
                    <Text style={{ color: "gray", fontSize: 12 }}>
                      {item.acf.address}
                    </Text>
                  </View>
                  <Text style={{ color: "gray", margin: 10, fontSize: 15 }}>
                    {item.excerpt.rendered}
                  </Text>
                  <Button
                    rounded
                    success
                    style={{
                      width: "100%",
                      height: 35,
                      justifyContent: "center",
                      borderRadius: 10,
                      marginBottom: 0
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("Details", {
                        cardid: item.id,
                        title: item.title.rendered,
                        image: item.better_featured_image.source_url,
                        content: item.content.rendered,
                        address: item.acf.address,
                        phone: item.acf.phone_number,
                        email: item.acf.email_address,
                        map: item.acf.map_location
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>Details</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          )}
        />
      );
    }
  }
}
