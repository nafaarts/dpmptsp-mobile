import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import Background from '../../components/Background'
import { Text, useTheme } from "react-native-paper"
import { FontAwesome } from "@expo/vector-icons";

const Card = ({ label, onPress }) => {
    const theme = useTheme()
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.primary, padding: 20, borderRadius: 5 }}>
                <View>
                    <Text variant="headlineSmall">Pengaduan</Text>
                    <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>{label}</Text>
                </View>
                <FontAwesome
                    name='arrow-right'
                    size={26}
                />
            </View>
        </TouchableOpacity>
    )
}

const home = () => {
    return (
        <Background>
            <View style={{ flex: 1, paddingVertical: 20, width: '100%', gap: 10 }} >
                <Card label="Reklame" onPress={() => alert('ok')} />
                <Card label="OSS/RBA" onPress={() => alert('ok')} />
                <Card label="SIP/SIK" onPress={() => alert('ok')} />
                <Card label="IMB/PBG" onPress={() => alert('ok')} />
                <Card label="Lainnya" onPress={() => alert('ok')} />
            </View>
        </Background>
    )
}

export default home