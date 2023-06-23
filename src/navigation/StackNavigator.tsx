import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DrawerNavigator from './DrawerNavigator';
const routes_array = [
    {name: 'HomeDrawer',component: DrawerNavigator},
];

const Stack = createStackNavigator();
const StackNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
            name={'Home'}
            component={DrawerNavigator}
        />
    </Stack.Navigator>
);

export default StackNavigator;