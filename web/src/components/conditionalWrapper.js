export default function ConditionalWrapper(props) {
  const { condition, wrap, children } = props;
  return condition ? wrap(children) : children;
}
