
import { useEffect, useRef, useState } from "react";
import { PermissionsAndroid, StyleSheet, Text, View, Alert, Button, Image, Dimensions, Animated, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import dayjs from "dayjs";
import ListAlarm from "./components/ListAlarm";
import { generateData } from "./components/data";
const {diffClamp} = Animated;
const headerHeight = Dimensions.get("window").height*0.29;
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
// const data = [
//     {id: 0,title: 'Recommended',},
//     {id: 1,title: 'Popular',},
//     {id: 3,title: 'Affordable',},
//     {id: 4,title: 'Customer Ratings',},
//     {id: 5,title: 'Customer Ratings',},
//     {id: 6,title: 'Customer Ratings',},
//     {id: 7,title: 'Customer Ratings',},
// ]
export default function Home() {
    const data = generateData(50);
    const scrollY = useRef(new Animated.Value(0));
    const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
    const ref = useRef(null);
    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight)],
    });

    const translateYNumber = useRef();

    translateY.addListener(({value}) => {
        translateYNumber.current = value;
    });

    const handleScroll = Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
        {useNativeDriver: true},
    );

    const handleSnap = ({nativeEvent}: {nativeEvent:any}) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (!(translateYNumber.current === 0 ||translateYNumber.current === -headerHeight / 2 )) {
        //   if (ref.current) {
        //     ref.current.scrollToOffset({
        //       offset:
        //         getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
        //         -headerHeight / 2
        //           ? offsetY + headerHeight / 2
        //           : offsetY - headerHeight / 2,
        //     });
        //   }
        }
    };
    const [date, setDate] = useState(dayjs());
    useEffect(() => {
        let timer = setInterval(() => {
            setDate(dayjs());
        }, 1000 * 60);
        return () => clearInterval(timer);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[{zIndex:1,},{transform: [{translateY}]}]}>
                <View style={{
                    justifyContent:"center",
                    alignItems:'center',
                    backgroundColor: colors.dark_gray,
                    borderRadius: 15,
                    margin: 10,
                    paddingBottom: 40,
                    paddingTop: 20,
                    width: DEVICE_WIDTH*0.90,
                    height: DEVICE_HEIGHT*0.25,
                    position: "absolute",
                    alignSelf:'center',
                    
                }}
                {...{headerHeight}} 
                >
                    <Text style={styles.time}>{date.format("hh:mm")}</Text>
                    <Text style={styles.date}>{date.format("dddd, DD MMMM YYYY")}</Text>
                </View>
            </Animated.View>
            <Animated.FlatList
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingTop: headerHeight,
                    zIndex:0,
                }}
                onScroll={handleScroll}
                ref={ref}
                // onMomentumScrollEnd={handleSnap}
                data={data}
                renderItem={ListAlarm}
                keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    map: {
        flex: 1,
    },
    date: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "100",
        fontFamily: fonts.cascadia
    },
    time: {
        color: colors.white,
        fontSize: 72,
        // fontWeight: "bold",
        fontFamily: fonts.cascadia
    },
});