export default function sum(...args) {
  return args.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}
