// triangulation metrics
import { TRIANGULATION } from './triangulation';
import image from './images/dot1.png';

// draw triangle
const drawPath = (ctx, points, closePath) => {
  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
  }

  if (closePath) {
    region.closePath();
  }
  ctx.strokeStyle = 'pink';
  ctx.stroke(region);
};
// drawing mesh
// export const drawMesh = (predictions, ctx) => {
//   if (predictions.length > 0) {
//     predictions.forEach((prediction) => {
//       const keypoints = prediction.scaledMesh;
//       //   const keypoints = prediction.annotations.leftEyeLower0;
//       //  Draw Triangles
//       for (let i = 0; i < TRIANGULATION.length / 3; i++) {
//         // Get sets of three keypoints for the triangle
//         const points = [
//           TRIANGULATION[i * 3],
//           TRIANGULATION[i * 3 + 1],
//           TRIANGULATION[i * 3 + 2],
//         ].map((index) => keypoints[index]);
//         //  Draw triangle
//         drawPath(ctx, points, true);
//       }

//       // drawing dots
//       for (let i = 0; i < keypoints.length; i++) {
//         const x = keypoints[i][0];
//         const y = keypoints[i][1];
//         ctx.beginPath();
//         ctx.arc(x, y, 1, 0, 3 * Math.PI);
//         ctx.fillStyle = 'aqua';
//         ctx.fill();
//       }
//     });
//   }
// };

export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;
      const leftEyeLower0 = prediction.annotations.leftEyeLower0;
      const leftEyeUpper0 = prediction.annotations.leftEyeUpper0;
      const rightEyeLower0 = prediction.annotations.rightEyeLower0;
      const rightEyeUpper0 = prediction.annotations.rightEyeUpper0;

      const leftEyeLower1 = prediction.annotations.leftEyeLower1;
      const leftEyeLower2 = prediction.annotations.leftEyeLower2;
      const leftEyeLower3 = prediction.annotations.leftEyeLower3;
      const leftEyeUpper1 = prediction.annotations.leftEyeUpper1;
      const leftEyeUpper2 = prediction.annotations.leftEyeUpper2;

      const rightEyeLower1 = prediction.annotations.rightEyeLower1;
      const rightEyeLower2 = prediction.annotations.rightEyeLower2;
      const rightEyeLower3 = prediction.annotations.rightEyeLower3;
      const rightEyeUpper1 = prediction.annotations.rightEyeUpper1;
      const rightEyeUpper2 = prediction.annotations.rightEyeUpper2;

      // drawing dots
      //   loop(keypoints);
      const lowerLeft = leftEyeLower0.map((item, idx) => {
        let x1 = item[0],
          y1 = item[1];
        return [x1, y1];
      });
      //   console.log('lower left', lowerLeft);
      const upperLeft = leftEyeUpper0.map((item, idx) => {
        let x1 = item[0],
          y1 = item[1];
        return [x1, y1];
      });
      //   console.log('upper left ', upperLeft);
      let centerLeft = [];
      for (let i = 2; i < upperLeft.length - 2; i++) {
        let dx = (upperLeft[i][0] + lowerLeft[i][0]) / 2;
        let dy = (upperLeft[i][1] + lowerLeft[i][1]) / 2;
        centerLeft.push([dx, dy]);
      }

      //   console.log('center left ', centerLeft);

      // loop(centerLeft);
      loop(leftEyeUpper0);
      loop(leftEyeLower0);
      loop(rightEyeUpper0);
      loop(rightEyeLower0);

      //   loop(leftEyeLower1);
      //   loop(leftEyeLower2);
      //   loop(leftEyeLower3);
      //   loop(leftEyeUpper1);
      //   loop(leftEyeUpper2);
      //   loop(rightEyeLower1);
      //   loop(rightEyeLower2);
      //   loop(rightEyeLower3);
      //   loop(rightEyeUpper1);
      //   loop(rightEyeUpper2);

      function loop(keypoints) {
        for (let i = 0; i < keypoints.length; i++) {
          const x = keypoints[i][0];
          const y = keypoints[i][1];
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 10 * Math.PI);
          ctx.fillStyle = 'aqua';
          ctx.fill();

          //   ctx.drawImage(image, x, y);
        }
      }
    });
  }
};

// const rightEyeUpper0 = [246, 161, 160, 159, 158, 157, 173];
// const rightEyeLower0 = [33, 7, 163, 144, 145, 153, 154, 155, 133];
// const rightEyeUpper1 = [247, 30, 29, 27, 28, 56, 190];
// const rightEyeLower1 = [130, 25, 110, 24, 23, 22, 26, 112, 243];
// const rightEyeUpper2 = [113, 225, 224, 223, 222, 221, 189];
// const rightEyeLower2 = [226, 31, 228, 229, 230, 231, 232, 233, 244];
// const rightEyeLower3 = [143, 111, 117, 118, 119, 120, 121, 128, 245];
// // const rightEyebrowUpper = [156, 70, 63, 105, 66, 107, 55, 193];
// // const rightEyebrowLower = [35, 124, 46, 53, 52, 65];
// // const rightEyeIris = [473, 474, 475, 476, 477];
// const leftEyeUpper0 = [466, 388, 387, 386, 385, 384, 398];
// const leftEyeLower0 = [263, 249, 390, 373, 374, 380, 381, 382, 362];
// const leftEyeUpper1 = [467, 260, 259, 257, 258, 286, 414];
// const leftEyeLower1 = [359, 255, 339, 254, 253, 252, 256, 341, 463];
// const leftEyeUpper2 = [342, 445, 444, 443, 442, 441, 413];
// const leftEyeLower2 = [446, 261, 448, 449, 450, 451, 452, 453, 464];
// const leftEyeLower3 = [372, 340, 346, 347, 348, 349, 350, 357, 465];
// // const leftEyebrowUpper = [383, 300, 293, 334, 296, 336, 285, 417];
// // const leftEyebrowLower = [265, 353, 276, 283, 282, 295];
// // const leftEyeIris = [468, 469, 470, 471, 472];
