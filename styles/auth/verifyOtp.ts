import { StyleSheet } from "react-native"
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const createStyle = (isDark: boolean) => {
    return (
        StyleSheet.create({
          safeArea: {
            flex: 1,
            backgroundColor: "#fff",
          },
          keyboardAvoidingView: {
            flex: 1, 
          },
          scrollViewContent: {
            flexGrow: 1,
          },
          container: {
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: "#fff",
          },
          header: {
            alignItems: "center",
            marginTop: height * 0.1,
            marginBottom: 40,
          },
          imageContainer: {
            width: 250,
            height: 250,
            borderRadius: 75,
            justifyContent: "center",
            alignItems: "center",
          },
          otpImage: {
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          },
          errorText:{
            color: "red",
            fontSize: 16,
            marginTop: 10,
            textAlign: "center",
          },
          title: {
            fontSize: 28,
            fontWeight: "bold",
            color: "#333",
            marginTop: 20,
          },
          subtitle: {
            fontSize: 16,
            color: "#777",
            textAlign: "center",
            marginTop: 10,
            lineHeight: 22,
            paddingHorizontal: 30,
          },
          inputContainer: {
            width: "100%",
            marginTop: 10,
          },
          textInput: {
            width: "100%",
            height: 50,
            backgroundColor: "#f5f5f5",
            borderRadius: 12,
            paddingHorizontal: 15,
            fontSize: 24,
            fontWeight: "bold",
            color: "#333",
            borderWidth: 1,
            borderColor: "#e0e0e0",
            textAlign: "center",
            letterSpacing: 10,
          },
          buttonWrapper: {
            width: "100%",
            marginTop: 40,
          },
          button: {
            backgroundColor: isDark ? '#2f64ec' : "#007AFF",
            height: 55,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
          },
          buttonText: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
          },
        })
        
    )
}
