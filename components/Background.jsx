import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";

const Background = ({ children, style }) => {
    const theme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <View
                style={[
                    styles.background,
                    { backgroundColor: theme.colors.background },
                    style,
                ]}
            >
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 20,
        width: "100%",
    },
});

export default memo(Background);
