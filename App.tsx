import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput } from 'react-native';
import { Danny } from './components/Danny';
import { Matches } from './components/Matches';
import { Username } from './components/Username';

export default function App() {


  const [viewGallery, setViewGallery] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <View style={{flex : 1}}>
      <View style={{flex: 0.1, backgroundColor: "#2196F3"}}>
        <Text style={{width: "100%", textAlign:"center", paddingVertical: 15, fontSize:30, color:"#fff", fontWeight:"600"}}>dMEETo</Text>
      </View>
      <View style={styles.container}>
        <View style={{ flex: 2.3 }}>
          {!viewGallery && <Username initialUsername={userId} setUserId={(userId: string) => { setUserId(userId) }} />}
        </View>
        {viewGallery ? <Matches userId={userId} /> : <Danny userId={userId} />}
        <View style={{ marginVertical: 12, flex: 2, justifyContent: "center" }}>
          <Button title={viewGallery ? "Back" : "My Matches"} onPress={() => setViewGallery(!viewGallery)} />
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
