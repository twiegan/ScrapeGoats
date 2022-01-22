import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Headline, Searchbar } from 'react-native-paper';
import axios from 'axios';

import { auth } from '../firebase';

const Search = () => {

  // search by search bar
  const [sentiment, setSentiment] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const onSearchPressed = () => {
    //TODO: call Twitter API on searchQuery here
    var params = {
      data: searchQuery
    }

    if (searchQuery != "") {
      axios.post('http://localhost:5000/api/query', params)
        .then(function (response) {
          console.log(response.data.score, response.data.magnitude);
          const result = response.data.score + " " +  response.data.magnitude;
          //Perform action based on response
          setSentiment(result);
        })
        .catch(function (error) {
          console.log(error);
          //Perform action based on error
        });
    } else {
      alert("The search query cannot be empty")
    }

    console.log(searchQuery);
  }

  return (
    <View style={styles.container}>
      <Searchbar style={styles.searchBar}
        placeholder="Enter a term or a phrase"
        onChangeText={onChangeSearch}
        onIconPress={onSearchPressed}
        value={searchQuery}
      />
      {sentiment ? <Text>This is the sentiment: {sentiment}</Text> : <Text>Loading</Text>}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    color: 'black'
  },
  searchBar: {
    marginTop: 20,
  }
})