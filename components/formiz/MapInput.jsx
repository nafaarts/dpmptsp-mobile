import MapView, { Marker } from "react-native-maps";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useField } from "@formiz/core";
import { PROVIDER_GOOGLE } from "react-native-maps";

const MapInput = (props) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [coordinates, setCoordinates] = useState({
        latitude: 5.54829,
        longitude: 95.323753,
    });

    const { errorMessage, setValue, value } = useField(props);
    const { label } = props;

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCoordinates({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setErrorMsg(null);
        setValue(coordinates);
    };

    useEffect(() => {
        setValue(coordinates);
        getCurrentLocation();
    }, []);

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    }

    return (
        <View style={{ flex: 1 }}>
            {label && (
                <Text style={{ fontSize: 16, marginBottom: 10, color: "#fff" }}>
                    {label}
                </Text>
            )}
            <View
                style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ height: 300, width: "100%" }}
                    region={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }}
                >
                    {coordinates && (
                        <Marker
                            coordinate={coordinates}
                            draggable
                            onDragEnd={(e) => {
                                console.log(e.nativeEvent.coordinate);
                                setCoordinates(e.nativeEvent.coordinate);
                            }}
                        />
                    )}
                </MapView>
                <TouchableOpacity
                    onPress={getCurrentLocation}
                    style={{
                        position: "absolute",
                        bottom: 15,
                        right: 15,
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "white",
                    }}
                >
                    <MaterialIcons name="my-location" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {errorMessage && (
                <Text
                    style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: 5,
                    }}
                >
                    {errorMessage}
                </Text>
            )}
            {errorMsg && (
                <Text
                    style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: 5,
                    }}
                >
                    {text}
                </Text>
            )}
        </View>
    );
};

export default MapInput;
