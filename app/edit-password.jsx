import { View, Text } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import { Formiz, useForm } from '@formiz/core'
import { isPattern } from '@formiz/validations'
import TextInput from "../components/formiz/TextInput";
import Button from "../components/Button";
import { useTheme } from 'react-native-paper'

const EditPassword = () => {
    const theme = useTheme()
    const editPasswordForm = useForm()
    const handleSubmit = (values) => {
        console.log(values)
    }
    return (
        <Background>
            <View style={{ flex: 1, paddingVertical: 20, width: '100%' }} >
                <Formiz
                    connect={editPasswordForm}
                    onValidSubmit={handleSubmit}
                >
                    <View style={{ width: '100%', gap: 20, marginBottom: 40 }}>
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
                                    rule: isPattern(editPasswordForm.values.new_password),
                                    message: 'Password tidak sama',
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
                    >
                        SIMPAN
                    </Button>
                </Formiz>
            </View>
        </Background>
    )
}

export default EditPassword