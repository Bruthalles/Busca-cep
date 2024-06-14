import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    viewTitulo:{
        backgroundColor:'#3A8592',
        marginTop:150,
        paddingHorizontal:20,
    },
    viewForm:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:500,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        backgroundColor:"#0776a6",
        elevation:23,
        
    },
    titulo:{
        fontSize:20,
        paddingTop:'5%',
        paddingStart:'5%',
        fontWeight: '800',
        color:"#ffd700",
    },
    subTit:{
        paddingTop:'2%',
        paddingStart:'5%',
        color:"#ffd700",
        margin:'2%',
    },
    
    textoUs:{
        fontWeight:'600',
        fontSize:20,
        color:"#ffd700",
        margin:2,
        paddingTop:30,
        paddingEnd:'60%',
        alignSelf:'center',
    },

    textoPs:{
        fontWeight:'600',
        fontSize:20,
        color:"#ffd700",
        margin:12,
        paddingTop:0,
        paddingEnd:'64%',
        alignSelf:'center',

    },
    
    campoTexto:{
        backgroundColor:"#1087cc",
        flex:1,
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        color:'#d4d3f5',   //'#d4d3f5'
        fontSize:22,
        borderBottomWidth:30,
        borderBottomColor:"#1087cc",
        borderRadius:7,
        paddingTop:20,
        height: 48,
        margin:11,
        width:330,
        elevation:5
    },
   
    txtRegistrar:{
        alignSelf:'center',
        justifyContent:'center',
        alignContent:'center',
        paddingTop:20,
        color:'#fff',
        textDecorationLine:'underline',
        fontSize:20,
        fontWeight:'bold'
        
        
    },
    btLogar:{
        backgroundColor:'#ffd700',
        margin:60,
        height:50,
        paddingTop:13,
        borderRadius:15,
        elevation:10,
        marginBottom:50
        
    },
    
    txtButtonEntrar:{
        color:"#0776a6",
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'800',
        fontSize:17,
    }
})

export default styles