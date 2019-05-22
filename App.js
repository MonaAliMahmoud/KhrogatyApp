
import { createStackNavigator, createAppContainer,  createSwitchNavigator } from "react-navigation";
import Splash from './comman/screens/Splash'
import Onboarding from './comman/screens/Onboarding'
import Details from './Screens/Details'
import MyFooter from './comman/components/MyFooter'

const AppNavigator = createStackNavigator({
  TabBar:MyFooter,
  Details: Details,
},
{
  headerMode: "none",
  navigationOptions: {
  headerVisible: false,
  }
});

const AppStack = createSwitchNavigator({
  Splash: Splash,
  Onboarding: Onboarding,
  AppNavigator:AppNavigator,
  
});

export default createAppContainer(AppStack);
