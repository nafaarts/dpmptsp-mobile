import React from "react";
import {
    Stack,
    router,
    useSegments,
    useRootNavigationState,
} from "expo-router";
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from "react-native-paper";
import useAuth from "../stores/useAuth";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#FFFEAA",
        secondary: "#FFFEAA",
        background: "#172554",
        dark: "#000",
        tabBar: "#142048",
    },
};

const useProtectedRoute = (token) => {
    const segments = useSegments();
    const navigationState = useRootNavigationState();

    React.useEffect(() => {
        if (!navigationState?.key) return;

        const inAuthGroup = segments[0] === "(auth)";
        if (!token && !inAuthGroup) {
            router.replace("/login");
        } else if (token && inAuthGroup) {
            router.replace("/");
        }
    }, [token, segments, navigationState]);
};

export default () => {
    const { token } = useAuth();
    useProtectedRoute(token);

    return (
        <PaperProvider theme={theme}>
            <Stack
                screenOptions={{
                    animation: "none",
                    headerStyle: {
                        backgroundColor: theme.colors.tabBar,
                        shadowColor: "transparent", // this covers iOS
                        elevation: 0, // this covers Android
                    },
                    headerTitleStyle: {
                        color: "#fff",
                    },
                    headerTintColor: "#fff",
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="buat-pengaduan"
                    options={{
                        title: "Buat Pengaduan",
                    }}
                />

                <Stack.Screen
                    name="detail-pengaduan"
                    options={{
                        title: "Detail Pengaduan",
                    }}
                />

                <Stack.Screen
                    name="edit-profile"
                    options={{
                        title: "Edit Profil",
                    }}
                />

                <Stack.Screen
                    name="edit-password"
                    options={{
                        title: "Edit Password",
                    }}
                />
                <Stack.Screen
                    name="tentang"
                    options={{
                        title: "Tentang Aplikasi",
                        presentation: "modal",
                    }}
                />
                <Stack.Screen
                    name="logout"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </PaperProvider>
    );
};
