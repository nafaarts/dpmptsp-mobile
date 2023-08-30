import Background from "../../components/Background";
import TextInput from "../../components/formiz/TextInput";
import { Formiz, useForm, FormizStep } from '@formiz/core'
import { isEmail, isNumber, isPattern } from '@formiz/validations'
import { Image, Text, View } from "react-native";
import Button from "../../components/Button";
import { useTheme, Divider } from 'react-native-paper';
import { Link } from "expo-router";
import Select from "../../components/formiz/Select";
import DateInput from "../../components/formiz/DateInput";
import { signUp } from "../../services/auth.service"
import * as Device from 'expo-device';

const register = () => {
    const theme = useTheme()
    const registerForm = useForm()

    const handleSubmit = (values) => {
        console.log(values)
        signUp({ ...values, device_name: Device.deviceName || 'Laptop' })
            .then(response => {
                // login({
                //     token: response.data.access_token
                // })
                console.log('logged in, token: ', response.data.access_token)
            })
            .catch(error => {
                console.error(error)
                alert('Terjadi kesalahan!')
            })
    }
    return (
        <Background>
            <View style={{ alignItems: 'center', gap: 25 }}>
                <Image source={require('../../assets/logo.png')} style={{
                    height: 100,
                    width: 100
                }} />
                <Text style={{
                    fontSize: 20,
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    BUAT AKUN ANDA
                </Text>
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <Formiz
                connect={registerForm}
                onValidSubmit={handleSubmit}
            >
                {/* // form */}
                <FormizStep name="step1" as={View} style={{ width: '100%', gap: 20, marginBottom: 40, paddingHorizontal: 20 }}>
                    <TextInput
                        name="nama"
                        label="Nama Lengkap"
                        required="Nama wajib di isi"
                    />
                    <TextInput
                        name="nik"
                        label="Nomor Induk Kependudukan"
                        required="Nik wajib di isi"
                        validations={[
                            {
                                rule: isNumber(),
                                message: 'Masukan angka',
                            },
                        ]}
                    />
                </FormizStep>

                <FormizStep name="step2" as={View} style={{ width: '100%', gap: 20, marginBottom: 40, paddingHorizontal: 20 }}>
                    <TextInput
                        name="tempat_lahir"
                        label="Tempat Lahir"
                        required="Tempat Lahir wajib di isi"
                    />
                    <DateInput
                        name="tanggal_lahir"
                        label="Tanggal Lahir"
                        required="Tanggal Lahir wajib di isi"
                    />
                    <Select
                        data={["Laki-laki", 'Perempuan']}
                        defaultValue="Laki-laki"
                        name="jenis_kelamin"
                        label="Jenis Kelamin"
                    />
                </FormizStep>

                <FormizStep name="step3" as={View} style={{ width: '100%', gap: 20, marginBottom: 40, paddingHorizontal: 20 }}>
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
                    <TextInput
                        name="pekerjaan"
                        label="Pekerjaan"
                    />
                    <TextInput
                        name="alamat"
                        label="Alamat"
                        required="Alamat wajib di isi"
                    />
                </FormizStep>

                <FormizStep name="step4" as={View} style={{ width: '100%', gap: 20, marginBottom: 40, paddingHorizontal: 20 }}>
                    <TextInput
                        name="email"
                        label="Email"
                        required="Email wajib di isi"
                        validations={[
                            {
                                rule: isEmail(),
                                message: 'Masukan email yang valid',
                            },
                        ]}
                    />
                    <TextInput
                        name="password"
                        label="Password"
                        required="Password wajib di isi"
                        secureTextEntry={true}
                    />
                    <TextInput
                        name="ulangi_password"
                        label="Ulangi Password"
                        required="Ulangi Password wajib di isi"
                        secureTextEntry={true}
                        validations={[
                            {
                                rule: isPattern(registerForm.values.password),
                                message: 'Password tidak sama',
                            },
                        ]}
                    />
                </FormizStep>

                <View style={{ alignItems: 'center', width: '100%', gap: 20, paddingHorizontal: 20 }}>
                    {registerForm.isLastStep ? (
                        <Button
                            icon="login"
                            mode="contained"
                            buttonColor={theme.colors.secondary}
                            textColor={theme.colors.dark}
                            onPress={registerForm.submit}
                        >
                            DAFTAR
                        </Button>
                    ) : (
                        <Button
                            icon="arrow-right"
                            mode="contained"
                            buttonColor={theme.colors.secondary}
                            textColor={theme.colors.dark}
                            onPress={registerForm.submitStep}
                        >
                            SELANJUTNYA
                        </Button>
                    )}

                    {!registerForm.isFirstStep ? (
                        <Button
                            onPress={registerForm.prevStep}>
                            <Text>Kembali</Text>
                        </Button>
                    ) : (
                        <View
                            style={{ flexDirection: 'row', gap: 5 }}>
                            <Text
                                style={{
                                    color: '#fff'
                                }}>
                                Sudah Punya Akun!
                            </Text>
                            <Link
                                replace
                                href="/login"
                                style={{
                                    color: '#fff'
                                }}>
                                Login Saja
                            </Link>
                        </View>
                    )}
                </View>
            </Formiz>
        </Background>
    )
}

export default register