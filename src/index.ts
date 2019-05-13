import {
  Draggable,
} from './ddzy/business/draggable/index';


new Draggable.Sort({
  container: '#app',
  animate: true,
  // onDragStartHook(node) {
  //   console.log(node);
  // },
  // onDragEnterHook(origin, target) {
  //   console.log({
  //     origin, target,
  //   });
  // },
  // onDragOverHook(origin, target) {
  //   console.log({
  //     origin,
  //     target,
  //   });
  // },
  // onDragLeaveHook(origin, target) {
  //   console.log({
  //     origin,
  //     target,
  //   });
  // },
  // onDropHook(origin) {
  //   console.log({
  //     origin,
  //   });
  // },
})