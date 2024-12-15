// npx expo install expo-image-picker
// npx expo install expo-sharing
import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import * as Sharing from 'expo-sharing';

export default function App() {

  const [ImageSelected, setImageSelected] = useState(null);

  let abrirArchivosAsync = async () => {

    let ResultadoPermiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (ResultadoPermiso.granted === false) {
      alert("Si no me das permiso, no puedo funcionar");
      return;
    }
    if (ResultadoPermiso.granted === true) {
      const ResultadoSeleccion = await ImagePicker.launchImageLibraryAsync();

      if (ResultadoSeleccion.canceled == true) {
        return;
      }
      else{
        setImageSelected({
          direccion: ResultadoSeleccion.assets[0].uri
        })
      }
    }
  };

  let abrirCamaraAsync = async () => {
    let ResultadoPermiso = await ImagePicker.requestCameraPermissionsAsync();

    if (ResultadoPermiso.granted === false) {
      alert("Si no me das permiso, no puedo funcionar");
      return;
    }
    if (ResultadoPermiso.granted === true) {
      const ResultadoSeleccion = await ImagePicker.launchCameraAsync();

      if (ResultadoSeleccion.canceled == true) {
        return;
      }
      else{
        setImageSelected({
          direccion: ResultadoSeleccion.assets[0].uri
        })
      }
    }
  };

  const compartirArchivosAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Esta imagen no se puede compartir en tu dispositivo");
      return;
    }
    await Sharing.shareAsync(ImageSelected.direccion);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Image
        source={{uri: ImageSelected !== null ? ImageSelected.direccion: "https://www.univalle.edu/wp-content/uploads/2022/06/logo_uni01.png"}}
        style={styles.logo}
      />

      <Text style={styles.titulo}>
        ¡Univalle te da la bienvenida!
      </Text>

      <Text style={styles.subtitulo}>
        Este es el módulo 4 del Diplomado
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={()=> Alert.alert("Gracias, tu inscripción está en proceso")}>
        <Text style={styles.textoBoton}>
          ¡Haz click aquí para inscribirte!
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.subtitulo}>
        Cambia la imagen de perfil:
      </Text>
      
      <View style={styles.container2}>
        <Pressable
          style={styles.boton}
          onPress={abrirArchivosAsync}>
            <Text style={styles.textoBoton}>
              Galería
            </Text>
        </Pressable>

        <Pressable
          style={styles.boton}
          onPress={abrirCamaraAsync}>
            <Text style={styles.textoBoton}>
              Cámara
            </Text>
        </Pressable>
      </View>
     
      {
        ImageSelected ? (
          <Pressable
            style={styles.boton}
            onPress={compartirArchivosAsync}>
              <Text style={styles.textoBoton}>
                Compartir imagen
              </Text>
          </Pressable>
        ): (<View/>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    flex: 0,
    backgroundColor: 'beige',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 40,
    color: 'purple',
    alignSelf: 'center',
    textAlign: 'center'
  },
  subtitulo: {
    fontSize: 20,
    alignSelf: 'center'
  },
  logo: {
    height: 200,
    width: 300,
    borderRadius: 100,
    resizeMode: 'contain'
  },
  boton: {
    backgroundColor: 'purple',
    margin: 20,
    padding: 15,
    borderRadius: 20
  },
  textoBoton: {
    fontSize: 20,
    color: 'white'
  }
});
