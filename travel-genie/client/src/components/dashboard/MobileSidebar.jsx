import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

function MobileSidebar({ close }) {
  return (
    <div
      className="
fixed
inset-0
z-50

bg-black/40
"
    >
      <motion.div
        initial={{
          x: -300,
        }}
        animate={{
          x: 0,
        }}
        className="
absolute
left-0
top-0
"
      >
        <Sidebar />

        <button
          onClick={close}
          className="
absolute
top-5
right-5

bg-red-500
text-white

px-3
py-1

rounded-lg

"
        >
          X
        </button>
      </motion.div>
    </div>
  );
}

export default MobileSidebar;
