

import React, {Component} from 'react';
import {ImageBackground, Image, AsyncStorage, StatusBar} from 'react-native';
import {Container, Spinner} from 'native-base';

type Props = {};
export default class Splash extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <Container style={{ alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0)" barStyle="light-content"/>
                <ImageBackground source={require('../../images/Backgrounds/splash-bg.png')} 
                style={{width: '100%', height: '100%', resizeMode: 'contain', 
                alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <Image source={require('../../images/Logo/khrogaty-logo.png')} style={{width: "28%", height: "15%"}}/>
                    <Spinner color="#fff"/>
                </ImageBackground>
                {this.moveToHome()}
            </Container>
        );
    }

    moveToHome(){
        AsyncStorage.getItem("here").then((val)=>{
            setTimeout(()=>{
                if(val === "yes"){
                    this.props.navigation.navigate('Home');
                }else{
                    this.props.navigation.navigate('Onboarding');
                }
            }, 1000);
        });
    }
}