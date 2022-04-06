const Button = ({ name, color, bgColorFn }) => {
  return (
    <button
      style={{ borderColor: `${color}`, color }}
      onClick={() => {
        bgColorFn(color);
      }}
    >
      {name}
    </button>
  );
};

export default Button;
