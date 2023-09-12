import React, { useEffect } from "react";
import Background from "../components/Background";
import { ActivityIndicator } from "react-native";
import useAuth from "../stores/useAuth";
import { signOut } from "../services/auth.service";

const Logout = () => {
    const { token, logout: LogOut } = useAuth();

    useEffect(() => {
        if (token) {
            LogOut();
        }
    }, []);

    return (
        <Background
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator size="large" color="#fff" />
        </Background>
    );
};

export default Logout;
