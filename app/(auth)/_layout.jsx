import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                animation: "none",
                headerShown: false,
            }}
        >
            <Stack.Screen name="register" />
            <Stack.Screen name="login" />
        </Stack>
    );
}
