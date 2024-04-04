import React from "react";
import { ActivityIndicator, View } from "react-native";
import LoaderStyle from "./style";


const Loader = () => {
    return (
        <View style={LoaderStyle.container}>
            <ActivityIndicator size={40} color="#C4963D" style={LoaderStyle.loader} />

        </View>
    )

}
export default Loader;