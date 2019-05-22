
import React, { Component } from 'react';
import { Container, Text, Card, CardItem, Content, Left, Body, Right, Spinner, Button } from 'native-base';
import { ImageBackground, Image, View, FlatList, StatusBar } from 'react-native';

type Props = {};
export default class Home extends Component<Props> {
  state = { places: [], restaurants: [], activities: [], loaded: 0 }
  static navigationOptions = {
    header: null,
  };

  getPlaces() {
    fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          places: resJson, loaded: 1
        }, function () {
          console.log(resJson);
        });
      })
  }
  getRestaurants() {
    fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          restaurants: resJson, loaded: 1
        }, function () {
          console.log(resJson);
        });
      })
  }
  getActivities() {
    fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2")
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          activities: resJson, loaded: 1
        }, function () {
          console.log(resJson);
        });
      })
  }

  componentDidMount(): void {
    this.getPlaces();
    this.getRestaurants();
    this.getActivities();
  }

  render() {
    return (
      <Container>
       <Content>
       <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0)" barStyle="light-content"/>
          <ImageBackground source={require('../images/Backgrounds/home-header.png')}
            style={{
              width: '100%', height: 180, resizeMode: 'contain',
              justifyContent: "center", alignItems: 'center'
            }}>
            <Image source={require('../images/Logo/khrogaty-logo.png')} style={{ width: "25%", height: "50%" }} />
          </ImageBackground>
          <Card transparent>
            <CardItem>
              <Left>
                <Image source={require('../images/VectorIcons/home-first-icon.png')}
                  style={{ width: "20%", height: 35, borderRadius: 10 }} />
                <Body>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Places For GoingOut</Text>
                </Body>
              </Left>
              <Right>
                <Button transparent onPress={() => {
                  this.setState({
                  });
                  this.props.navigation.navigate('FindPlaces')}}>
                  <Text style={{ fontWeight: 'bold', color: 'green', marginTop: 10 }}>View More</Text>
                </Button>
              </Right>
            </CardItem>
            {this.returnPlaces()}

            <CardItem>
              <Left>
                <Image source={require('../images/VectorIcons/home-second-icon.png')}
                  style={{ width: "20%", height: 35, borderRadius: 10 }} />
                <Body>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Restaurants and Coffe Shops</Text>
                </Body>
              </Left>
              <Right>
                <Button transparent onPress={() => {
                    this.setState({
                    });
                    this.props.navigation.navigate('Restaurants')}}>
                    <Text style={{ fontWeight: 'bold', color: 'green', marginTop: 10 }}>View More</Text>
                </Button>              
              </Right>
            </CardItem>
            {this.returnRestaurants()}

            <CardItem>
              <Left>
                <Image source={require('../images/VectorIcons/home-third-icon.png')}
                  style={{ width: "20%", height: 35, borderRadius: 10 }} />
                <Body>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>What Do I Do?</Text>
                </Body>
              </Left>
              <Right>
                <Button transparent onPress={() => {
                    this.setState({
                    });
                    this.props.navigation.navigate('ThingsToDo')}}>
                    <Text style={{ fontWeight: 'bold', color: 'green', marginTop: 10 }}>View More</Text>
                </Button> 
              </Right>
            </CardItem>
            {this.returnActivities()}
          </Card>
        </Content>
      </Container>
    );
  }

  returnPlaces() {
    if (this.state.loaded === 0) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
          <Text>Loading</Text>
        </View>
      )
    } else {
      return (
        <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
          data={this.state.places}
          renderItem={({ item }) => <Card transparent key={item.id}>
            <CardItem style={{ flexDirection: 'column' }}  button onPress={() => {
              this.props.navigation.navigate('Details', { cardid: item.id, title: item.title.rendered, image: item.better_featured_image.source_url, 
                                                          content: item.content.rendered, address: item.acf.address,
                                                          phone: item.acf.phone_number, email: item.acf.email_address,
                                                          map: item.acf.map_location})
                }}>
              <Left>    
                <Image
                  style={{ width: 220, height: 180, borderRadius: 10 }}
                  source={{ uri: item.better_featured_image.source_url }} />
              </Left>
              <Body style={{ width: 220}}>
                <Text style={{ fontSize: 14 }}>{item.title.rendered}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../images/Icons/map-marker.png')} style={{ width: 15, height: 15 }} />
                  <Text style={{ color: 'gray', fontSize: 12 }}>{item.acf.address}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>}
        />
      );
    }
  }

  returnRestaurants() {
    if (this.state.loaded === 0) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
          <Text>Loading</Text>
        </View>
      )
    } else {
      return (
        <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
          data={this.state.restaurants}
          renderItem={({ item }) => <Card transparent key={item.id}>
            <CardItem style={{ flexDirection: 'column' }}  button onPress={() => {
                this.props.navigation.navigate('Details', { cardid: item.id, title: item.title.rendered, image: item.better_featured_image.source_url, 
                                                            content: item.content.rendered, address: item.acf.address,
                                                            phone: item.acf.phone_number, email: item.acf.email_address,
                                                            map: item.acf.map_location})
              }}>
              <Left>
                <Image
                  style={{ width: 220, height: 180, borderRadius: 10 }}
                  source={{ uri: item.better_featured_image.source_url }} />
              </Left>
              <Body style={{ width: 220}}>
                <Text style={{ fontSize: 14 }}>{item.title.rendered}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../images/Icons/map-marker.png')} style={{ width: 15, height: 15 }} />
                  <Text style={{ color: 'gray', fontSize: 12 }}>{item.acf.address}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>}
        />
      );
    }
  }

  returnActivities() {
    if (this.state.loaded === 0) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
          <Text>Loading</Text>
        </View>
      )
    } else {
      return (
        <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
          data={this.state.activities}
          renderItem={({ item }) => <Card transparent key={item.id}>
            <CardItem style={{ flexDirection: 'column' }}  button onPress={() => {
                this.props.navigation.navigate('Details', { cardid: item.id, title: item.title.rendered, image: item.better_featured_image.source_url, 
                                                            content: item.content.rendered, address: item.acf.address,
                                                            phone: item.acf.phone_number, email: item.acf.email_address,
                                                            map: item.acf.map_location})
              }}>
              <Left>
                <Image
                  style={{ width: 220, height: 180, borderRadius: 10 }}
                  source={{ uri: item.better_featured_image.source_url }} />
              </Left>
              <Body style={{ width: 220}}>
                <Text style={{ fontSize: 14 }}>{item.title.rendered}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../images/Icons/map-marker.png')} style={{ width: 15, height: 15 }} />
                  <Text style={{ color: 'gray', fontSize: 12 }}>{item.acf.address}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>}
        />
      );
    }
  }
}
