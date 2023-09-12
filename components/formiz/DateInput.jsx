import React, { useEffect, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useField } from "@formiz/core";

const DateInput = (props) => {
    const { label, required } = props;
    const { value, setValue } = useField(props);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let dateTimeString =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        setValue(dateTimeString);

        setDate(date);
        hideDatePicker();
    };

    useEffect(() => {
        if (!value) {
            setValue(
                date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate()
            );
        }
    }, []);

    return (
        <View
            style={{
                width: "100%",
            }}
        >
            {label && (
                <Text style={{ fontSize: 16, marginBottom: 10, color: "#fff" }}>
                    {label} {required && "*"}
                </Text>
            )}
            <TouchableHighlight onPress={showDatePicker}>
                <View
                    style={{
                        padding: 16,
                        backgroundColor: "#fff",
                        borderRadius: 3,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>{value}</Text>
                </View>
            </TouchableHighlight>

            {isDatePickerVisible && (
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    value={date}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            )}
        </View>
    );
};

export default DateInput;
