import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomDrawer from './custom_drawer/CustomDrawer';
import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props: any) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
            }}>

            <Drawer.Screen
                name={"HomeDrawer"}
                component={TabNavigator}
                options={{
                    drawerLabelStyle: {
                        color: "#fff",
                        marginLeft: 5,
                        fontSize: 10,
                    },
                    // drawerType: 'slide',
                    drawerStyle: { backgroundColor: "#000" },
                }}
            />
            );
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    tinyLogo: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
});

export default DrawerNavigator;
