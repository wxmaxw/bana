import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../src/styles/color";

export default StyleSheet.create({
    container:{
        flex:1,
    },
    logo:{
        width:Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').height * 0.25,
        resizeMode: 'contain',
        tintColor:"white",
        alignSelf:"center",
    },
    logo_container:{
        flex:1,
        justifyContent:"center",
    },
    body_container:{
        flex:1,
    },
    header: {
        color: colors.darkgreen,
        margin:5,
        fontSize:160,
    },
});