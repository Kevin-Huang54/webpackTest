export default function sum(...args) {
  return args.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);
}
