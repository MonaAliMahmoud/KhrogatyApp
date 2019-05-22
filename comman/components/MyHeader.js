import React, { Component } from "react";
import { ImageBackground, View, Text, Image, StatusBar } from "react-native";
import { Button } from "native-base";
import { withNavigation } from "react-navigation";

type Props = {};
class MyHeader extends Component<Props> {
  state = { title: this.props.title };
  render() {
    return (
      <View style={{ height: "15%" }}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle="light-content"
        />
        <ImageBackground
          source={require("../../images/Backgrounds/theme-header.png")}
          style={{ width: "100%", height: "100%", flexDirection: "row" }}
        >
          <Button
            transparent
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ flex: 2, marginLeft: 20, marginTop: 30 }}
          >
            <Image
              source={require("../../images/Icons/left-arrow.png")}
              style={{ width: "25%", height: "100%" }}
            />
          </Button>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              flex: 3,
              marginTop: 30,
              textAlign: "left",
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            {this.state.title}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

export default withNavigation(MyHeader);
