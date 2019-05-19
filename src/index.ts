import { Upload } from './ddzy/business/upload/index';

new Upload.Dragger({
  container: '#app',
  // onBeforeUploadHook(file) {
  //   return new Promise((resolve, reject) => {
  //     if (file.size / 1024 > 10) {
  //       const newFile = new File([file], `${Date.now()}.jpg`, {
  //         type: 'image/jpg',
  //       });
  //       resolve(newFile);
  //     }
  //     else {
  //       reject(file);
  //     }
  //   });
  // },
});
