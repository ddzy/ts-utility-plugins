import {
  Draggable,
} from './ddzy/business/draggable/index';


new Draggable.Sort({
  container: '#app',
})



// ? TEST

// const source = document.getElementById('drag-wrapper') as HTMLDivElement;
// const target = document.getElementById('drop-wrapper') as HTMLDivElement;

// document.body.style.cssText += `
//   margin: 0;
//   padding: 0;
// `;

// source.style.cssText += `
//   width: 200px;
//   height: 200px;
//   border: 1px solid #1890ff;
//   cursor: move;
//   transition: all .3s ease;
// `;
// target.style.cssText += `
//   width: 800px;
//   height: 600px;
//   margin-top: 20px;
//   background-color: #ccc;
//   transition: all .3s ease;
// `;

// source.addEventListener('dragstart', (e) => {
//   const target = e.target as HTMLDivElement;

//   const transfer = e.dataTransfer as DataTransfer;
//   transfer.setData('source', target.getAttribute('id') as string);

//   source.style.cssText += `
//     opacity: 0;
//   `;
// });

// source.addEventListener('dragend', (e) => {
//   source.style.cssText += `
//     opacity: 1;
//   `;
// });

// target.addEventListener('dragover', (e) => {
//   e.preventDefault();
// });

// target.addEventListener('drop', (e) => {
//   e.preventDefault();
//   const target = e.target as HTMLDivElement;
//   const transfer = e.dataTransfer as DataTransfer;
//   const id = transfer.getData('source');

//   target.appendChild(
//     document.getElementById(id) as Node,
//   );
// });