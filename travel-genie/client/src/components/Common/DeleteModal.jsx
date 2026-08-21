import { motion, AnimatePresence } from "framer-motion";

import { AlertTriangle } from "lucide-react";

function DeleteModal({ isOpen, tripName, onClose, onDelete }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed
            inset-0
            z-50

            flex
            items-center
            justify-center

            bg-black/50

            backdrop-blur-sm

            px-4
          "
        >
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
              y: 20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-md

              rounded-3xl

              bg-white
              dark:bg-slate-900

              border
              border-gray-200
              dark:border-white/10

              p-6

              shadow-2xl
            "
          >
            {/* Icon */}

            <div
              className="
                mx-auto

                flex
                h-16
                w-16

                items-center
                justify-center

                rounded-full

                bg-red-100
                dark:bg-red-500/20
              "
            >
              <AlertTriangle
                size={32}
                className="
                  text-red-500
                "
              />
            </div>

            {/* Title */}

            <h2
              className="
                mt-5

                text-center

                text-2xl

                font-bold

                text-gray-900
                dark:text-white
              "
            >
              Delete trip?
            </h2>

            {/* Text */}

            <p
              className="
                mt-3

                text-center

                text-gray-600
                dark:text-white/70
              "
            >
              Are you sure you want to delete
              <span className="font-semibold"> {tripName}</span>?
            </p>

            {/* Buttons */}

            <div
              className="
                mt-8

                flex

                gap-3
              "
            >
              <button
                onClick={onClose}
                className="
                  flex-1

                  rounded-xl

                  border
                  border-gray-300
                  dark:border-white/10

                  py-3

                  text-gray-700
                  dark:text-white

                  hover:bg-gray-100
                  dark:hover:bg-white/10

                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={onDelete}
                className="
                  flex-1

                  rounded-xl

                  bg-red-500

                  py-3

                  font-semibold

                  text-white

                  hover:bg-red-600

                  transition
                "
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;
