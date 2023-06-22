import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    View,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from "../screens/Home"

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MARGIN = 0;
const TAB_BAR_WIDTH = width;
const TAB_WIDTH = TAB_BAR_WIDTH / 2;

//hiding the bottom tab
let toShowBottom: boolean = true;
export function scrolled(answer: boolean) {
    toShowBottom = answer;
    console.log(answer);
}

function MyTabBar({ state, descriptors, navigation, props }: any) {
    const [translateX] = useState(new Animated.Value(0));
    let statusState = toShowBottom;
    const translateTab = (index: number) => {
        Animated.spring(translateX, {
            toValue: index * TAB_WIDTH,
            useNativeDriver: true,
            speed: 10,
        }).start();
    };
    //module for hiding
    const [ShowBottomTab, SetBottomTab] = useState(true);
    useEffect(() => {
        const toggle = setInterval(() => {
            if (toShowBottom == true) {
                SetBottomTab(true);
            } else if (toShowBottom == false) {
                SetBottomTab(false);
            }
        }, 1);

        return () => clearInterval(toggle);
    });

    useEffect(() => {
        translateTab(state.index);
    }, [state.index]);

    return (
        <SafeAreaView>
            {ShowBottomTab ? (
                <View
                    style={[
                        styles.test_container,
                    ]}>
                    <Animated.View style={[styles.slidingTabContainer, {}]}>
                        <Animated.View
                            style={[
                                styles.slidingTab,
                                { transform: [{ translateX }] },
                            ]}></Animated.View>
                    </Animated.View>
                    {state.routes.map((route: any, index: any) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                                navigation.navigate({ name: route.name });
                            }
                        };

                        const tabBarIcon = options.tabBarIcon;
                        // console.log(tabBarIcon);
                        return (
                            <TouchableOpacity
                                key={index}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={tabBarIcon}
                                    resizeMode="contain"
                                    style={[
                                        styles.tinyLogo,
                                        isFocused ? styles.tinyLogoActive : styles.tinyLogoInActive,
                                    ]}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ) : null}
        </SafeAreaView>
    );
}
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
        }}
        tabBar={props => <MyTabBar style={{ width, height }} {...props} />}>
        <Tab.Screen
            name={'HomeTab'}
            component={HomeScreen}
            options={{
            }}
        />
    </Tab.Navigator>
);
const styles = StyleSheet.create({
    test_container: {
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 20,
        bottom: 0,
        width: TAB_BAR_WIDTH,
        height: Dimensions.get('window').height * 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#000",
        position: 'absolute',
    },
    tinyLogo: {
        width: 25,
        height: 25,
    },
    tinyLogoActive: {
        tintColor: "#000",
    },
    tinyLogoInActive: {
        tintColor: 'gray',
    },

    slidingTabContainer: {
        width: TAB_WIDTH,
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        position: 'absolute',
    },
    slidingTab: {
        width: 5,
        height: 5,
        borderRadius: 15,
        backgroundColor: "#000",
        marginTop: Dimensions.get('window').height * 0.06,
        position: 'absolute',
    },
});
export default TabNavigator;
