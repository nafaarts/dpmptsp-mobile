import Background from "../../components/Background";
import TextInput from "../../components/formiz/TextInput";
import { Formiz, useForm } from '@formiz/core'
import { isEmail } from '@formiz/validations'
import { Alert, Image, Text, View } from "react-native";
import Button from "../../components/Button";
import { useTheme, Divider } from 'react-native-paper';
import { Link } from "expo-router";
import { signIn } from "../../services/auth.service";
import useAuth from "../../stores/useAuth";
import * as Device from 'expo-device';

export default function Login() {
    const theme = useTheme()
    const loginForm = useForm()
    const { login } = useAuth()

    const handleSubmit = (values) => {
        signIn({ ...values, device_name: Device.deviceName || 'Laptop' })
            .then(response => {
                login({
                    token: response.data.access_token
                })
                console.log('logged in, token: ', response.data.access_token)
            })
            .catch(error => {
                Alert.alert('Gagal', error?.response?.data?.message)
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
                    MASUK KE AKUN ANDA
                </Text>
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <Formiz
                connect={loginForm}
                onValidSubmit={handleSubmit}
            >
                <View style={{ width: '100%', gap: 20, marginBottom: 40, paddingHorizontal: 20 }}>
                    <TextInput
                        name="email"
                        label="Email"
                        required="Email is required"
                        validations={[
                            {
                                rule: isEmail(),
                                message: 'Masukan email yang valid',
                            },
                        ]} />
                    <TextInput
                        name="password"
                        label="Password"
                        required="Password wajib di isi"
                        secureTextEntry
                    />
                </View>
                <View style={{ alignItems: 'center', width: '100%', gap: 20, paddingHorizontal: 20 }}>
                    <Button
                        icon="login"
                        mode="contained"
                        buttonColor={theme.colors.secondary}
                        textColor={theme.colors.dark}
                        onPress={loginForm.submit}
                    >
                        MASUK
                    </Button>
                    <View
                        style={{ flexDirection: 'row', gap: 5 }}>
                        <Text
                            style={{
                                color: '#fff'
                            }}>
                            Belum Punya Akun?
                        </Text>
                        <Link
                            replace
                            href="/register"
                            style={{
                                color: '#fff'
                            }}>
                            Daftar
                        </Link>
                    </View>
                </View>
            </Formiz>
        </Background>
    );
}