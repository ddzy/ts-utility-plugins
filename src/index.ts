import {
  Draggable,
} from './ddzy/business/draggable/index';


new Draggable.Sort({
  container: '#app',
  dragWrapperStyle: {
    backgroundColor: '#1890ff',
    opacity: '.5'
  },
  dragOriginStyle: {
    backgroundColor: 'red',
  },
  dragOriginActiveStyle: {
    backgroundColor: 'blue',
  },
})