import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Button, Share, TouchableOpacity, Text } from 'react-native';
import Modalogin from '../../components/modal_login/modal_login';

const Home = (props) => {
  const googleApiKey = "AIzaSyD8OZEHbRuZSeWDRE4X4Ls5dHCCv46C-nk"; // key da API do google
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const [showAddressInfo, setShowAddressInfo] = useState(false);

  const resetState = () => {
    setAddress('');
    setNeighborhood('');
    setCity('');
    setUf('');
    setCep('');
    setShowAddressInfo(false);
    webViewRef.current.postMessage(JSON.stringify({ type: 'reset' }));
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Endereço: ${address}, Bairro: ${neighborhood}, Cidade: ${city}, Estado: ${uf}, CEP: ${cep}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartilhado com tipo de atividade:', result.activityType);
        } else {
          console.log('Compartilhado');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento descartado');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error.message);
    }
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === 'share') {
      handleShare();
    } else if (data.type === 'reset') {
      resetState();
    } else {
      setAddress(data.logradouro);
      setNeighborhood(data.bairro);
      setCity(data.localidade);
      setUf(data.uf);
      setCep(data.cep);
      setShowAddressInfo(true);
    }
  };

  const webViewRef = React.useRef(null);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <style>
      body {
        background-color: #3A8592;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
      }
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
        text-align: center;
        flex-direction: column;
        padding-top: 50px;
      }
      .title-style {
        font-size: 70px;
        color: yellow;
        font-family: sans-serif;
        font-weight: bold;
        text-align: center;
      }
      .search-container {
        position: relative;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 10vh;
      }
      .input-style {
        flex-grow: 1;
        padding: 10px 40px 10px 20px;
        border-radius: 20px;
        border: 1px solid #fff;
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
      }
      .botao-search {
        position: absolute;
        right: -1.5px;
        background-color: yellow;
        border: none;
        padding: 7px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
        box-sizing: border-box;
      }
      .botao-search:hover {
        background-color: #FFD700;
      }
      .Main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #FFF;
        width: 500px;
        border-radius: 8px;
        margin: 20px auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        font-weight: bold;
        font-size: 100%;
      }
      .info {
        background-color: transparent;
        color: yellow;
        border: none;
        cursor: pointer;
        transition: color 0.3s ease;
      }
      .info:hover {
        background-color: #FFD700;
      }
      @media (max-width: 620px) {
        .Main {
          width: 90%;
        }
        .title-style {
          font-size: 50px;
        }
        .input-style {
          width: 100%;
        }
      }
      .share-button {
        width: 100%;
        background-color: yellow;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1px;
        cursor: pointer;
        margin-top: 20px;
        transition: background-color 0.3s;
        color: black;
        
      }
      .share-button:hover {
        background-color: #FFEC00;
      }
    </style>
    <script>
      teste = 1;
      let alertShown = false;
      function initMap() {

        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: -23.5505, lng: -46.6333 },
          zoom: 15
        });
        const marker = new google.maps.Marker({
          position: { lat: -23.5505, lng: -46.6333 },
          map: map
        });
      function myFunc() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length !== 8) {
          if (!alertShown) {
            alert('CEP inválido.');
            alertShown = true; // Set flag to true after showing alert
          }
          document.getElementById('addressInfo').style.display = 'none';
          return;
        }
    
          fetch(\`https://viacep.com.br/ws/\${cep}/json/\`)
            .then(res => res.json())
            .then(data => {
              if (data.erro) {
                console.log('CEP não encontrado.');
                document.getElementById('addressInfo').style.display = 'none';
                return;
              }
              document.getElementById('address').value = data.logradouro;
              document.getElementById('neighborhood').value = data.bairro;
              document.getElementById('city').value = data.localidade;
              document.getElementById('uf').value = data.uf;
              document.getElementById('addressInfo').style.display = 'block';
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
    
              fetch(\`https://maps.googleapis.com/maps/api/geocode/json?address=\${cep},BR&key=${googleApiKey}\`)
                .then(res => res.json())
                .then(data => {
                  if (data.status === 'OK') {
                    const location = data.results[0].geometry.location;
                    map.setCenter(location);
                    marker.setPosition(location);
                  }
                });
            })
            .catch(err => console.error('Erro na requisição:', err));
        }

        document.getElementById('cepInput').addEventListener('blur', myFunc);
      }   
      

      function handleShareButtonClick() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share' }));
      } 

      function handleMessage(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'reset') {
          document.getElementById('cepInput').value = '';
          document.getElementById('address').value = '';
          document.getElementById('neighborhood').value = '';
          document.getElementById('city').value = '';
          document.getElementById('uf').value = '';
          document.getElementById('addressInfo').style.display = 'none'; 
          alertShown = false;
        }
      }
      window.addEventListener('message', handleMessage);
      window.addEventListener('load', initMap);



    </script>
  </head>
  <body>
    <div class="container">
      <div class="title-style">Vai pra onde ?</div>
      <div class="search-container">
        <input type="text" id="cepInput" class="input-style" placeholder="Insira o CEP..."/>
        <button class="botao-search" id ="buscar">
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="yellow"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </button>
      </div>
      <div id="addressInfo" class="Main" style="display:none;">
        <div id="map" style="width: 100%; height: 400px;"></div>
        <div style="margin-top: 20px; width: 100%; display: flex; justify-content: space-between;">
          <div>
            <label>Rua: <input type="text" id="address" style="border:none; background:transparent;"/></label><br/>
            <label>Bairro: <input type="text" id="neighborhood" style="border:none; background:transparent;"/></label>
          </div>
          <div>
            <label>Cidade: <input type="text" id="city" style="border:none; background:transparent;"/></label><br/>
            <label>Estado: <input type="text" id="uf" style="border:none; background:transparent;"/></label>
          </div>
                 
          </div>
            <button class="share-button" 
            onclick="handleShareButtonClick()">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="yellow">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"/>
          </svg>
          
            
            

            
            
            </button>
      </div>
      
      </div>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback=initMap"></script>
  </body>
  </html>
`;

return (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
      />
    </View>
    <View>
      <Modalogin/>
    </View>
    <View style={styles.buttonContainer}>
      {showAddressInfo ? (
        <>
          <TouchableOpacity style={[styles.button, { width: 220, marginBottom: -20 }]} onPress={resetState}>
            <Text style={[styles.buttonText, { marginBottom: 10 }]}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, { width: 220, marginBottom: -20 }]} onPress={() => props.navigation.navigate('contatos')}>
            <Text style={[styles.buttonText, { marginBottom: 10 }]}>🅘</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={[styles.button, { width: '100%', marginBottom: -20  }]} onPress={() => props.navigation.navigate('contatos')}>
          <Text style={[styles.buttonText, { marginBottom: 10}]}>🅘 contatos</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
    marginTop: -80,
  },
  button: {
    backgroundColor: '#0775A6',
    padding: 10,
    marginBottom: 20,
    height: 55 , 
    width: 200, 
    marginBottom: -28,
  },
  buttonText: {
    color: 'yellow',
    fontSize: 22, 
    textAlign: 'center',
  },
  separator: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default Home;
