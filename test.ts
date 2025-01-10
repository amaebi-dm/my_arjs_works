// "use strict";
// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { DeviceOrientationControls } from "three/addons/controls/DeviceOrientationControls.js";




// let w;
// let h;
// let canvas;
// let scene;
// let camera;
// let renderer;
// let object;

// let controls;


// const initThree = () => {
//   w = window.innerWidth;
//   h = window.innerHeight;
// //   canvas = document.getElementById("canvas");
//   canvas = document.querySelector('#myCanvas')
//   setScene();
//   setCamera();
//   setObject();
//   setRenderer();
// };

// const setScene = () => {
//   scene = new THREE.Scene();
// };

// const setCamera = () => {
//   camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 30);
//   camera.position.set(0, 0, 5);
//   camera.lookAt(0, 0, 0);
//   scene.add(camera);
  
//   controls = new DeviceOrientationControls(camera, true);
// };

// const setObject = () => {
//   const geometry = new THREE.BoxGeometry(1, 1, 1);
//   const material = new THREE.MeshNormalMaterial();
//   object = new THREE.Mesh(geometry, material);
//   object.position.set(0, 0, 0);
//   scene.add(object);
// };

// const setRenderer = () => {
//   renderer = new THREE.WebGLRenderer({
//     antialias: true,
//     canvas: canvas,
//   });
//   renderer.setClearColor(0x0000ff, 1.0);
//   renderer.setSize(w, h);
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.xr.enabled = true; // WebXR フラグを有効化
//   renderer.setAnimationLoop(() => {
//     render();
//   });
// };


// const render = () => {
//   object.rotation.x += 0.01;
//   object.rotation.y += 0.01;
//   // render内でcontrols.update()を実行
//   controls.update();
//   renderer.render(scene, camera);
// };


// // androidを弾く処理…をここでは「iOS以外」として関数を用意してしまいます…
// const isIos = () => {
//     const ua = navigator.userAgent.toLowerCase();
//     return (
//       ua.indexOf("iphone") >= 0 ||
//       ua.indexOf("ipad") >= 0 ||
//       ua.indexOf("ipod") >= 0
//     );
//   };
  
//   const checkDeviceOrien = () => {
//     return new Promise((resolve, reject) => {
//       if (!isIos()) resolve("resolve");
  
//       const deviceOrienEvent = () => {
//         hideDeviceOrienModal();
//         window.removeEventListener("deviceorientation", deviceOrienEvent, false);
//         resolve("resolve");
//       };
//       window.addEventListener("deviceorientation", deviceOrienEvent, false);
  
//       // モーダルを表示させる
//       deviceOrienModal = document.getElementById("device-orien-modal");
//       deviceOrienModalButton = document.getElementById(
//         "device-orien-modal-button"
//       );
//       const alertMessage =
//         "モーションセンサーの使用が拒否されました。\nこのページを楽しむには、デバイスモーションセンサーの使用を許可する必要があります。\nSafariのアプリを再起動して、モーションセンサーの使用（「動作と方向」へのアクセス）を許可をしてください。";
//       deviceOrienModal.classList.remove("is-hidden");
  
//       // モーダルのボタンを押したイベントを取得
//       deviceOrienModalButton.addEventListener("click", () => {
//         // ここからスマホの傾きを取得するためのリクエストをする処理
//         if (
//           DeviceMotionEvent &&
//           (DeviceMotionEvent as any).requestPermission &&
//           typeof (DeviceMotionEvent as any).requestPermission === "function"
//         ) {
//           (DeviceMotionEvent as any).requestPermission().then((res: any) => {});
//         }
//         if (
//           DeviceOrientationEvent &&
//           (DeviceOrientationEvent as any).requestPermission &&
//           typeof (DeviceOrientationEvent as any).requestPermission === "function"
//         ) {
//           (DeviceOrientationEvent as any).requestPermission().then((res: any) => {
//             console.log(res);
//             if (res === "granted") {
//               // 許可が選択されたらモーダルを非表示にする
//               hideDeviceOrienModal();
//               resolve("resolve");
//             } else {
//               // 拒否されたらアラートを表示
//               alert(alertMessage);
//               reject("resolve");
//             }
//           });
//         } else {
//           alert(alertMessage);
//           reject("resolve");
//         }
//       });
//     });
//   };
  
//   // モーダルを非表示にする処理
//   const hideDeviceOrienModal = () => {
//     deviceOrienModal.classList.add("is-hidden");
//   };
  
//   window.onload = () => {
//     checkDeviceOrien()
//       .then(() => {
//         // checkDeviceOrien関数のPromiseの結果が出てからThreeシーンの生成を行わせる
//         initThree();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
















// // const width = 960;
// // const height = 540;

// // // レンダラーを作成
// // const renderer = new THREE.WebGLRenderer({
// //   canvas: document.querySelector('#myCanvas')
// // });
// // renderer.setSize(width, height);
// // renderer.setPixelRatio(devicePixelRatio);

// // // シーンを作成
// // const scene = new THREE.Scene();

// // // カメラを作成
// // const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
// // // カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
// // camera.position.set(0, 0, 1000);

// // // 箱を作成
// // const geometry = new THREE.BoxGeometry(500, 500, 500);
// // const material = new THREE.MeshStandardMaterial({color: 0x0000FF});
// // const box = new THREE.Mesh(geometry, material);
// // scene.add(box);

// // // 平行光源
// // const light = new THREE.DirectionalLight(0xFFFFFF);
// // light.intensity = 2; // 光の強さを倍に
// // light.position.set(1, 1, 1); // ライトの方向
// // // シーンに追加
// // scene.add(light);

// // // 初回実行
// // tick();

// // function tick() {
// //   requestAnimationFrame(tick);

// //   // 箱を回転させる
// //   box.rotation.x += 0.01;
// //   box.rotation.y += 0.01;

// //   // レンダリング
// //   renderer.render(scene, camera);
// // }
