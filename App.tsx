import React, { useEffect, useState }  from "react";
import { StatusBar } from "react-native";
import StackNavigator from "./src/navigation/StackNavigator";
import {NavigationContainer} from '@react-navigation/native';
class App extends React.Component  {
  render() {
    return (
      <>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </>
    );
  }
}

export default App;