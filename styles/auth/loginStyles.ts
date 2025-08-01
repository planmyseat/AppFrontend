import { StyleSheet } from "react-native"

export const createStyle = (isDark: boolean) => {
    return (
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: !isDark ? "#ffffffff" : '#2d313b',
                paddingHorizontal: 30,
                paddingTop: 50,
            },
            title: {
                fontSize: 30,
                color: isDark ? '#ffffff' : "#000",
                fontWeight: '700',
                alignSelf: 'center',
                marginBottom: 8,
            },
            subtitle: {
                fontSize: 15,
                color: isDark ? '#a5a6ab' : "#66676eff",
                alignSelf: 'center',
                marginBottom: 32,
            },
            input: {
                backgroundColor: isDark ? '#1f2229' : "#f4f4f4ff",
                paddingHorizontal: 18,
                paddingVertical: 16,
                borderRadius: 18,
                marginBottom: 20,
                fontSize: 16,
                color: isDark ? '#e0e0e0' : "#4a4a4aff",
            },
            button: {
                backgroundColor: isDark ? '#2f64ec' : "#007AFF",
                paddingVertical: 16,
                borderRadius: 18,
                alignItems: 'center',
                marginTop: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 3,
                elevation: 2,
            },
            buttonText: {
                color: '#ffffff',
                fontWeight: '600',
                fontSize: 16,
            },
            forgot: {
                marginTop: 16,
                alignItems: 'center',
            },
            forgotText: {
                fontSize: 14,
                color: isDark ? '#a0a0a5' : "#6a6a6eff",
            },
            signup: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: "center",
                paddingVertical: 24,
            },
            signupText: {
                fontSize: 14,
                color: isDark ? '#a0a0a5' : "#6a6a6eff",
            },
            signupLink: {
                fontSize: 14,
                color: isDark ? '#2f64ec' : "#007AFF",
                fontWeight: '600',
            },
        })
    )
}