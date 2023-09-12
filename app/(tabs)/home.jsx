import { View, ScrollView, Pressable } from "react-native";
import React from "react";
import Background from "../../components/Background";
import { Text, useTheme } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Card } from "react-native-paper";

const PengaduanCard = ({ label, href }) => {
    const theme = useTheme();
    return (
        <Link href={href} asChild>
            <Pressable style={{ marginBottom: 10 }}>
                <Card style={{ backgroundColor: theme.colors.primary }}>
                    <Card.Content
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text variant="titleSmall">Pengaduan</Text>
                            <Text
                                variant="headlineSmall"
                                style={{ fontWeight: "bold" }}
                            >
                                {label}
                            </Text>
                        </View>
                        <FontAwesome name="arrow-right" size={26} />
                    </Card.Content>
                </Card>
            </Pressable>
        </Link>
    );
};

const home = () => {
    return (
        <Background>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: "100%" }}
            >
                <PengaduanCard
                    label="SIP/SIK"
                    href={{
                        pathname: "/buat-pengaduan",
                        params: {
                            kategori: "sip_sik",
                        },
                    }}
                />
                <PengaduanCard
                    label="OSS/RBA"
                    href={{
                        pathname: "/buat-pengaduan",
                        params: {
                            kategori: "oss_rba",
                        },
                    }}
                />
                <PengaduanCard
                    label="IMB/PBG"
                    href={{
                        pathname: "/buat-pengaduan",
                        params: {
                            kategori: "imb_pbg",
                        },
                    }}
                />
                <PengaduanCard
                    label="Reklame"
                    href={{
                        pathname: "/buat-pengaduan",
                        params: {
                            kategori: "reklame",
                        },
                    }}
                />
                <PengaduanCard
                    label="Lainnya"
                    href={{
                        pathname: "/buat-pengaduan",
                        params: {
                            kategori: "lainnya",
                        },
                    }}
                />
            </ScrollView>
        </Background>
    );
};

export default home;
