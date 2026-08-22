import { X } from "lucide-react";

import { motion } from "framer-motion";

import Sidebar from "./Sidebar";

function MobileSidebar({ close }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
      "
      onClick={close}
    >
      <motion.div
        initial={{
          x: -300,
        }}
        animate={{
          x: 0,
        }}
        exit={{
          x: -300,
        }}
        transition={{
          duration: 0.3,
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          absolute
          left-0
          top-0
          h-full
          w-[264px]
        "
      >
        <Sidebar />

        <button
          type="button"
          onClick={close}
          className="
            absolute
            top-10
            right-2
            z-[60]
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-white/10
            text-white
            backdrop-blur-xl
            border
            border-white/20
            hover:bg-red-500
            transition-all
            duration-300
          "
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </motion.div>
    </div>
  );
}

export default MobileSidebar;
