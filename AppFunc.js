
// import React, {useState, useEffect, useRef} from 'react';
// import {
//   SafeAreaView,
//   Text,
//   Dimensions,
//   Touchable,
//   TouchableOpacity,
//   Platform,
//   Image
// } from 'react-native';
// // import react naitve camera vision
// import  {
//   Camera,
//   CameraPermissionStatus,
//   CameraProps,
//   CameraPictureOptions,
//   CameraRecordingOptions,
//   CameraRecording,
//   CameraPicture,
//   useCameraDevices,
//   useFrameProcessor,
//   useCameraDevice,
//   useCameraConfig,
//   useCamera,
//   useCameraPicture,
//   useCameraRecording,
//   useCameraFrameProcessor,
//   useCameraPreview,
//   useCameraPreviewFrameProcessor,
//   useCameraPreviewFrame,
//   useCameraPreviewBuffer,
//   useCameraPreviewBufferFrame,
// } from 'react-native-vision-camera';
// import FaceDetector from '@react-native-community/google-signin';
// // import { FaceDetection } from 'react-native-facial-recognition';
// import FaceDetection, { FaceDetectorContourMode,
//    FaceDetectorLandmarkMode,
//     FaceContourType ,
   
//   } from "react-native-face-detection";
//   import {CvCamera, CvScalar, Mat, CvInvoke, CvInvokeGroup,CvType} from 'react-native-opencv3';



// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// function App() {
//   const cameraRef = useRef(null);
//   const interMat =  new Mat().init()
//   const posterScalar = new CvScalar(255,255,0,255)
//   const [faces, setFaces] = useState(null);
//   const [nose, setNose] = useState(null);
//   const [faceLandmarks, setFaceLandmarks] = useState(null);

//   useFrameProcessor(async (frame) => {
//     const faces = await frame.detectFaces();
//     console.log('faces', faces);
//     if (faces.length > 0) {
//       const face = faces[0];
//       const landmarks = await face.getLandmarks();
//       console.log('landmarks', landmarks);
//       setFaceLandmarks(landmarks);
//     } else {
//       setFaceLandmarks(null);
//     }
//   }, [])

//   const devices = useCameraDevices()
//   const device = devices.back

//   const requestCameraPermission = async () => {
//     try {
//       const cameraPermission = await Camera.requestCameraPermission();
//       if (cameraPermission === 'authorized') {
//         console.log('Camera permission authorized');
//       } else {
//         console.log('Camera permission denied');
//       }
      
//     } catch (err) {
//       console.warn(err);
//     }
//   };
//   let overlayMat
//   if (Platform.OS === 'ios') {
//     overlayMat =  new Mat(1600,1280,CvType.CV_8UC4).init()
//   }
//   else {
//     overlayMat =  new Mat(1280,1600,CvType.CV_8UC4).init()
//   }

//   const onFacesDetectedCv = async (e) => {
    
//     if (Platform.OS === 'ios') {
//       console.log('e.nativeEvent.payload', e.nativeEvent.payload);
//       // if ((!e.nativeEvent.payload && faces) || (e.nativeEvent.payload && !faces) || (e.nativeEvent.payload && faces)) {
//       //   const x=JSON.parse(e.nativeEvent.payload);
//       //   console.log('nose width', x.faces[0].nose.width);
//       //   console.log('nose height', x.faces[0].nose.height);
//       //   setNose({
//       //     width: x.faces[0].nose.width,
//       //     height: x.faces[0].nose.height,
//       //     x: x.faces[0].nose.x,
//       //     y: x.faces[0].nose.y,
//       //   })
//       // }
       
//     }
//   };

//   useEffect(() => {
//    requestCameraPermission();

//   }, []);

//   return (
//   <SafeAreaView
//   style={{
//     flex: 1,
//     backgroundColor: 'black',
//   }}
//   >
    
//     {/* {
//   device == null  ? <Text>Camera not found</Text> : 
//   <Camera
//       style={{
//         width: width,
//         height: height - 100,
//         position: 'absolute',
//         top: 0,
//         left: 0,
//       }}
//       isActive={true}
//       // frameProcessor={(frame) => {
//       //   console.log('frame', frame);
//       // }}
//       device={devices.front}
//       ref={cameraRef}
//       // onFacesDetected={onFacesDetected}
//      // face  detection
//       // faceDetection={{
//       //   mode: FaceDetection.Constants.Mode.accurate,
//       //   detectLandmarks: FaceDetection.Constants.Landmarks.all,
//       //   runClassifications: FaceDetection.Constants.Classifications.all,
//       //   minDetectionInterval: 100,
//       //   tracking: true,
//       // }}
//     />
        
//     }
//     <TouchableOpacity
//     style={{
//       width: 80,
//       height: 50,
//       backgroundColor: 'white',
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       position: 'absolute',
//       bottom: 30,
//       borderWidth: 1,
//       borderColor: 'red',


    
//     }}
//     >
//     <Text
//     style={{
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       color: 'red',
//     }}
//     >
//       Capture
//     </Text>
//     </TouchableOpacity> */}
   
//   <CvCamera
//     // ref={cameraRef}
//     style={{
//       width: width,
//       height: height - 100,
//       position: 'absolute',
//       top: 0,
//       left: 0,
//     }}
//     limitFps={30}

//     isActive={false}
//     facing={'front'}
//     faceClassifier='haarcascade_frontalface_alt2'
//     eyesClassifier='haarcascade_eye_tree_eyeglasses'
//     noseClassifier='nose'
//     mouthClassifier='mouth'
//     faceDetectionMode='accurate'
//     landmarksModel='lbfmodel'
//     onFacesDetectedCv={onFacesDetectedCv}
//     overlayInterval={10000}

//   />
//   <Text
//   style={{
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'red',
//     position: 'absolute',
//     bottom: 50,
//     left: 20,
//   }}
//   >
//     nose
//   </Text>
//   <Text
//   style={{
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'red',
//     position: 'absolute',
//     bottom: 50,
//     right: 20,
//   }}
//   >
//     {
//       !nose ? 'not found' : `width: ${nose.width}, height: ${nose.height}`
//     }
//   </Text>
// {/* place image on nose */}
//   {
//     nose !== null
//     ?
//     <Image
//     source={{
//       uri: 'https://www.nicepng.com/png/detail/849-8497143_yellow-dot-yellow-filled-circle-png.png',
//     }}
//     style={{
//       width:nose.width*100,
//       height: nose.height*100,
//       position: 'absolute',
//       top: nose.y*900,
//       left: nose.x*560,
//       zIndex: 100,

//     }}
//     />
//     : null
//   }
//   </SafeAreaView>
//   );
// }

// export default App;



import React,
 {Component,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import {Platform, StyleSheet, View, DeviceEventEmitter, TouchableOpacity, Image} from 'react-native';
import {CvCamera, CvInvoke} from 'react-native-opencv3';
const  App =() => {
  

  const [data, setData] = useState({ faces : '',
  facing : 'back'
});


const [box, setBox] = useState({});
const [stylex, setStylex] = useState({});
const [e1box, setE1box] = useState({});
const [e2box, setE2box] = useState({});
const [nbox, setNbox] = useState({});
const [mbox, setMbox] = useState({});
const [e1style, setE1style] = useState({});
const [e2style, setE2style] = useState({});
const [nstyle, setNstyle] = useState({});
const [mstyle, setMstyle] = useState({});


  useEffect(() => {
      DeviceEventEmitter.addListener('onFacesDetectedCv', onFacesDetectedCv);
      return () => {
        DeviceEventEmitter.removeListener('onFacesDetectedCv', onFacesDetectedCv);
        
      }
      }, [renderFaceBoxes]);

  const switchFacing = (e) => {
    if (data.facing === 'back') {
      setData({ facing : 'front' })
    }
    else {
      setData({ facing : 'back' })
    }
  }

  onFacesDetectedCv = (e) => {
    //alert('payload: ' + JSON.stringify(e.payload))
    if (Platform.OS === 'ios') {
      if ((!e.nativeEvent.payload && data.faces) || (e.nativeEvent.payload && !data.faces) || (e.nativeEvent.payload && data.faces)) {
        setData({ faces : e.nativeEvent.payload })
      }
    }
    else {
      if ((!e.payload && data.faces) || (e.payload && !data.faces) || (e.payload && data.faces)) {
        setData({ faces : e.payload })
      }
    }
  }

const  renderFaceBoxes= ()=> {
    if (data.faces) {
      const facesJSON = JSON.parse(data.faces)

      // face co-ordinates are in floating point as percentage of view
      const views = facesJSON.faces.map((face, i) => {
        console.log('facesJON is: ' + JSON.stringify(facesJSON))
        
        setBox({
            position: 'absolute',
            top: `${100.0*face.y}%`,
            left: `${100.0*face.x}%`,
            width: '100%',
            height: '100%'
        })
       setStylex({
            width: `${100.0*face.width}%`,
            height: `${100.0*face.height}%`,
            borderWidth: 3,
            borderColor: '#0f0'
        })

       
        if (face.firstEye) {
          setE1box({
            position: 'absolute',
            top: `${100.0*face.firstEye.y}%`,
            left: `${100.0*face.firstEye.x}%`,
            width: '100%',
            height: '100%'
          })
          setE1style({
            width: `${100.0*face.firstEye.width}%`,
            height: `${100.0*face.firstEye.height}%`,
            borderWidth: 2,
            borderColor: '#ff0'
          })
        }

        if (face.secondEye) {
          setE2box({
            position: 'absolute',
            top: `${100.0*face.secondEye.y}%`,
            left: `${100.0*face.secondEye.x}%`,
            width: '100%',
            height: '100%'
          })
        setE2style({
            width: `${100.0*face.secondEye.width}%`,
            height: `${100.0*face.secondEye.height}%`,
            borderWidth: 2,
            borderColor: '#ff0'
          })
        }

       
        if (face.nose) {
         setNbox({
            position: 'absolute',
            top: `${100.0*face.nose.y}%`,
            left: `${100.0*face.nose.x}%`,
            width: '100%',
            height: '100%'
          })
         setNstyle({
            width: `${100.0*face.nose.width}%`,
            height: `${100.0*face.nose.height}%`,
            borderWidth: 2,
            borderColor: '#00f'
          })
        }

        if (face.mouth) {
          setMbox({
            position: 'absolute',
            top: `${100.0*face.mouth.y}%`,
            left: `${100.0*face.mouth.x}%`,
            width: '100%',
            height: '100%'
          })
          setMstyle({
            width: `${100.0*face.mouth.width}%`,
            height: `${100.0*face.mouth.height}%`,
            borderWidth: 2,
            borderColor: '#f00'
          })
        }

        
        return (
          <View key={face.faceId} style={box}><View style={stylex}>
            <View style={e1box}><View style={e1style}></View></View>
            <View style={e2box}><View style={e2style}></View></View>
            <View style={nbox}><View  style={nstyle}></View></View>
            <View style={mbox}><View  style={mstyle}></View></View>
          </View></View>
        )
      })

      return <View style={styles.allFaceBoxes}>{views}</View>
    }
  }


    return (
    <View style={styles.preview}>
        <CvCamera
          style={styles.preview}
          facing={data.facing}
          faceClassifier='haarcascade_frontalface_alt2'
          eyesClassifier='haarcascade_eye_tree_eyeglasses'
          noseClassifier='nose'
          mouthClassifier='mouth'
          onFacesDetectedCv={onFacesDetectedCv}
        
        />
        <View>
        {renderFaceBoxes()}
        </View>
        <TouchableOpacity style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton} onPress={switchFacing}>
          <Image style={Platform.OS === 'android' ? styles.androidImg : styles.iosImg} source={require('./images/flipCamera.png')}/>
        </TouchableOpacity>
      </View>
    )
  
}

const styles = StyleSheet.create({
  androidImg: {
    transform : [{ rotate: '-90deg' }],
    backgroundColor : 'transparent',
    width : 50,
    height : 50
  },
  iosImg: {
    backgroundColor : 'transparent',
    width : 50,
    height : 50
  },
  androidButton: {
    top : 0,
    bottom : 0,
    right : 0,
    width: '10%',
    position : 'absolute',
    backgroundColor : '#FFF',
    opacity : 0.75,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  },
  iosButton: {
    left : 0,
    right : 0,
    bottom : 0,
    height : '10%',
    position : 'absolute',
    backgroundColor : '#FFF',
    opacity : 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  allFaceBoxes: {
    backgroundColor : 'transparent',
    position : 'absolute',
    alignItems : 'center',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%'
  },
  preview: {
    alignItems : 'center',
    backgroundColor : 'transparent',
    top : 0,
    left : 0,
    right : 0,
    bottom : 0,
    position : 'absolute'
  },
});
export default App;