const Button = ({ name, color, bgColorFn, deleteID }) => {
  return (
    <button
      style={{ borderColor: `${color}`, color }}
      onClick={(e) => {
        console.log(deleteID);

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
