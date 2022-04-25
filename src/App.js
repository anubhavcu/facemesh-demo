import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { drawMesh } from './utiilities';

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState('');
  let leftEyePos, rightEyePos;

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImage(imgSrc);
    // getCoordinates();
  });

  // const getCoordinates = async () => {
  //   const net = await facemesh.load({
  //     inputResolution: { width: 640, height: 480 },
  //     scale: 0.8,
  //   });
  //   const video = webcamRef.current.video;
  //   const face = await net.estimateFaces(video);
  //   console.log('coordinates .... ldjsal', face);
  // };

  // load facemesh
  const runFaceMesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });

    setInterval(() => {
      detect(net);
    }, 100);
  };

  // detect function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvase width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const face = await net.estimateFaces(video);
      console.log(face);
      // get canvas context for drawing
      const ctx = canvasRef.current.getContext('2d');
      drawMesh(face, ctx);
      // console.log(ctx);
    }
  };
  useEffect(() => {
    runFaceMesh();
  }, [image]);
  return (
    <div className='container'>
      {/* <h2>Facemesh</h2> */}
      <div className='webcam-img'>
        {image === '' ? (
          <Webcam
            ref={webcamRef}
            className='canvasContainer'
            screenshotFormat='image/jpeg'
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
        ) : (
          <img
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zindex: 9,
              width: 640,
              height: 480,
            }}
            src={image}
            alt='user'
          />
        )}
        <canvas
          ref={canvasRef}
          className='canvasContainer'
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>
      <div>
        {image !== '' ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage('');
            }}
            className='webcam-btn'
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className='webcam-btn'
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
