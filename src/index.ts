import utilityDOM from './utility/dom/index';

// utilityDOM.traversalDOMWithBFS(
//   document.getElementById('app') as HTMLDivElement,
//   (node) => {
//     console.log(node);
//   }
// );

utilityDOM.traversalDOMWithDFS(
  document.getElementById('app') as HTMLDivElement,
  (node) => {
    console.log(node);
  },
);