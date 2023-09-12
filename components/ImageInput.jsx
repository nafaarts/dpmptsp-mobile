import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ImageCard = ({ src, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ImageBackground
                source={src}
                resizeMode="cover"
                style={{
                    flex: 1,
                    justifyContent: "center",
                    height: 50,
                    width: 50,
                }}
            ></ImageBackground>
        </TouchableOpacity>
    );
};

const ImageInputBtn = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    backgroundColor: "lightgray",
                }}
            >
                <FontAwesome size={26} name="plus" />
            </View>
        </TouchableOpacity>
    );
};

const ImageInput = ({ onChange }) => {
    const [images, setImages] = useState([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            result.assets.map((image) => {
                let localUri = image.uri;
                let filename = localUri.split("/").pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;

                setImages((image) => {
                    return [...image, { uri: localUri, name: filename, type }];
                });
            });
        }
    };

    useEffect(() => {
        onChange(images);
    }, [images]);

    return (
        <ScrollView
            horizontal
            style={{
                backgroundColor: "#fff",
                borderRadius: 5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    padding: 5,
                    gap: 5,
                }}
            >
                {images.map((image, index) => {
                    return (
                        <ImageCard
                            key={index}
                            src={{ uri: image.uri }}
                            onPress={() => {
                                let currentImage = image.name;
                                Alert.alert("Konfirmasi", "Hapus gambar ini?", [
                                    {
                                        text: "hapus",
                                        onPress: () => {
                                            setImages(
                                                images.filter(
                                                    (image) =>
                                                        image.name !==
                                                        currentImage
                                                )
                                            );
                                        },
                                        style: "default",
                                    },
                                    { text: "tidak" },
                                ]);
                            }}
                        />
                    );
                })}
                <ImageInputBtn onPress={pickImage} />
            </View>
        </ScrollView>
    );
};

export default ImageInput;
