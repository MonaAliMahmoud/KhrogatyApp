import React, { Component } from "react";
import { Image, TextInput, View, WebView, Text } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Content,
  Button,
  Body,
  Spinner,
  Tab,
  Tabs,
  TabHeading,
  Left
} from "native-base";
import MyHeader from "../comman/components/MyHeader";

type Props = {};

export default class Details extends Component<Props> {
  state = {
    title: "Details",
    name: "Mona",
    comment: "",
    addingComment: 0,
    addCommentRes: [],
    comments: [],
    loaded: 0,
    currentTab: 0
  };
  static navigationOptions = {
    header: null
  };

  getComments() {
    fetch(
      "http://reactnative.website/iti/wp-json/wp/v2/comments?post=" +
        this.props.navigation.getParam("cardid")
    )
      .then(response => response.json())
      .then(resJson => {
        this.setState(
          {
            comments: resJson,
            loaded: 1
          },
          function f() {
            console.log(resJson);
          }
        );
      });
  };

  componentDidMount() {
    this.getComments();
  }

  methodAbout() {
    if (this.state.currentTab == 0) {
      return (
        <Image
          source={require("../images/Icons/gabout.png")}
          style={{ width: "10%", height: "40%" }}
        />
      );
    } else {
      return (
        <Image
          source={require("../images/Icons/about.png")}
          style={{ width: "10%", height: "40%" }}
        />
      );
    }
  }

  methodMap() {
    if (this.state.currentTab == 1) {
      return (
        <Image
          source={require("../images/Icons/map-marker.png")}
          style={{ width: "10%", height: "40%" }}
        />
      );
    } else {
      return (
        <Image
          source={require("../images/Icons/grey-map-marker.png")}
          style={{ width: "10%", height: "40%" }}
        />
      );
    }
  }

  render() {
    return (
      <Container>
        <MyHeader title={this.props.navigation.getParam("title")} />
        <Content>
          <Tabs
            tabBarBackgroundColor={{ backgroundColor: "white" }}
            tabBarUnderlineStyle={{ backgroundColor: "green" }}
            onChangeTab={({ i }) => this.setState({ currentTab: i })}
          >
            <Tab
              heading={
                <TabHeading
                  style={
                    this.state.currentTab == 0
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "white" }
                  }
                >
                  {this.methodAbout()}
                  <Text style={{ fontSize: 18, margin: 10 }}>About</Text>
                </TabHeading>
              }
            >
              <Image
                style={{ width: "100%", height: 220 }}
                source={{ uri: this.props.navigation.getParam("image") }}
              />
              <View style={{ margin: 20 }}>
                <Card>
                  <CardItem>
                    <Body>
                      <Text style={{ fontWeight: "bold", fontSize: 20, color:'black' }}>
                        {this.props.navigation.getParam("title")}
                      </Text>
                      <Text style={{ color: "gray" }}>
                        {this.props.navigation.getParam("content")}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
                {/* >More Information */}
                <Text style={{ fontWeight: "bold", fontSize: 15, margin: 20, color:'black' }}>
                  More Information
                </Text>
                <Card>
                  <CardItem>
                    <View style={{ flexDirection: "column" }}>
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <Image
                          source={require("../images/Icons/address.png")}
                          style={{ width: "6%", height: "100%" }}
                        />
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 15,
                            marginLeft: 10
                          }}
                        >
                          {this.props.navigation.getParam("address")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <Image
                          source={require("../images/Icons/call.png")}
                          style={{ width: "6%", height: "80%" }}
                        />
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 15,
                            marginLeft: 10
                          }}
                        >
                          {this.props.navigation.getParam("phone")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <Image
                          source={require("../images/Icons/mail.png")}
                          style={{ width: "7%", height: "80%" }}
                        />
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 15,
                            marginLeft: 10
                          }}
                        >
                          {this.props.navigation.getParam("email")}
                        </Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
                {/* Comments */}
                <Text style={{ fontWeight: "bold", fontSize: 15, margin: 20, color:'black' }}>
                  Leave Comment
                </Text>
                <Card>
                  {this.returnComments()}
                  <CardItem>
                    <View
                      style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "lightgray",
                        alignItems: "center",
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <TextInput
                        style={{
                          height: 40,
                          width: "75%",
                          borderColor: "transparent",
                          padding: 10,
                          marginRight: 40,
                          fontSize: 15
                        }} 
                        onChangeText={(comment) => this.setState({ comment })}
                        value={this.state.comment}
                        placeholder="Write here......"
                      />
                      <Button
                        transparent
                        onPress={() => {
                          this.addComment();
                        }}
                      >
                        <Image
                          source={require("../images/Icons/telegram.png")}
                          style={{ width: "30%", height: "80%" }}
                        />
                      </Button>
                    </View>
                  </CardItem>
                </Card>
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading
                  style={
                    this.state.currentTab == 1
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "white" }
                  }
                >
                  {this.methodMap()}
                  <Text style={{ fontSize: 18, margin: 10 }}>Map</Text>
                </TabHeading>
              }
            >
              <WebView
                source={{ uri: this.props.navigation.getParam("map") }}
              />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }

  addComment() {
    fetch(
      "http://reactnative.website/iti/wp-json/wp/v2/comments?author_name=" +
        this.state.name +
        "&author_email=itialex39@roqay.com.kw&content=" +
        this.state.comment +
        "&post=" +
        this.props.navigation.getParam("cardid"),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(respjson => {
        this.setState(
          { addCommentRes: respjson, addingComment: 0, name: "", comment: "" },
          function() {
            console.log(respjson);
          }
        );
      });
  }

  returnComments() {
    if (this.state.loaded === 0) {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Spinner />
          <Text>Loading</Text>
        </View>
      );
    } else {
      return this.state.comments.map(mapingComment => {
        return (
          <CardItem horizontal={false}>
            <CardItem style={{ width: "40%", height: "100%" }}>
              <Image
                source={require("../images/Icons/profile.png")}
                style={{ width: "55%", height: "80%" }}
              />
            </CardItem>
            <CardItem style={{ width: "40%", height: "100%" }}>
              <Body>
                <Text style={{ fontWeight: "bold", color:'black'}}>
                  {mapingComment.author_name}
                </Text>
                <Text style={{ color: "gray", marginTop: 10 }}>
                  {mapingComment.content.rendered}
                </Text>
              </Body>
            </CardItem>
          </CardItem>
        );
      });
    }
  }
}
