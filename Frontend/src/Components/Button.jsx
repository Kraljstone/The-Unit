const Button = ({ name, color, bgColorFn }) => {
  return (
    <button
      style={{ borderColor: `${color}`, color }}
      onClick={(e) => {
        bgColorFn(color);

        fetch(
          "https://twitter-clone-b69f5-default-rtdb.europe-west1.firebasedatabase.app/colors.json",
          { method: "DELETE" }
        ).then((res) => res.json());
      }}
    >
      {name}
    </button>
  );
};

export default Button;
