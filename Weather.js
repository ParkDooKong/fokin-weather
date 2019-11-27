import React from "react";
import ProtoTypes from "prop-types";
import {StyleSheet, View, Text, StatusBar, Image} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

const weatherOptions = {
    1: {
        iconName: "weather-sunny",
        gradient: ["#f9d423", "#ff4e50"]
    },
    2: {
        iconName: "weather-lightning",
        gradient: ["#d3959b", "#bfe6ba"]
    },
    3: {
        iconName: "weather-pouring",
        gradient: ["#9a8478", "#1e130c"]
    },
    5: {
        iconName: "weather-rainy",
        gradient: ["#e6dada", "#274046"]
    },
    6: {
        iconName: "weather-snowy",
        gradient: ["#83a4d4", "#b6fbff"]
    },
    7: {
        iconName: "weather-fog",
        gradient: ["#D38312", "#A83279"]
    },
    8: {
        iconName: "weather-cloudy",
        gradient: ["#485563", "#29323c"]
    }
}

export default function Weather({temp, id, icon, image, name, tempMax, tempMin}) {
    return (
        <LinearGradient colors={weatherOptions[id].gradient} style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons size={96} name={weatherOptions[id].iconName} color="white"/>
                {/* <Image source={{uri: image}} style={{width:96, height:96}}/> */}
                <Text style={styles.temp}>{temp}°</Text>
            </View>
            <View style={{...styles.halfContainer,...styles.textContainer}}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>Highest Temp: {tempMax}°</Text>
                <Text style={styles.subtitle}>Lowest  Temp: {tempMin}°</Text>
            </View>
        </LinearGradient>);
}

Weather.prototype = {
    temp: ProtoTypes.number.isRequired,
    id: ProtoTypes.number.isRequired,
    icon: ProtoTypes.string.isRequired,
    image: ProtoTypes.string.isRequired,
    name: ProtoTypes.string.isRequired,
    tempMax: ProtoTypes.number.isRequired,
    tempMin: ProtoTypes.number.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
        fontSize: 42,
        color: "white"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: "flex-start"
    },
    title: {
        color: "white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10
    },
    subtitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "600"
    }
});