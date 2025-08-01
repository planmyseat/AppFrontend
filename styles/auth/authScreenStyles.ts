import { StyleSheet } from "react-native"

export const createtyle = (isDark: boolean) => {
    return (
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: isDark ? "#000" : "#fff"
            },
            image: {
                width: '100%',
            },
            bottomSheet: {
                position: 'absolute',
                top: -25,
                width: '100%',
                height: "100%",
                backgroundColor: '#fff',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: "hidden"
            },
        })
    )
}
