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
        {routes_array.map((_, index) => {
            return(
                <Stack.Screen
                    key={index}
                    name={_.name}
                    component={_.component}
                />
            )
        })}
    </Stack.Navigator>
);

export default StackNavigator;