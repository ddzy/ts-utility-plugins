import utilityAlgorithm from "./ddzy/utility/algorithm";

const event = new utilityAlgorithm.EventEmitter({});

const r1 = event.handleOn('click', function () {
  console.log('123');
});
const r2 = event.handleOn('click', function () {
  console.log('456');
});

event.handleRemove(r1);
event.handleRemove(r2);

event.handleEmit('click');

console.log(event.events);