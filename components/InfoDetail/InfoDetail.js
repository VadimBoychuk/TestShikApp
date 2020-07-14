import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, StatusBar} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {NativeModules, StatusBarIOS, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;
import GestureRecognizer from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';

function InfoDetail({navigation, route}) {
  const [statusHeight, setHeinghtStatusBar] = useState(40);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(response =>
        setHeinghtStatusBar(response.height),
      );
    }
  }, []);
  // #e7e7e7
  const goBack = async () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', position: 'relative'}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          top: statusHeight + 10,
          right: 20,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            goBack();
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 35,
              height: 35,
              // borderRadius: 50,
              // borderColor: 'black',
              // borderWidth: 2,
            }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 35,
                fontWeight: '600',
              }}>
              ×
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>
          {'Info detail ' + route.params.item.name}
        </Text>
      </View>
      <GestureRecognizer
        onSwipeDown={() => goBack()}
        style={{
          position: 'absolute',
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: 'grey',
          width: '100%',
          height: '30%',
          top: '65%',
        }}
      />
    </View>
  );
}

export default InfoDetail;
