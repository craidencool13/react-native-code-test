import React, { Component } from 'react'
import {
  View,
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native'

const height = Dimensions.get('window').height;

const innerSize = ( height * .03 )
const midSize = ( height * .15 )
const outerSize = ( height * .20 )

class Loader extends Component {

  constructor(){
    super()

      this.state = {
        midOpacity: new Animated.Value(.20),
        midScale: new Animated.Value(.10),
        outerOpacity : new Animated.Value(.20),
        outerScale : new Animated.Value(0),
      }
  }
 
  componentDidMount(){
      this.animationSequence()
  }

  animationSequence = () => {

    const { midOpacity , midScale, outerOpacity, outerScale} = this.state

      Animated.parallel([

        Animated.timing(midScale, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true
        }),

        Animated.timing(midOpacity, {
          toValue: 0.10,
          duration: 3000,
          useNativeDriver: true
        }),
    
        Animated.timing(outerOpacity, {
          toValue: 0.05,
          duration: 4000,
          useNativeDriver: true
        }),

        Animated.timing(outerScale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true
        })

      ]).start( async (event) => {
        if(event.finished){
          this.setState({
            midOpacity: new Animated.Value(.20),
            midScale: new Animated.Value(.20),
            outerOpacity : new Animated.Value(.20),
            outerScale : new Animated.Value(0),
          })
          this.animationSequence();
        }
      })
      
  }

  render(){
    const { midOpacity , midScale, outerOpacity, outerScale} = this.state

    return(
      <View style={styles.loaderContainer}>
          <Animated.View style={[styles.innerCircle, styles.center]} />
          <Animated.View style={[styles.midCircle, styles.center, { opacity: midOpacity , transform : [{ scale : midScale }] } ]} />
          <Animated.View style={[styles.outerCircle, styles.center,  { opacity: outerOpacity, transform : [{ scale : outerScale }] } ]} />
      </View>
    );
  }
}

export default Loader

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    position: 'absolute',
    alignSelf: 'center',
  },

  innerCircle: {
    backgroundColor: '#7FB900',
    opacity: 1,
    width: innerSize,
    height: innerSize,
    borderRadius: innerSize / 2
  },

  midCircle: {
    backgroundColor: '#7FB900',
    opacity: 0.2,
    width: midSize,
    height: midSize,
    borderRadius: midSize/2
  },

  outerCircle: {
    backgroundColor: '#7FB900',
    opacity: 0.2,
    width: outerSize,
    height: outerSize,
    borderRadius: outerSize/2
  }
  
})