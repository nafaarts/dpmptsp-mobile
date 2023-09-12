import React from "react";
import { useField } from "@formiz/core";
import { TextInput as Input, useTheme } from "react-native-paper";
import { View, Text } from "react-native";

const TextInput = (props) => {
    const theme = useTheme();
    const {
        errorMessage,
        id,
        isValid,
        isPristine,
        isSubmitted,
        resetKey,
        setValue,
        value,
    } = useField(props);
    const {
        label,
        mode,
        placeholder,
        required,
        secureTextEntry,
        numberOfLines,
    } = props;
    const [isFocused, setIsFocused] = React.useState(false);
    const showError = !isValid && (!isPristine || isSubmitted);

    return (
        <View
            style={{
                width: "100%",
            }}
        >
            {label && (
                <Text style={{ fontSize: 16, marginBottom: 5, color: "#fff" }}>
                    {label} {required && "*"}
                </Text>
            )}
            <Input
                multiline={numberOfLines > 0}
                numberOfLines={numberOfLines}
                key={resetKey}
                testID={id}
                mode={mode || "outlined"}
                activeOutlineColor={theme.colors.secondary}
                placeholder={placeholder || ""}
                error={showError}
                value={value || ""}
                onChangeText={(e) => setValue(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={secureTextEntry || false}
                style={{
                    borderRadius: 0,
                    backgroundColor: "#fff",
                    padding: 2,
                }}
            />
            {showError && (
                <Text style={{ fontSize: 16, marginTop: 10, color: "red" }}>
                    {errorMessage}
                </Text>
            )}
        </View>
    );
};

export default TextInput;
