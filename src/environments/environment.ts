// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // halobizBaseUrl: 'https://localhost:44353',
  halobizBaseUrl: 'https://dev-online-backend.azurewebsites.net',
  defaultImageUrl: '../assets/images/CameraShutterColor.svg',
  paystackKey: 'pk_test_61980d19f89fe51c0bca4d5dbcf0e669be155447',
  // firebaseConfig: {
  //   apiKey: "AIzaSyAnFmIEWYpc8QYgBcp6uajH_1LvxR6VKEc",
  //   authDomain: "halo-biz.firebaseapp.com",
  //   projectId: "halo-biz",
  //   storageBucket: "halo-biz.appspot.com",
  //   messagingSenderId: "995912706561",
  //   appId: "1:995912706561:web:f7e52139b03e85fa45ae00",
  // }
   firebaseConfig: {
    apiKey: "AIzaSyCdQkShCc1pTOquUcBLKkPN1RX3JtdOtXI",
    authDomain: "my-halobiz-projects.firebaseapp.com",
    projectId: "my-halobiz-projects",
    storageBucket: "my-halobiz-projects.appspot.com",
    messagingSenderId: "937706939066",
    appId: "1:937706939066:web:eeb95ddb7b23cc71fd1883",
    measurementId: "G-XV5PPFGJ4P"
  }
};
