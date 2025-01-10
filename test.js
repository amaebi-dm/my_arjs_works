
"use strict";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DeviceOrientationControls } from "three/addons/controls/DeviceOrientationControls.js";




let w;
let h;
let canvas;
let scene;
let camera;
let renderer;
let object;

let controls;





var initThree = function () {
    w = window.innerWidth;
    h = window.innerHeight;
    //   canvas = document.getElementById("canvas");
    canvas = document.querySelector('#myCanvas');
    setScene();
    setCamera();
    setObject();
    setRenderer();
};
var setScene = function () {
    scene = new THREE.Scene();
};
var setCamera = function () {
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 30);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    controls = new DeviceOrientationControls(camera, true);
};
var setObject = function () {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial();
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, 0, 0);
    scene.add(object);
};
var setRenderer = function () {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas,
    });
    renderer.setClearColor(0x0000ff, 1.0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true; // WebXR フラグを有効化
    renderer.setAnimationLoop(function () {
        render();
    });
};
var render = function () {
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
    // render内でcontrols.update()を実行
    controls.update();
    renderer.render(scene, camera);
};
// androidを弾く処理…をここでは「iOS以外」として関数を用意してしまいます…
var isIos = function () {
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf("iphone") >= 0 ||
        ua.indexOf("ipad") >= 0 ||
        ua.indexOf("ipod") >= 0);
};
var checkDeviceOrien = function () {
    return new Promise(function (resolve, reject) {
        if (!isIos())
            resolve("resolve");
        var deviceOrienEvent = function () {
            hideDeviceOrienModal();
            window.removeEventListener("deviceorientation", deviceOrienEvent, false);
            resolve("resolve");
        };
        window.addEventListener("deviceorientation", deviceOrienEvent, false);
        // モーダルを表示させる
        deviceOrienModal = document.getElementById("device-orien-modal");
        deviceOrienModalButton = document.getElementById("device-orien-modal-button");
        var alertMessage = "モーションセンサーの使用が拒否されました。\nこのページを楽しむには、デバイスモーションセンサーの使用を許可する必要があります。\nSafariのアプリを再起動して、モーションセンサーの使用（「動作と方向」へのアクセス）を許可をしてください。";
        deviceOrienModal.classList.remove("is-hidden");
        // モーダルのボタンを押したイベントを取得
        deviceOrienModalButton.addEventListener("click", function () {
            // ここからスマホの傾きを取得するためのリクエストをする処理
            if (DeviceMotionEvent &&
                DeviceMotionEvent.requestPermission &&
                typeof DeviceMotionEvent.requestPermission === "function") {
                DeviceMotionEvent.requestPermission().then(function (res) { });
            }
            if (DeviceOrientationEvent &&
                DeviceOrientationEvent.requestPermission &&
                typeof DeviceOrientationEvent.requestPermission === "function") {
                DeviceOrientationEvent.requestPermission().then(function (res) {
                    console.log(res);
                    if (res === "granted") {
                        // 許可が選択されたらモーダルを非表示にする
                        hideDeviceOrienModal();
                        resolve("resolve");
                    }
                    else {
                        // 拒否されたらアラートを表示
                        alert(alertMessage);
                        reject("resolve");
                    }
                });
            }
            else {
                alert(alertMessage);
                reject("resolve");
            }
        });
    });
};
// モーダルを非表示にする処理
var hideDeviceOrienModal = function () {
    deviceOrienModal.classList.add("is-hidden");
};
window.onload = function () {
    checkDeviceOrien()
        .then(function () {
        // checkDeviceOrien関数のPromiseの結果が出てからThreeシーンの生成を行わせる
        initThree();
    })
        .catch(function (error) {
        console.log(error);
    });
};
