import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import navigation from 'app/global/navigation'

// Screens
import UserScreen from 'app/screens/users'

const Stack = createStackNavigator(
    {
        UserScreen: { screen: UserScreen },
    },
    {
      initialRouteName: "UserScreen",
      headerMode: "none",
    }
  );

const AppNavigator = createAppContainer(Stack);

export default () =>
    <AppNavigator 
      ref={navigatorRef => {
        navigation.setTopLevelNavigator(navigatorRef);
      }}
    />
