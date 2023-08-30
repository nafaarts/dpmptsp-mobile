import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { useTheme } from "react-native-paper"

export default function TabsLayout() {
    const theme = useTheme()
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.colors.tabBar,
                    borderTopWidth: 0
                },
                tabBarActiveTintColor: theme.colors.secondary,
                headerShown: false,
                headerStyle: {
                    backgroundColor: theme.colors.tabBar,
                    shadowColor: 'transparent', // this covers iOS
                    elevation: 0, // this covers Android
                },
                headerTitleStyle: {
                    color: '#fff'
                },
            }}
            tabBar={(props) => {
                if (Platform.OS === "ios") {
                    return (
                        <BlurView
                            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
                            intensity={95}
                        >
                            <BottomTabBar {...props} />
                        </BlurView>
                    )
                } else {
                    return <BottomTabBar {...props} />
                }
            }}
        >
            <Tabs.Screen
                name="history"
                options={{
                    title: "Riwayat",
                    headerShown: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                        >
                            <TabBarIcon name="history" color={color} size={24} />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    title: "Beranda",
                    headerShown: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                        >
                            <TabBarIcon name="home" color={color} size={24} />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="account"
                options={{
                    title: "Profil",
                    headerShown: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                        >
                            <TabBarIcon name="user" color={color} size={24} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

// : {
//     name: React.ComponentProps<typeof FontAwesome>["name"];
//     color: string;
//     size?: number;
//   }

function TabBarIcon(props) {
    return (
        <FontAwesome
            size={props.size || 26}
            style={{ marginBottom: -3 }}
            {...props}
        />
    );
}
