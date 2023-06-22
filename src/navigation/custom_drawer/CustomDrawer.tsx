import react, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props: any) => {
    type Nav = {
        navigate: (value: string) => void;
    };

    return (
        // take up all available space within its container
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerList}>
                    <DrawerItemList {...props}>

                    </DrawerItemList>
                </View>
            </DrawerContentScrollView>

            <View>
                <Text style={{ color: "#000" }}>
                    prototype
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerList: {
        // marginTop: '-70%',
    },
});

export default CustomDrawer;
