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
  // onRemoveClickHook(file, fileList) {
  //   console.log({
  //     file,
  //     fileList,
  //   });
  // },
  // onPreviewClickHook(file) {
  //   const reader = new FileReader();
  //   const img = new Image();

  //   reader.readAsDataURL(file);

  //   reader.addEventListener('load', (e) => {
  //     const target = e.target as FileReader;
  //     const url = target.result as string;

  //     img.src = url;
  //   });

  //   img.addEventListener('load', () => {
  //     document.body.appendChild(img);
  //   })
  // },
});
