import React from "react";
import Background from "../../components/Background";
import useSWR from "swr";
import { getData } from "../../api/fetcher";
import Loading from "../../components/Loading";
import { Card, Divider, Text, useTheme } from "react-native-paper";
import { Pressable, ScrollView, View } from "react-native";
import tipePengaduan from "../../utils/pengaduanType";
import { Link } from "expo-router";

const history = () => {
    const theme = useTheme();
    const { data, error } = useSWR("/pengaduan", getData, {
        refreshInterval: 5000,
    });

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ gap: 10 }}>
                    {data.data?.map((pengaduan, index) => {
                        return (
                            <View key={index}>
                                <Link
                                    href={{
                                        pathname: "/detail-pengaduan",
                                        params: {
                                            idPengaduan: pengaduan.id,
                                        },
                                    }}
                                    asChild
                                >
                                    <Pressable>
                                        <Card
                                            style={{
                                                backgroundColor:
                                                    theme.colors.primary,
                                            }}
                                        >
                                            <Card.Content>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text
                                                        variant="headlineSmall"
                                                        style={{
                                                            marginBottom: 5,
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {tipePengaduan(
                                                            pengaduan.kategori
                                                        )}
                                                    </Text>
                                                    <Text variant="bodyMedium">
                                                        {
                                                            pengaduan.tanggal_kejadian
                                                        }
                                                    </Text>
                                                </View>
                                                <Divider
                                                    style={{
                                                        marginVertical: 10,
                                                    }}
                                                />
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Text
                                                        variant="bodyMedium"
                                                        style={{
                                                            fontStyle: "italic",
                                                        }}
                                                    >
                                                        {pengaduan.status}
                                                    </Text>
                                                    {pengaduan.sudah_ditanggapi && (
                                                        <View
                                                            style={{
                                                                paddingVertical: 4,
                                                                paddingHorizontal: 6,
                                                                backgroundColor:
                                                                    "green",
                                                                width: "fit-content",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    color: "#fff",
                                                                    fontSize: 10,
                                                                }}
                                                            >
                                                                Sudah Ditanggapi
                                                            </Text>
                                                        </View>
                                                    )}
                                                </View>
                                            </Card.Content>
                                        </Card>
                                    </Pressable>
                                </Link>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </Background>
    );
};

export default history;
