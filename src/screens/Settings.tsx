import { useEffect, useRef, useState } from "react";
import { PermissionsAndroid, StyleSheet, Text, View, Alert, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";

export default function Settings() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color:colors.black}}>
                test
            </Text>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});