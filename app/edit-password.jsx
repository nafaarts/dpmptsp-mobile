import { View, Alert } from "react-native";
import React from "react";
import Background from "../components/Background";
import { Formiz, useForm } from "@formiz/core";
import { isPattern } from "@formiz/validations";
import TextInput from "../components/formiz/TextInput";
import Button from "../components/Button";
import { ActivityIndicator, useTheme, MD2Colors } from "react-native-paper";
import useSWRMutation from "swr/mutation";
import { putData } from "../api/fetcher";
import { router } from "expo-router";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";

const EditPassword = () => {
    const { trigger, isMutating } = useSWRMutation("/edit-password", putData);

    const theme = useTheme();
    const editPasswordForm = useForm();

    const handleSubmit = async (values) => {
        try {
            const result = await trigger({
                current_password: values.password,
                password: values.new_password,
                password_confirmation: values.password_confirmation,
            });
            Alert.alert("Berhasil", result.message);
            router.push("/account");
        } catch (error) {
            Alert.alert("Terjadi kesalahan", error.response.data.message);
        }
    };

    return (
        <Background>
            <KeyboardAvoidingContainer>
                <Formiz connect={editPasswordForm} onValidSubmit={handleSubmit}>
                    <View style={{ width: "100%", gap: 20, marginBottom: 40 }}>
                        <TextInput
                            name="password"
                            label="Password Sekarang"
                            required="Password wajib di isi"
                            secureTextEntry
                        />
                        <TextInput
                            name="new_password"
                            label="Password Baru"
                            required="Password baru wajib di isi"
                            secureTextEntry
                        />
                        <TextInput
                            name="password_confirmation"
                            label="Ulangi Password"
                            required="Ulangi password wajib di isi"
                            secureTextEntry
                            validations={[
                                {
                                    rule: isPattern(
                                        editPasswordForm.values.new_password
                                    ),
                                    message: "Password tidak sama",
                                },
                            ]}
                        />
                    </View>

                    <Button
                        icon="check"
                        mode="contained"
                        buttonColor={theme.colors.secondary}
                        textColor={theme.colors.dark}
                        onPress={editPasswordForm.submit}
                        disabled={isMutating}
                        loading={isMutating}
                    >
                        SIMPAN
                    </Button>
                </Formiz>
            </KeyboardAvoidingContainer>
        </Background>
    );
};

export default EditPassword;
