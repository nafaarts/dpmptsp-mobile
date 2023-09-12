import {
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Background from "../components/Background";
import Loading from "../components/Loading";
import useSWR from "swr";
import { getData, putData } from "../api/fetcher";
import { Card, Divider, Text } from "react-native-paper";
import tipePengaduan from "../utils/pengaduanType";
import ImageView from "react-native-image-viewing";
import { BASE_URL } from "../utils/Axios";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import useSWRMutation from "swr/mutation";
import { PROVIDER_GOOGLE } from "react-native-maps";

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

const ImageWrapper = ({ images }) => {
    const [visible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View>
            <ScrollView horizontal>
                <View style={{ flexDirection: "row", gap: 5, padding: 5 }}>
                    {images.map((image, index) => {
                        return (
                            <ImageCard
                                key={index}
                                src={image}
                                onPress={() => {
                                    setCurrentIndex(index);
                                    setIsVisible(true);
                                }}
                            />
                        );
                    })}
                </View>
            </ScrollView>

            <ImageView
                images={images}
                imageIndex={currentIndex}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    );
};

const DetailPengaduan = () => {
    const { idPengaduan } = useLocalSearchParams();
    const { data, error, mutate } = useSWR(
        `/pengaduan/${idPengaduan}`,
        getData,
        {
            refreshInterval: 5000,
        }
    );

    const { trigger, isMutating } = useSWRMutation(
        `/pengaduan/${idPengaduan}/selesai`,
        putData
    );

    const handleKonfirmasiSelesai = async () => {
        try {
            const result = await trigger({});
            Alert.alert("Berhasil", result?.message);
            mutate();
        } catch (error) {
            console.error(error);
            Alert.alert("Terjadi kesalahan", error.response?.data?.message);
        }
    };

    if (error) {
        return (
            <Background>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 26, color: "#fff" }}>
                        {error.message ?? "Opps, Something went wrong!"}
                    </Text>
                </View>
            </Background>
        );
    }

    if (!data?.data) {
        return <Loading />;
    }

    return (
        <Background>
            <View style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 10,
                    }}
                >
                    <Card>
                        <Card.Content style={{ flexDirection: "row", gap: 15 }}>
                            <View style={{ gap: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Kategori
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    Status
                                </Text>
                                {data.data.kategori !== "lainnya" && (
                                    <Text style={{ fontWeight: "bold" }}>
                                        Nomor Referensi
                                    </Text>
                                )}
                                <Text style={{ fontWeight: "bold" }}>
                                    Tanggal Kejadian
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    Alamat
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    Patokan
                                </Text>
                            </View>
                            <View style={{ gap: 5 }}>
                                <Text>{tipePengaduan(data.data.kategori)}</Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    {data.data.status}
                                </Text>
                                {data.data.kategori !== "lainnya" && (
                                    <Text>{data.data.nomor_referensi}</Text>
                                )}
                                <Text>{data.data.tanggal_kejadian}</Text>
                                <Text>{data.data.alamat}</Text>
                                <Text>{data.data.patokan}</Text>
                            </View>
                        </Card.Content>
                        <Divider style={{ marginVertical: 10 }} />
                        <Card.Content style={{ gap: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Laporan</Text>
                            <Text>{data.data.laporan}</Text>
                        </Card.Content>
                        <Divider style={{ marginVertical: 10 }} />
                        <Card.Content>
                            <ImageWrapper
                                images={data?.data?.files.map((file) => {
                                    return {
                                        uri:
                                            BASE_URL +
                                            "/storage/" +
                                            file.file_name,
                                    };
                                })}
                            />
                        </Card.Content>
                    </Card>

                    {data.data.tanggapan && (
                        <Card>
                            <Card.Content style={{ gap: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Tanggapan
                                </Text>
                                <Text>{data.data.tanggapan.tanggapan}</Text>
                            </Card.Content>
                            <Divider style={{ marginVertical: 10 }} />
                            <Card.Content>
                                <ImageWrapper
                                    images={data?.data?.tanggapan?.files.map(
                                        (file) => ({
                                            uri:
                                                BASE_URL +
                                                "/storage/" +
                                                file.file_name,
                                        })
                                    )}
                                />
                            </Card.Content>
                        </Card>
                    )}

                    <Card>
                        <Card.Content style={{ gap: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Posisi</Text>
                        </Card.Content>
                        <Divider style={{ marginVertical: 10 }} />
                        <Card.Content>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={{ height: 200, width: "100%" }}
                                region={{
                                    latitude: parseFloat(data.data.latitude),
                                    longitude: parseFloat(data.data.longitude),
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.025,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: parseFloat(
                                            data.data.latitude
                                        ),
                                        longitude: parseFloat(
                                            data.data.longitude
                                        ),
                                    }}
                                />
                            </MapView>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>
            {!["diajukan", "selesai"].includes(data.data.status) && (
                <TouchableOpacity
                    disabled={isMutating}
                    onPress={() => {
                        Alert.alert(
                            "Konfirmasi",
                            "Konfirmasi pengaduan menjadi selesai?",
                            [
                                {
                                    text: "Ya",
                                    style: "default",
                                    onPress: () => handleKonfirmasiSelesai(),
                                },
                                {
                                    text: "Tidak",
                                    style: "cancel",
                                    onPress: () => {},
                                },
                            ]
                        );
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: "green",
                            marginTop: 10,
                            gap: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FontAwesome name="check" size={16} color="#fff" />
                        <Text style={{ fontSize: 16, color: "#fff" }}>
                            KONFIRMASI SELESAI
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </Background>
    );
};

export default DetailPengaduan;
