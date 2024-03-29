import React, {Component, useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  DeviceEventEmitter,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CvCamera, CvInvoke} from 'react-native-opencv3';
const App = () => {
  // constructor(props) {
  //   super(props)
  //   this.state = { faces : '',
  //     facing : 'front'
  //   }
  // }
  const [faces, setFaces] = useState('');
  const [facing, setFacing] = useState('front');
  useEffect(() => {
    DeviceEventEmitter.addListener('onFacesDetectedCv', onFacesDetectedCv);
  }, []);

  const switchFacing = e => {
    if (facing === 'back') {
      setFacing({facing: 'front'});
    } else {
      setFacing({facing: 'back'});
    }
  };

  const onFacesDetectedCv = e => {
    //alert('payload: ' + JSON.stringify(e.payload))
    if (Platform.OS === 'ios') {
      if (
        (!e.nativeEvent.payload && faces) ||
        (e.nativeEvent.payload && !faces) ||
        (e.nativeEvent.payload && faces)
      ) {
        setFaces({faces: e.nativeEvent.payload});
      }
    } else {
      if (
        (!e.payload && faces) ||
        (e.payload && !faces) ||
        (e.payload && faces)
      ) {
        setFaces({faces: e.payload});
      }
    }
  };

  const renderFaceBoxes = () => {
    if (faces) {
      const facesJSON = JSON.parse(faces.faces);

      // face co-ordinates are in floating point as percentage of view
      let views = facesJSON.faces.map((face, i) => {
        console.log('facesJON is: ' + JSON.stringify(facesJSON));
        //console.log('x: ' + face.x + ' y: ' + face.y + ' w: ' + face.width + ' h: ' + face.height);
        let box = {
          position: 'absolute',
          top: `${100.0 * face.y}%`,
          left: `${100.0 * face.x}%`,
          width: '100%',
          height: '100%',
        };
        let style = {
          width: `${100.0 * face.width}%`,
          height: `${100.0 * face.height}%`,
          // borderWidth: 3,
          // borderColor: '#0f0'
        };

        let e1box = {},
          e1style = {};
        if (face.firstEye) {
          e1box = {
            position: 'absolute',
            top: `${150.0 * face.firstEye.y}%`,
            left: `${0.0 * face.firstEye.x}%`,
            width: '100%',
            height: '100%',
          };
          e1style = {
            width: `${100.0 * face.firstEye.width}%`,
            height: `${100.0 * face.firstEye.height}%`,
            // borderWidth: 2,
            // borderColor: '#ff0'
          };
        }

        let e2box = {},
          e2style = {};
        if (face.secondEye) {
          e2box = {
            position: 'absolute',
            top: `${150.0 * face.secondEye.y}%`,
            left: `${140.0 * face.secondEye.x}%`,
            width: '100%',
            height: '100%',
          };
          e2style = {
            width: `${100.0 * face.secondEye.width}%`,
            height: `${100.0 * face.secondEye.height}%`,
            // borderWidth: 2,
            // borderColor: '#ff0'
          };
        }

        let nbox = {},
          nstyle = {};
        if (face.nose) {
          nbox = {
            position: 'absolute',
            top: `${170.0 * face.nose.y}%`,
            left: `${20.0 * face.nose.x}%`,
            width: '120%',
            height: '300%',
          };
          nstyle = {
            width: `${300.0 * face.nose.width}%`,
            height: `${200.0 * face.nose.height}%`,
            // borderWidth: 2,
            // borderColor: '#00f'
          };
        }

        let mbox = {},
          mstyle = {};
        if (face.mouth) {
          mbox = {
            position: 'absolute',
            top: `${200.0 * face.mouth.y}%`,
            left: `${50.0 * face.mouth.x}%`,
            width: '100%',
            height: '100%',
          };
          mstyle = {
            width: `${300.0 * face.mouth.width}%`,
            height: `${300.0 * face.mouth.height}%`,
            borderWidth: 2,
            borderColor: 'white',
          };
        }

        return (
          <View key={face.faceId} style={box}>
            <View style={style}>
              <View style={e1box}>
                {/* <View style={e1style}></View> */}
                {/* place image */}
                <Image
                  style={e1style}
                  source={{
                    uri: 'https://www.pngmart.com/files/6/Earring-Transparent-PNG.png',
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={[e2box, {}]}>
                <Image
                  style={e2style}
                  source={{
                    uri: 'https://www.pngmart.com/files/6/Earring-Transparent-PNG.png',
                  }}
                />
              </View>
              <View style={nbox}>
                <Image
                  style={nstyle}
                  resizeMode="contain"
                  source={{
                    uri: 'https://mtechub.org/sample_projects/demo.png',
                  }}
                />
              </View>
              {/* <View style={mbox}>
            <Image style={mstyle} source={{
                uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
              }} />
              
           
              
              </View> */}
            </View>
          </View>
        );
      });

      return <View style={styles.allFaceBoxes}>{views}</View>;
    }else{}
  };

  // render() {
  return (
    <View style={styles.preview}>
      <CvCamera
        style={styles.preview}
        facing={facing}
        faceClassifier="haarcascade_frontalface_alt2"
        eyesClassifier="haarcascade_eye_tree_eyeglasses"
        noseClassifier="nose"
        mouthClassifier="mouth"
        onFacesDetectedCv={onFacesDetectedCv}
      />
      {renderFaceBoxes()}
      <TouchableOpacity
        style={
          Platform.OS === 'android' ? styles.androidButton : styles.iosButton
        }
        onPress={switchFacing}>
        <Image
          style={Platform.OS === 'android' ? styles.androidImg : styles.iosImg}
          source={require('./images/flipCamera.png')}
        />
      </TouchableOpacity>
    </View>
  );
  // }
};

export default App;
const styles = StyleSheet.create({
  androidImg: {
    transform: [{rotate: '-90deg'}],
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
  },
  iosImg: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
  },
  androidButton: {
    top: 0,
    bottom: 0,
    right: 0,
    width: '10%',
    position: 'absolute',
    backgroundColor: '#FFF',
    opacity: 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosButton: {
    left: 0,
    right: 0,
    bottom: 0,
    height: '10%',
    position: 'absolute',
    backgroundColor: '#FFF',
    opacity: 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allFaceBoxes: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  preview: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    height: '100%',
  },
});
