import React, { Component } from "react";
import {
  Image,
  View,
  TextInput,
  Text,
  ImageBackground,
  StatusBar,
  FlatList
} from "react-native";
import {
  Container,
  Card,
  CardItem,
  Content,
  Left,
  Body,
  Button,
  Icon
} from "native-base";

type Props = {};
export default class Search extends Component<Props> {
  state = { title: "Search", data: [], loaded: 0 };
  static navigationOptions = {
    header: null
  };
  arrayholder = [];

  getPlaces() {
    fetch("http://reactnative.website/iti/wp-json/wp/v2/posts")
      .then(response => response.json())
      .then(resJson => {
        this.setState(
          {
            data: '',
            loaded: 1
          },
          function() {
            console.log(resJson);
          }
        );
        this.arrayholder=resJson
      });
  }

  componentDidMount(): void {
    this.getPlaces();
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.rendered.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

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
        <Content>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "lightgray",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                name="search"
                type="EvilIcons"
                style={{ margin: 8, color: "gray" }}
              />
              <TextInput
                style={{
                  height: 40,
                  width: "75%",
                  borderColor: "transparent",
                  padding: 5,
                  fontSize: 15
                }}
                onChangeText={text => this.searchFilterFunction(text)}
                placeholder="Search here by place"
              />
            </View>
          </View>
          {this.returnPlaces()}
        </Content>
      </Container>
    );
  }

  returnPlaces() {
    if (this.state.loaded === 0) {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../images/VectorIcons/nosearch-icon.png")}
            style={{ width: 150, height: 150, marginTop: 50, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 18 }}>Search for any places</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.data}
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