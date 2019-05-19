import { Upload } from './ddzy/business/upload/index';

new Upload.Dragger({
  container: '#app',

  onBeforeUploadHook(file) {
    return new Promise((resolve, reject) => {
      if (file.size / 1024 > 10) {
        const newFile = new File([file], `${Date.now()}.jpg`, {
          type: 'image/jpg',
        });
        resolve(newFile);
      }
      else {
        console.log('文件太小了');
        reject(file);
      }
    });
  },

  onChangeHook(e) {
    console.log(e);
  },

  onPreviewClickHook(file) {
    const reader = new FileReader();
    const img = new Image();

    reader.readAsDataURL(file);

    reader.addEventListener('load', (e) => {
      const target = e.target as FileReader;
      img.src = target.result as string;
    })

    img.addEventListener('load', () => {
      document.body.appendChild(img);
    })
  },

  onRemoveClickHook(file) {
    console.log(`${file.name} has been removed.`);
  },

  onUploadClickHook() {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject()
      }, 2000);
    });
  },

  onUploadClickSuccessHook(file) {
    console.log(`${file.name} has been send to server successfully`);
  },

  onUploadClickFailHook(file) {
    console.log(`${file.name} has been send to server faild`);
  },

});
