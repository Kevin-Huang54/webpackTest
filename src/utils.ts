export function expensiveFn() {
  console.log('expensiveFn start');
  let i = 0;
  for (let j = 0; j < 2e9; j++) {
    i++;
  }
  console.log('expensiveFn end');
  return 'expensiveFn finished'
}
