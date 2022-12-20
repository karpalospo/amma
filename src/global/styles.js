import { StyleSheet, Platform, Dimensions } from "react-native"


const _IMAGES = {
    "email": require("../../assets/email.png"),
    "manoarriba": require("../../assets/manoarriba.png"),
    "manoabajo": require("../../assets/manoabajo.png"),
    "numdocumento": require("../../assets/numdocumento.png"),
    "tamano": require("../../assets/tamano.png"),
    "tipodocumento": require("../../assets/tipodocumento.png"),
    "tipopropiedad": require("../../assets/tipopropiedad.png"),
    "ubicacion": require("../../assets/ubicacion.png"),
    "usuario": require("../../assets/usuario.png"),
    "candado": require("../../assets/candado.png"),
    "celular": require("../../assets/celular.png"),
    "corazon": require("../../assets/corazon.png"),
}

export const IMAGES = _IMAGES



const _COLORS = {
    mainBlue: "#0090CC",
    red: "#E12D2D",
    mainText: "#545D62",
    blueText: "#0062AE",
    border: "#ddd",
    green: "#04B100",
    backgroundColor: "#F8FCFF"
}

export const COLORS = _COLORS

export const styles = StyleSheet.create({

    main: {flex: 1, backgroundColor: _COLORS.backgroundColor, position:"relative"},
    p: {fontFamily: "pp_regular", fontSize:15},
    pLight: {fontFamily: "pp_light", fontSize:14},
    H1: {fontFamily: "pp_bold", fontSize:23},
    H3: {fontFamily: "pp_bold", fontSize:17},
    input: {width:"100%", height: 56, backgroundColor: "#ffffff", marginVertical:7, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 18, fontFamily: "rns", fontSize: 18, borderColor:"#ccc", borderWidth: 1},
    link: {padding:3, color: COLORS.blueText, fontSize:18, fontFamily: "rns_semi"},
    row: {flexDirection:"row", alignItems:"center", justifyContent: "space-between"},
    rowCenter: {flexDirection:"row", alignItems:"center", justifyContent: "center"},
    rowLeft: {flexDirection:"row", alignItems:"center", justifyContent: "flex-start"},
    rowRight: {flexDirection:"row", alignItems:"center", justifyContent: "flex-end"},

    background: {position:"absolute", top:-30, left:0, width:"100%", height:170, zIndex:-1},
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    labelInputs: {
        paddingLeft:10,
        fontFamily: "pp_regular", 
        fontSize:15,
        color: "#00A0BC",
    },

    inputs: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        margin:5,
        marginTop:0,
        borderRadius: 10,
        height:45,
        borderWidth:1,
        borderColor:"#B4E3F1",
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5

    },

    textInputs: {
        height:"100%",
        borderWidth:0,
        fontSize:16,
        flex: 1,
    },

    pickers: {
        padding:0,
        margin:0,
        height:35
    },



})