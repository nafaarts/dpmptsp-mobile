import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Background from './Background'

const Loading = () => {
    return (
        <Background>
            <ActivityIndicator size="large" color="#fff" />
        </Background>
    )
}

export default Loading