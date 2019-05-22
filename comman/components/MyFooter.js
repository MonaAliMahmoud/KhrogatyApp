
import React, { Component } from 'react';
import {Image, Text } from 'react-native';
// import { Footer, FooterTab, Button } from 'native-base';
// import { withNavigation } from 'react-navigation';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from '../../Screens/Home'
import Search from '../../Screens/Search'
import Places from '../../Screens/Places'
import Restaurants from '../../Screens/Restaurants'
import Activities from '../../Screens/Activities'

const getTabBarIcon = (navigation, focused, tintColor) => {
 
    const { routeName } = navigation.state;
    if (routeName === 'Home') {
      return (
      <Image
      source={
        focused
          ? require('../../images/Icons/ghome.png')
          : require('../../images/Icons/home.png')
      }
      style={{ width: "38%", height: "80%" }}/>
      );
    } else if (routeName === 'Search') {
      return (<Image
        source={
          focused
            ? require('../../images/Icons/gfilter.png')
            : require('../../images/Icons/filter.png')
        }
        style={{ width: "38%", height: "80%" }}/>
      );
    }else if (routeName === 'FindPlaces') {
      return (<Image
        source={
          focused
            ? require('../../images/Icons/gfind-places.png')
            : require('../../images/Icons/find-places.png')
        }
        style={{ width: "38%", height: '80%' }}/>
      );
    }else if (routeName === 'Restaurants') {
      return (<Image
        source={
          focused
            ? require('../../images/Icons/grestaurants.png')
            : require('../../images/Icons/restaurants.png')
        }
        style={{ width: "38%", height: "80%" }}/>
      );
    }else if (routeName === 'ThingsToDo') {
      return (<Image
        source={
          focused
            ? require('../../images/Icons/gtodo.png')
            : require('../../images/Icons/todo.png')
        }
        style={{ width: "38%", height: "80%" }}/>
      );
    }
  };
  
  export default createBottomTabNavigator(
    {
        Home: Home ,
        Search: Search ,
        FindPlaces: Places,
        Restaurants: Restaurants,
        ThingsToDo: Activities,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) =>
            getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        },
    }
)
  
  
// type Props = {};
// class MyFooter extends Component<Props> {
 
//     render() {
//         return (
//             <Footer>
//                 <FooterTab style={{backgroundColor:'white'}}>
//                     <Button vertical onPress={() => {
//                         this.props.navigation.navigate('Home')
//                             // <Image source={require('../../images/Icons/ghome.png')} style={{ width: 25, height: 25 }}/>
//                         }}>
//                         <Image source={require('../../images/Icons/ghome.png')} style={{ width: "38%", height: "62%" }}/>
//                         <Text style={{fontSize:10}}>Home</Text>
//                     </Button>
                    
//                     <Button vertical onPress={() => {
//                         this.props.navigation.navigate('Search')
//                             // <Image source={require('../../images/Icons/gfilter.png')} style={{ width: 25, height: 25 }}/>
//                         }}>
//                         <Image source={require('../../images/Icons/filter.png')} style={{ width: "38%", height: "62%" }}/>
//                         <Text style={{fontSize: 10}}>Search</Text>
//                     </Button>

//                     <Button vertical onPress={() => {
//                             this.props.navigation.navigate('Places')
//                             // <Image source={require('../../images/Icons/gfind-places.png')} style={{ width: 25, height: 25 }}/>
//                         }}>
//                         <Image source={require('../../images/Icons/find-places.png')} style={{ width: "38%", height: "62%" }}/>
//                         <Text style={{fontSize:10}}>Find Places</Text>
//                     </Button>

//                     <Button vertical onPress={() => {
//                             this.props.navigation.navigate('Restaurants')
//                             // <Image source={require('../../images/Icons/grestaurants.png')} style={{ width: 25, height: 25 }}/>
//                         }}>
//                         <Image source={require('../../images/Icons/restaurants.png')} style={{ width: "38%", height: "62%" }}/>
//                         <Text style={{fontSize: 10}}>Restaurants</Text>
//                     </Button>

//                     <Button vertical onPress={() => {
//                             this.props.navigation.navigate('Activities')
//                             // <Image source={require('../../images/Icons/gtodo.png')} style={{ width: 25, height: 25 }}/>
//                         }}>
//                         <Image source={require('../../images/Icons/todo.png')} style={{ width: "38%", height: "62%" }}/>
//                         <Text style={{fontSize: 10}}>Things To Do</Text>
//                     </Button>
//                 </FooterTab>
//             </Footer>
//         );
//     }
// }

// export default withNavigation(MyFooter);