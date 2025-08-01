import { StyleSheet } from "react-native";

export const createStyle = (isDark: boolean) => {

    return (
        StyleSheet.create({
            background: {
                flex: 1,
            },
            container: {
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: 24,
                paddingVertical: 60,
            },
            topSection: {
                marginTop: 40,
            },
            title: {
                fontSize: 32,
                fontWeight: '800',
                color: isDark ? "#fff" : '#000',
                marginBottom: 8,
            },
            subtitle: {
                fontSize: 18,
                color: isDark ? "#c0c0c0ff" : '#434343ff',
            },
            bottomSection: {
                gap: 16,
            },
            loginButton: {
                backgroundColor: isDark ? '#024ea0ff' : '#007AFF',
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: 'center',
            },
            signupButton: {
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: 'center',
                backgroundColor: isDark? 'transparent' : "#fff",
                borderWidth: isDark ? 1 : 0,
                borderColor: "#fff"
            },
            loginText: {
                color: isDark ? '#b1d7ffff' : "#fff",
                fontSize: 16,
                fontWeight: '600',
            },
            signupText: {
                color: isDark? "#fff" : '#000',
                fontSize: 16,
                fontWeight: '600',
            },
        })
    )
}