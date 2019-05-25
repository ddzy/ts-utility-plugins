import utilityFunction from './ddzy/utility/function/index';

// utilityFunction._call('push', {}, 123);

Function.prototype['_call' as 'prototype'] = utilityFunction._call;


const origin = {
  name: 'duan',
};

const target = {
  say(...args: any[]) {
    console.log(this['name' as keyof typeof target]);
    console.log(args);
  },
};


// target.say['_call' as 'prototype'](origin, 1, 2, 3, 4);
// target.say['_call' as 'prototype'](null, 1, 2, 3, 4);

Function.prototype['_bind' as 'prototype'] = utilityFunction._bind;

target.say['_bind' as 'prototype'](origin)(['one', 'two', 'three'])