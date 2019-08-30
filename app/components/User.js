import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height;

class User extends Component {
  
  render(){
    const { user } = this.props

    return(
      <View style={styles.userContainer}>
        
          <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{uri: user.avatar}}/>
          </View>

          <View style={styles.infoContainer}>
              <Text>{user.email}</Text>
              <Text>{user.first_name} {user.last_name}</Text>
          </View>

      </View>
    );
  }
}

export default User

export const styles = StyleSheet.create({
  
  userContainer: {
    flex: 1,
    flexDirection: "row",
    height: SCREEN_HEIGHT / 5,
    marginBottom: 8,
  },

  avatarContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatar:{
    height: ( SCREEN_HEIGHT/ 8 ),
    width : ( SCREEN_HEIGHT/ 8 ),
    borderRadius: ( SCREEN_HEIGHT/ 8 ) / 2
  },

  infoContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }

})