import { View, Text, Alert } from "react-native";
import React from "react";
import { Formiz, FormizStep, useForm } from "@formiz/core";
import { isEmail, isNumber } from "@formiz/validations";
import Background from "../components/Background";
import TextInput from "../components/formiz/TextInput";
import Select from "../components/formiz/Select";
import DateInput from "../components/formiz/DateInput";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { useTheme } from "react-native-paper";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { getData, putData } from "../api/fetcher";
import { router } from "expo-router";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";

const EditProfile = () => {
    const { data: user, error: userError } = useSWR("/user", getData);
    const { trigger, isMutating } = useSWRMutation("/edit-profil", putData);
    const { cache, mutate } = useSWRConfig();

    const theme = useTheme();
    const editProfileForm = useForm();

    const handleSubmit = async (values) => {
        try {
            const result = await trigger({
                ...values,
                jenis_kelamin: values.jenis_kelamin === "Laki-laki" ? "L" : "P",
            });
            mutate("/user", {
                ...user,
                email: values.email,
                nama: values.nama,
            });
            Alert.alert("Berhasil", result.message);
            router.push("/account");
        } catch (error) {
            Alert.alert("Terjadi kesalahan", error.response.data.message);
        }
    };

    if (userError) {
        return (
            <Background>
                <Text style={{ fontSize: 26, color: "#fff" }}>
                    {userError.response.data.message}
                </Text>
            </Background>
        );
    }

    if (!user) return <Loading />;

    return (
        <Background>
            <KeyboardAvoidingContainer>
                <Formiz connect={editProfileForm} onValidSubmit={handleSubmit}>
                    <FormizStep
                        name="step1"
                        as={View}
                        style={{ gap: 20, marginBottom: 40 }}
                    >
                        <TextInput
                            name="nama"
                            label="Nama"
                            required="Nama wajib di isi"
                            defaultValue={user.nama}
                        />
                        <TextInput
                            name="email"
                            label="Email"
                            required="Email is required"
                            defaultValue={user.email}
                            validations={[
                                {
                                    rule: isEmail(),
                                    message: "Masukan email yang valid",
                                },
                            ]}
                        />
                        <TextInput
                            name="nik"
                            label="Nomor Induk Kependudukan"
                            required="Nik is required"
                            defaultValue={user.nik}
                            validations={[
                                {
                                    rule: isNumber(),
                                    message: "Masukan angka",
                                },
                            ]}
                        />
                        <Select
                            data={["Laki-laki", "Perempuan"]}
                            defaultValue={
                                user.jenis_kelamin === "L"
                                    ? "Laki-laki"
                                    : "Perempuan"
                            }
                            name="jenis_kelamin"
                            label="Jenis Kelamin"
                        />

                        <TextInput
                            name="no_telpon"
                            label="Nomor Handphone"
                            required="Nomor Handphone wajib di isi"
                            defaultValue={user.no_telpon}
                            validations={[
                                {
                                    rule: isNumber(),
                                    message: "Masukan angka",
                                },
                            ]}
                        />
                    </FormizStep>
                    <FormizStep
                        name="step2"
                        as={View}
                        style={{ gap: 20, marginBottom: 40 }}
                    >
                        <TextInput
                            name="tempat_lahir"
                            label="Tempat Lahir"
                            required="Tempat lahir wajib di isi"
                            defaultValue={user.tempat_lahir}
                        />
                        <DateInput
                            name="tanggal_lahir"
                            label="Tanggal Lahir"
                            required="Tanggal Lahir wajib di isi"
                            defaultValue={user.tanggal_lahir}
                        />
                        <TextInput
                            name="pekerjaan"
                            label="Pekerjaan"
                            defaultValue={user.pekerjaan}
                        />
                        <TextInput
                            name="alamat"
                            label="Alamat"
                            required="Alamat wajib di isi"
                            defaultValue={user.alamat}
                        />
                    </FormizStep>
                    <View style={{ alignItems: "center", gap: 20 }}>
                        {editProfileForm.isLastStep ? (
                            <Button
                                icon="check"
                                mode="contained"
                                buttonColor={theme.colors.secondary}
                                textColor={theme.colors.dark}
                                onPress={editProfileForm.submit}
                                disabled={isMutating}
                                loading={isMutating}
                            >
                                SIMPAN
                            </Button>
                        ) : (
                            <Button
                                icon="arrow-right"
                                mode="contained"
                                buttonColor={theme.colors.secondary}
                                textColor={theme.colors.dark}
                                onPress={editProfileForm.submitStep}
                            >
                                SELANJUTNYA
                            </Button>
                        )}

                        {!editProfileForm.isFirstStep && (
                            <Button onPress={editProfileForm.prevStep}>
                                <Text>Kembali</Text>
                            </Button>
                        )}
                    </View>
                </Formiz>
            </KeyboardAvoidingContainer>
        </Background>
    );
};

export default EditProfile;
