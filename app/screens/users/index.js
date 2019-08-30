import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Platform,
  ActivityIndicator
} from 'react-native'


// Style
import { styles } from './styles'

// Helper
import { FetchApi } from 'app/global/api'
import helpers from 'app/global/helpers'

// Components
import User from 'app/components/User'
import Loader from 'app/components/Loader'

class UserScreen extends Component {

  state = {
    page : 0,
    total_pages: 1,

    users: [],

    loading: false,
    infiniteLoad: false,
    refresh: false,
    isGettingUsers: false, 
  }

  constructor(){
    super()    
  }

  componentDidMount(){
    this.fetchUsers();
  }

  fetchUsers = async (infiniteScroll = false) => {

    const { page } = this.state

    if(infiniteScroll){
      this.setState({ infiniteLoad: true })
    }else{
      this.setState({ loading: true })
    }

    let params = {
      page: page + 1
    }

     FetchApi('users', params, 'GET').then((data)=>{

        setTimeout(async () => {
          this.setState({users: [...this.state.users, ...data.data],
                        total_pages: data.total_pages,
                        isGettingUsers: false,
                        loading: false,
                        page: page + 1,
                        infiniteLoad: false
                        })
        }, 3000);

     }).catch((err)=>{
        this.setState({isGettingUsers: false,
                      loading: false,
                      infiniteLoad: false
                      })
        helpers.showAlert('Error Alert!', 'Failed to fetch users! Try again?', 'Yes', 'No').then((res)=>{
          if(res){
            this.fetchUsers();
          }
        })

     })
    
  }

  onRefresh = async () => {
    await this.setState({refresh: true,
                   page: 0,
                   total_pages: 0,
                   users: []});
    this.fetchUsers()
    setTimeout(() => {
        this.setState({refresh: false});
    }, 300);
 }

  renderUsers = () => {
    const { users } = this.state
    return (
      users.map((user, key) => {
        return (
          <User user={user} key={key}/>
        )
      })
    )
  }

  isCloseToBottom = (event) => {
    const { page, total_pages, isGettingUsers, loading } = this.state
    let layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height
    let contentOffsetY = event.nativeEvent.contentOffset.y
    let contentSizeHeight = event.nativeEvent.contentSize.height
    let isClose = layoutMeasurementHeight + contentOffsetY  >= contentSizeHeight - 50

    if (isClose && !isGettingUsers && !loading && page < total_pages) {
      this.setState({isGettingUsers: true})
      this.fetchUsers(true)
    }

  }
  
  render(){
    const { infiniteLoad, loading, refresh, page, total_pages, users} = this.state
    return(
      <View style={styles.container}>
            { loading && <Loader /> }

            { !loading && 
              <ScrollView
                      scrollEventThrottle={Platform.OS == 'ios' ? 200 : 16}
                      onScroll={this.isCloseToBottom}
                      refreshControl={
                        <RefreshControl
                        refreshing={refresh}
                        onRefresh={this.onRefresh}
                        />
                  }>

                  { users.length > 0 && this.renderUsers() }

                  { infiniteLoad &&
                    <View style={styles.loadingContainer}>
                              <ActivityIndicator size={'large'} />
                    </View>
                  }

                  { !loading && !infiniteLoad && page == total_pages &&
                    <View style={styles.loadingContainer}>
                              <Text> No more users to load</Text>
                    </View>
                  }

              </ScrollView>
              
            }
      </View>
    );
  }
}

export default UserScreen
