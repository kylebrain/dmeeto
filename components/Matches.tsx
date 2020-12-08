import React, { useEffect, useState } from 'react';
import { endpointUrl } from '../consts';
import { Text, View, Image, FlatList } from 'react-native';

interface MatchesProps
{
  userId : string
}

export const Matches: React.FC<MatchesProps> = ({userId} : MatchesProps) => {
  interface Match {
    imageUrl: string,
    description: string,
    name: string,
    profileId: string
  }

  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(userId != "")
    {
      getMatches(userId);
    }
  }, [userId])

  const getMatches = (userId: string) => {
    setIsLoaded(false);
    fetch(endpointUrl + "/all?userId=" + userId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          //console.log(result);
          setMatches(result);
        },
        (error) => {
          setIsLoaded(true);
          console.log(error);
          setError(error);
        }
      )
  }

  const renderMatch = ({ item }: { item: Match }) => {
    return <View style={{ flex: 1, margin: 12, width: "100%", alignItems: "center" }}>
      <Text style={{fontWeight: "bold", textAlign: "center", marginTop: 6 }}>{item.name}</Text>
      <Image style={{ resizeMode: "stretch", width: 150, height: 150, marginTop: 6 }} source={{ uri: item.imageUrl }}></Image>
    </View>
  }

  let galleryBody = <Text>Loading matches...</Text>
  if (isLoaded) {
    if (error) {
      galleryBody = <Text>{error}</Text>
    } else {
      galleryBody = <FlatList numColumns={2} style={{flex: 1, paddingHorizontal: 12, height: 600}} data={matches} renderItem={renderMatch} keyExtractor={(match) => match.profileId} />
    }
  }

  return <View style={{ width: "110%", flex: 12, alignItems: "center" }}>
    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 20, paddingVertical: 12 }}>My Matches</Text>
    <View style={{flex: 1, paddingVertical: 12}}>
      {galleryBody}
    </View>
  </View>;
}