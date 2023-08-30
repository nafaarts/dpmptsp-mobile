import React, { memo } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from "react-native-paper";

const Background = ({ children }) => {
    const theme = useTheme()
    return (
        <View style={{ ...styles.background, backgroundColor: theme.colors.background }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView style={styles.container} behavior='height'>
                {children}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(Background);