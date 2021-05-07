import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native'
import image from './assets/prueba.png'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
const App = () => {
  const [selectedImagen, setSelectedImagen] = useState(null)

  let openImagenPickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera required');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImagen({ localUri: pickerResult.uri });
  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())){
        alert("sharing, is not");
        return;
    }
    await Sharing.shareAsync(selectedImagen.localUri);
  }

  return (
    <View style={styles.contaniner}>
      <Text style={styles.title}>Hola mi gente</Text>
      <TouchableOpacity 
       onPress={openImagenPickerAsync}>
    
      <Image
   
        source={{
          uri: 
          selectedImagen !== null 
          ? selectedImagen.localUri 
          : "https://picsum.photos/200/300"
        }}
         style={styles.image}
      />
       </TouchableOpacity>
      { selectedImagen ? (
   <TouchableOpacity onPress={openShareDialog}  
    style={styles.Button} >
<Text style={styles.buttonText} > Share</Text>
 </TouchableOpacity>
      ) : (
        <View />
      )}

    </View>

  );
};



const styles = StyleSheet.create({
  contaniner: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#292929' },
  title: { fontSize: 30, color: `#b0c4de` },
  image: { height: 200, width: 200, borderRadius: 100 },
  Button: {
    backgroundColor: 'deepskyblue',
    padding: 7,
    marginTop: 10,
    fontSize: 20
  },
  buttonText: {
    color: '#f2f2f2'
  }

});

export default App;