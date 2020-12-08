import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

interface UsernameProps
{
  setUserId : (userId: string) => void,
  initialUsername: string
}

export const Username: React.FC<UsernameProps> = ({setUserId, initialUsername} : UsernameProps) => {
  const [value, setValue] = useState("");
  const [username, setUserName] = useState(initialUsername);

  useEffect(() =>
  {
    setUserId(username);
  }, [username])

  let body =
    <View style={{ flex: 1 }}>
      <Text>Enter username</Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TextInput style={{ borderColor: 'gray', borderWidth: 1, paddingHorizontal: 6 }}
          onChangeText={text => setValue(text)}
          value={value} />
        <Button disabled={value == ""} title="SUBMIT" onPress={() => setUserName(value)} />
      </View>
    </View>

  if (username != "") {
    body =
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontWeight:"bold" }}>Welcome {username}</Text>
        <Button title="LOGOUT" onPress={() => { setUserName(""); setValue("") }}></Button>
      </View>
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 2 }}>
        {body}
      </View>
      <View style={{ flex: 3 }} />
    </View>


  );
}