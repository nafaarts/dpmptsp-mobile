import Background from "../components/Background";
import { View, Text, Alert } from "react-native";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import { router, useLocalSearchParams } from "expo-router";
import tipePengaduan from "../utils/pengaduanType";
import { Formiz, useForm } from "@formiz/core";
import TextInput from "../components/formiz/TextInput";
import DateInput from "../components/formiz/DateInput";
import MapInput from "../components/formiz/MapInput";
import Button from "../components/Button";
import { useTheme } from "react-native-paper";
import ImageInput from "../components/ImageInput";
import { useState } from "react";
import axios from "../utils/Axios";

const BuatPengaduan = () => {
    const { kategori } = useLocalSearchParams();
    const buatPengaduanForm = useForm();
    const theme = useTheme();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const prepareFilesForUpload = (files) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append(`foto_bukti[]`, {
                uri: file.uri,
                name: file.name,
                type: file.type,
            });
        });
        return formData;
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        const formData = prepareFilesForUpload(images);

        formData.append("kategori", kategori);
        formData.append("nomor_referensi", values.nomor_referensi);
        formData.append("tanggal_kejadian", values.tanggal_kejadian);
        formData.append("laporan", values.laporan);
        formData.append("alamat", values.alamat);
        formData.append("patokan", values.patokan);

        formData.append("latitude", values.coordinate.latitude || 0);
        formData.append("longitude", values.coordinate.longitude || 0);

        try {
            const result = await axios.post("/pengaduan", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            Alert.alert("Berhasil", result.data.message);
            router.push("/home");
        } catch (error) {
            setLoading(false);
            Alert.alert("Terjadi kesalahan", error.response?.data?.message);
        }
    };

    return (
        <Background>
            <KeyboardAvoidingContainer>
                <Formiz
                    connect={buatPengaduanForm}
                    onValidSubmit={handleSubmit}
                >
                    <View style={{ width: "100%", gap: 20, marginBottom: 40 }}>
                        {kategori !== "lainnya" && (
                            <TextInput
                                name="nomor_referensi"
                                label="Nomor Referensi"
                                required="Nomor referensi wajib di isi"
                            />
                        )}

                        <DateInput
                            name="tanggal_kejadian"
                            label="Tanggal Kejadian"
                            required="Tanggal kejadian wajib di isi"
                        />

                        <TextInput
                            name="alamat"
                            label="Alamat"
                            required="Alamat wajib di isi"
                        />

                        <TextInput name="patokan" label="Patokan" />

                        <MapInput
                            name="coordinate"
                            label="Koordinat"
                            required="Koordinat wajib di isi"
                        />

                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginBottom: 5,
                                    color: "#fff",
                                }}
                            >
                                kategori
                            </Text>
                            <View
                                style={{
                                    padding: 16,
                                    backgroundColor: "#d3d3d3",
                                    borderRadius: 3,
                                }}
                            >
                                <Text style={{ fontSize: 16 }}>
                                    {tipePengaduan(kategori)}
                                </Text>
                            </View>
                        </View>

                        <TextInput
                            numberOfLines={4}
                            name="laporan"
                            label="Laporan"
                            required="Laporan wajib di isi"
                        />

                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginBottom: 5,
                                    color: "#fff",
                                }}
                            >
                                Foto Bukti
                            </Text>
                            <ImageInput
                                onChange={(images) => setImages(images)}
                            />
                        </View>

                        <Button
                            icon="check"
                            mode="contained"
                            buttonColor={theme.colors.secondary}
                            textColor={theme.colors.dark}
                            onPress={buatPengaduanForm.submit}
                            disabled={loading}
                            loading={loading}
                        >
                            SIMPAN
                        </Button>
                    </View>
                </Formiz>
            </KeyboardAvoidingContainer>
        </Background>
    );
};

export default BuatPengaduan;
