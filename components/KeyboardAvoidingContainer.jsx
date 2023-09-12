import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

const KeyboardAvoidingContainer = ({
    children,
    style,
    headerAvailable = true,
}) => {
    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={
                    headerAvailable ? headerHeight + 10 : 10
                }
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default KeyboardAvoidingContainer;
