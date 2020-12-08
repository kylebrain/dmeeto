import React, { useEffect, useState } from 'react';
import { endpointUrl } from '../consts';
import { Text, View, Image, Button } from 'react-native';

interface DannyProps
{
  userId : string
}

export const Danny: React.FC<DannyProps> = ({userId} : DannyProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [danny, setDanny] = useState({ "name": "", "profileId": "-1", "imageUrl": "", "description": "", "message": "" });

  const fetchNewDanny = (userId: string) => {
    setIsLoaded(false);
    fetch(endpointUrl + "?userId=" + userId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setDanny(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const postNewMatch = (userId: string, profileId: string, match: boolean) => {
    setIsLoaded(false);

    const postOptions = {
      method: 'POST',
      body: JSON.stringify({
        "userId": userId,
        "profileId": profileId,
        "match": match
      })

    }

    fetch(endpointUrl, postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          fetchNewDanny(userId);
        },
        (error) => {
          setIsLoaded(true);
          console.log(error);
          setError(error);
        }
      )
  }

  useEffect(() => {
    if(userId != "")
    {
      fetchNewDanny(userId);
    } else{
      setIsLoaded(false);
    }
  }, [userId]);

  let body = <Text style={{ textAlign: "center", width: "80%", height: "118px" }}>Finding next match...</Text>;
  if (isLoaded) {
    if (error) {
      body = <Text>{"Error: " + error}</Text>;
    } else if (danny.message != undefined) {
      body = <Text style={{ textAlign: "center", width: "80%", height: "118px", fontWeight: "bold" }}>I hope you found the one!</Text>;
    } else {
      body =
        <>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>{danny.name}</Text>
          <Text style={{ textAlign: "center" }}>{danny.description}</Text>
          <Image style={{ resizeMode: "stretch", width: 250, height: 250 }} source={{ uri: danny.imageUrl }} />
        </>;
    }
  }

  return (
    <View style={{ width: "100%", flex: 6, alignItems: "center" }}>
      <View style={{ flex: 12, justifyContent: "center", alignItems: "center" }}>{body}</View>
      <View style={{ flex: 1, width: "50%", flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button disabled={!isLoaded || danny.message != undefined} title="YES" onPress={() => postNewMatch(userId, danny.profileId, true)} />
        <Button disabled={!isLoaded || danny.message != undefined} title="NO" onPress={() => postNewMatch(userId, danny.profileId, false)} />
      </View>
    </View>
  )

}