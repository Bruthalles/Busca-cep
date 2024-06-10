import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Image, Linking, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // Adicione esta linha para usar ícones

export function Contatos(props) {
    const [people, setPeople] = useState([
        { name: 'David', key: 'Lukazdrz@gmail.com', github: 'https://github.com/Dav11ucas' },
        { name: 'Oscar', key: 'oscargabrieled@gmail.com', github: 'https://github.com/0sscar' },
        { name: 'Thalles', key: 'thallesgmkr@gmail.com', github: 'https://github.com/Bruthalles' },
        { name: 'Brenno', key: 'brennomachado080@gmail.com', github: 'https://github.com/Brenin-20' }
    ]);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handlePress = () => {
        Linking.openURL('https://github.com/0sscar/projeto-cep');
    };

    const handleIssue = () => {
        Linking.openURL('https://github.com/0sscar/projeto-cep/issues');
    };
    const handleEmailPress = (email) => {
        Linking.openURL(`mailto:${email}`)
    };

    const handleGithubPress = (github) => {
        Linking.openURL(github);
    };

    const toggleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <View style={contato.container}>
            
            <View style={{height:90}}>
                <Text style={contato.titulo}>Área de contatos</Text>
            </View>

            <View style={contato.separator}/>
            
            <Text style={contato.subtitulo}>Envolvidos no projeto: </Text>

            <FlatList
                data={people}
                renderItem={({ item, index }) => (
                    <View style={contato.itemContainer}>
                        <View style={contato.minimizedContainer}>
                            <Text style={contato.itemName}>{item.name}</Text>
                            <TouchableOpacity 
                                style={contato.expandButton}
                                onPress={() => toggleExpand(index)}>
                                <Text style={contato.TextexpandButton}>{expandedIndex === index ? "ꜛ" : "ꜜ"}</Text>
                            </TouchableOpacity>
                        </View>
                        {expandedIndex === index && (
                            <View>
                                {item.key ? (
                                    <TouchableOpacity onPress={() => handleEmailPress(item.key)}>
                                        <Text style={contato.itemEmail}>{item.key}</Text>
                                    </TouchableOpacity>
                                ) : null}
                                {item.github ? (
                                    <TouchableOpacity style={contato.githubContainer} onPress={() => handleGithubPress(item.github)}>
                                        <FontAwesome name="github" size={24} color="#333" />
                                        <Text style={contato.itemGithub}>GitHub</Text>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        )}
                    </View>
                )}
            />

            <View style={contato.viewGit}>
                <Image 
                    style={contato.octo}
                    source={require('./octocat.png')}
                />

                <TouchableOpacity 
                    onPress={handlePress}
                    style={contato.btnGit}>
                    <Text style={contato.urlGit}> Clique aqui para ver o projeto </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleIssue}>
                    <Text style ={contato.att}>Atualizações e Feedback</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={contato.btnHome} 
                onPress={() => props.navigation.navigate('home')}>
                <Text style={contato.btnHomeText}>←</Text>
            </TouchableOpacity>
        </View>
    );
}

const contato = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#52a8bf', //#398592
        alignItems: 'center',
        padding: 10,
    },
    separator:{
        elevation:30,
        height:2,
        width:1000,
        backgroundColor:"#434647",

    },
    titulo: {
        fontSize: 22,
        paddingRight:200,
        paddingTop: '12%',
        marginBottom: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
    subtitulo: {
            fontSize: 22,
            alignSelf: 'center',
            paddingTop: '12%',
            marginBottom: 10,
            color: '#fff',
            fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        elevation: 3,
    },
    minimizedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    att:{
        textDecorationLine:'underline'
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingRight:80
    },
    itemEmail: {
        fontSize: 16,
        color: '#00bbff',
        textDecorationLine: 'underline',
    },
    githubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    itemGithub: {
        fontSize: 16,
        color: '#000',
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
    TextexpandButton: {
        fontSize: 20,
        borderColor:"#000",
        color: '#000', // 
        
       
    },
    expandButton: {
        alignItems:'center',
        justifyContent:'center',
        borderColor:"#000",
        borderRadius:5,
        width:30,
        borderWidth:1.5,
        
       
    },
    btnGit: {
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1f047a',
        height: 40, 
        width: 250,
        margin: 20,
        marginTop: 4,
        borderRadius: 50,
        elevation: 6,
    },
    viewGit: {
        backgroundColor: '#fff',
        elevation: 8,
        margin: 26,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        marginBottom: 60, //faz o elemento subir
    },
    octo: {
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        height: 50,
        width: 50,
        margin: 10,
        marginTop: 20,
    },
    urlGit: {
        color: '#00bbff',
        textDecorationLine: 'underline',
    },
    btnHome: {
        backgroundColor: '#0775A6',  // Cor do botão
        padding: 10,
        marginBottom: 20,
        height: 55,
        width: 200,
        borderRadius: 50,
        elevation: 6, 
        height: 90 , 
        width: 700, 
        marginBottom: -44,
    },
    btnHomeText: {
        color: 'yellow',  // Cor do texto do botão
        fontSize: 22,
        textAlign: 'center',
    },
});

export default Contatos;
