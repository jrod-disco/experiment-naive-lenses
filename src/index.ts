import './index.scss';
import { doughnuts } from './doughnuts';

import {
  optic,
  view,
  where,
  preview,
  values,
  toArray,
  fold,
  collect,
  compose,
  reduce,
} from 'optics.js';

const app = ((): void => {
  // Parsed JSON Data

  // Simple data set from youtube video
  const simpleData = [
    { id: 1, likes: { count: 10 }, liked: false },
    { id: 2, likes: { count: 20 }, liked: false },
    { id: 3, likes: { count: 30 }, liked: true },
  ];

  console.log('Sample Data');
  console.log(simpleData);
  console.log(doughnuts);
  console.log('-----------');

  // For clarity, noting each argument to the lens generating function
  const index = 1; // because our top node is an array we need an index
  const firstNode = 'likes'; // object key node
  const secondNode = 'count'; // object key node

  // With this library we create a lens by calling optic and passing in arguments that drill into the data structure
  const simpleLens_shallow = optic(index);
  const simpleLens_deep = optic(index, firstNode, secondNode);

  // We can view what is coming back from the lens by pointing it at a data set
  const simpleLens_shallow_view = view(simpleLens_shallow, simpleData);
  const simpleLens_deep_view = view(simpleLens_deep, simpleData);

  // Log em if you got them... oh such mutate!
  console.log(`\nIndex ${index} of doughnuts:`, simpleLens_shallow_view);
  console.log(
    `\nIndex ${index}, ${firstNode}, ${secondNode} of simpleData:`,
    simpleLens_deep_view
  );

  // We can use an existing lens with a different data set
  const simpleLens_shallow_view_doughnuts = view(simpleLens_shallow, doughnuts);
  console.log(
    `\nIndex ${index} of doughnuts:`,
    simpleLens_shallow_view_doughnuts
  );

  // Well... this won't work...
  const simpleLens_deep_view_doughnuts = view(simpleLens_deep, doughnuts);
  console.log('\nExpected error:', simpleLens_deep_view_doughnuts);

  // Let's make a lens that gets us the batters
  const doughnutIndex = 3;
  const batterLens = optic(doughnutIndex, 'batters', 'batter');
  console.log(
    `\nIndex ${doughnutIndex}, batters, batter of doughnuts:`,
    view(batterLens, doughnuts)
  );

  // Ok how about something fancier...
  // rathern than using an index we use `values` which gives us back
  // any number of nodes and can be either turned to an array or reduced
  const dLensOne = optic(values, 'batters', 'batter', values, 'type');
  const dLensOneArray = toArray(dLensOne, doughnuts);
  const reducer = (x) => x;
  const folded = fold(reducer, dLensOne);
  //const dLensTwo = optic(values, values, where({ type: 'Chocolate' }));
  // const dLensThree = ;
  console.log(`\n dLensOneArray`, dLensOneArray);
  console.log(`\n folded`, folded);
  // console.log(`\dLensTwo on dLensOneArray`, toArray(dLensTwo, dLensOneArray));
})();
