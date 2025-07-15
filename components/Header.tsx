import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/images/logoFleur.png")}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <Image
                    source={require("../assets/images/logoText.png")}
                    style={styles.text}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 0.22 * width,
        backgroundColor: "#762C61",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 12,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 41.43,
        height: 42,
        marginRight: 10,
    },
    text: {
        width: 41.43,
        height: 42
    },
});
