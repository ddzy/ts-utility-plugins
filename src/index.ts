import {
  Draggable,
} from './ddzy/business/draggable/index';


// new Draggable.Sort({

// });

const container = document.getElementById('drag-wrapper') as HTMLDivElement;

container.style.cssText += `
  width: 200px;
  height: 200px;
  border: 1px solid #1890ff;
`;
document.body.style.cssText += `
  width: 800px;
  height: 600px;
  background-color: #ccc;
`;
