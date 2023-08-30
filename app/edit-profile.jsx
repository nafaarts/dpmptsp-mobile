import { View, Text } from 'react-native'
import React from 'react'
import { Formiz, FormizStep, useForm } from '@formiz/core'
import { isEmail, isNumber } from '@formiz/validations'
import Background from '../components/Background'
import TextInput from "../components/formiz/TextInput";
import Select from "../components/formiz/Select";
import DateInput from "../components/formiz/DateInput";
import Button from "../components/Button";
import { useTheme } from 'react-native-paper'

const EditProfile = () => {
    const theme = useTheme()
    const editProfileForm = useForm()
    const handleSubmit = (values) => {
        console.log(values)
    }
    return (
        <Background>
            <View style={{ flex: 1, paddingVertical: 20, width: '100%' }} >
                <Formiz
                    connect={editProfileForm}
                    onValidSubmit={handleSubmit}
                >
                    <FormizStep name='step1' as={View}>
                        <View style={{ width: '100%', gap: 20, marginBottom: 40 }}>
                            <TextInput
                                name="nama"
                                label="Nama"
                                required="Nama wajib di isi"
                                defaultValue="My initial value"
                            />
                            <TextInput
                                name="email"
                                label="Email"
                                required="Email is required"
                                validations={[
                                    {
                                        rule: isEmail(),
                                        message: 'Masukan email yang valid',
                                    },
                                ]}
                            />
                            <TextInput
                                name="nik"
                                label="Nomor Induk Kependudukan"
                                required="Nik is required"
                                validations={[
                                    {
                                        rule: isNumber(),
                                        message: 'Masukan angka',
                                    },
                                ]}
                            />
                            <Select
                                data={["Laki-laki", 'Perempuan']}
                                defaultValue="Laki-laki"
                                name="jenis_kelamin"
                                label="Jenis Kelamin"
                            />

                            <TextInput
                                name="no_telpon"
                                label="Nomor Handphone"
                                required="Nomor Handphone wajib di isi"
                                validations={[
                                    {
                                        rule: isNumber(),
                                        message: 'Masukan angka',
                                    },
                                ]}
                            />
                        </View>
                    </FormizStep>
                    <FormizStep name='step2' as={View}>
                        <View style={{ width: '100%', gap: 20, marginBottom: 40 }}>
                            <TextInput
                                name="tempat_lahir"
                                label="Tempat Lahir"
                                required="Tempat lahir wajib di isi"
                            />
                            <DateInput
                                name="tanggal_lahir"
                                label="Tanggal Lahir"
                                required="Tanggal Lahir wajib di isi"
                            />
                            <TextInput
                                name="pekerjaan"
                                label="Pekerjaan"
                            />
                            <TextInput
                                name="alamat"
                                label="Alamat"
                                required="Alamat wajib di isi"
                            />
                        </View>
                    </FormizStep>

                    <View style={{ alignItems: 'center', width: '100%', gap: 20 }}>
                        {editProfileForm.isLastStep ? (
                            <Button
                                icon="check"
                                mode="contained"
                                buttonColor={theme.colors.secondary}
                                textColor={theme.colors.dark}
                                onPress={editProfileForm.submit}
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
                            <Button
                                onPress={editProfileForm.prevStep}>
                                <Text>Kembali</Text>
                            </Button>
                        )}
                    </View>
                </Formiz>
            </View>
        </Background>
    )
}

export default EditProfile