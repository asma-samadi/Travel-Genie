function Button({
  children,

  className = "",

  ...props
}) {
  return (
    <button
      className={`
px-7
py-3

rounded-full

bg-[#3ED6D2]

text-[#143737]

font-semibold

hover:scale-105

hover:shadow-xl

transition-all

duration-300

${className}

`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
