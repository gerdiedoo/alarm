
import { useEffect, useRef, useState } from "react";
import { PermissionsAndroid, StyleSheet, Text, View, Alert, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Map() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
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