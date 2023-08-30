import { View, StyleSheet, Alert } from "react-native"
import Background from "../../components/Background"
import Loading from "../../components/Loading"
import { Avatar, Divider, Text, Button } from 'react-native-paper'
import { router } from "expo-router"
import useSWR from "swr"
import { getData } from "../../api/fetcher"
import useAuth from "../../stores/useAuth"
import { signOut } from "../../services/auth.service"

export default function Accout() {
    const { data, error } = useSWR('/user', getData)
    const { logout } = useAuth()

    const handleLogout = () => {
        Alert.alert('Konfirmasi', 'Apakah anda yakin untuk keluar?',
            [
                {
                    text: 'Ya',
                    onPress: () => {
                        signOut().then(() => logout())
                    },
                    style: 'default',
                },
                { text: 'Batal', style: 'cancel' },
            ],
            { cancelable: true },
        )
    }

    if (error) {
        return (
            <Background>
                <Text style={{ fontSize: 26, color: '#fff' }}>{error.message ?? 'Opps, Something went wrong!'}</Text>
            </Background>
        )
    }

    if (!data) return <Loading />

    return (
        <Background>
            <View style={{ flex: 1, width: '100%' }}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingVertical: 20,
                    gap: 20,
                }}>
                    <Avatar.Image size={80} source={require('../../assets/profile-default.png')} style={{ backgroundColor: 'lightgray' }} />
                    <View style={{
                        flex: 1,
                        overflow: 'hidden',
                        gap: 10,
                        justifyContent: 'center'
                    }}>
                        <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: '#fff' }}>{data?.nama}</Text>
                        <Text variant="bodyMedium" style={{ color: '#fff' }}>{data?.email}</Text>
                    </View>
                </View>
                <Divider />
                <View style={{
                    width: '100%',
                    paddingVertical: 20,
                    gap: 20,
                    alignItems: 'flex-start'
                }}>
                    <Button
                        icon="pencil"
                        mode="text"
                        labelStyle={{ color: '#fff' }}
                        contentStyle={{ justifyContent: 'flex-start' }}
                        style={styles.button}
                        onPress={() => router.push('/edit-profile')}>
                        Edit Profil
                    </Button>
                    <Button
                        icon="pencil-lock"
                        mode="text"
                        labelStyle={{ color: '#fff' }}
                        contentStyle={{ justifyContent: 'flex-start' }}
                        style={styles.button}
                        onPress={() => router.push('/edit-password')}>
                        Edit Password
                    </Button>
                    <Button
                        icon="text"
                        mode="text"
                        labelStyle={{ color: '#fff' }}
                        contentStyle={{ justifyContent: 'flex-start' }}
                        style={styles.button}
                        onPress={() => router.push('/tentang')}>
                        Tentang Aplikasi
                    </Button>
                    <Button
                        icon="logout"
                        mode="text"
                        labelStyle={{ color: '#fff' }}
                        contentStyle={{ justifyContent: 'flex-start' }}
                        style={styles.button}
                        onPress={handleLogout}>
                        Keluar
                    </Button>
                </View>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 5,
        borderRadius: 0,
    }
})