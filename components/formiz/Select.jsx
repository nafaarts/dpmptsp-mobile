import React from "react";
import { useField } from "@formiz/core";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

const Select = (props) => {
    const { setValue } = useField(props);
    const { label, data, defaultValue, placeholder } = props;
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View
            style={{
                width: "100%",
            }}
        >
            {label && (
                <Text style={{ fontSize: 16, marginBottom: 10, color: "#fff" }}>
                    {label}
                </Text>
            )}
            <SelectDropdown
                data={data}
                defaultValue={defaultValue}
                onSelect={(selectedItem) => setValue(selectedItem)}
                defaultButtonText={placeholder}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                rowTextForSelection={(item) => item}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                    return (
                        <FontAwesome
                            name={isOpened ? "chevron-up" : "chevron-down"}
                            color={"#444"}
                            size={18}
                        />
                    );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#444",
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default Select;
