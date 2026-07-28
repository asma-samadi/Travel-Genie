function GlassCard({
  children,

  className = "",
}) {
  return (
    <div
      className={`
backdrop-blur-xl

bg-white/70

dark:bg-white/10

border

border-white/30

rounded-[30px]

shadow-xl

${className}

`}
    >
      {children}
    </div>
  );
}

export default GlassCard;
