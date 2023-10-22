export default function Counter(props) {
  if (props.counter == 10) {
    return (
      <div>
        <p>test</p>
      </div>
    );
  } else
    return (
      <div>
        <p>{props.counter}</p>
      </div>
    );
}
