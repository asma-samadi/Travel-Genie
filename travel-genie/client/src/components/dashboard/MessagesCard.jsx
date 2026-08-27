import { MessageCircle, Bell } from "lucide-react";

function MessagesCard() {
  return (
    <section
      className="
        relative
        min-h-[120px]
        overflow-hidden
        rounded-[28px]
        border
        border-gray-200/70
        bg-white/80
        p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-white/5
      "
    >
      {/* Decorative background */}
      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-36
          w-36
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-cyan-500/10
            text-cyan-500
          "
        >
          <MessageCircle size={21} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Messages
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
                Stay updated with your travel activity.
              </p>
            </div>

            <div
              className="
                hidden
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gray-50
                text-gray-400
                dark:bg-white/5
                dark:text-white/40
                sm:flex
              "
              aria-label="Notifications"
            >
              <Bell size={17} />
            </div>
          </div>

          {/* Empty state */}
          <div
            className="
              mt-4
              rounded-xl
              border
              border-gray-100
              bg-gray-50/70
              px-4
              py-3
              dark:border-white/5
              dark:bg-white/5
            "
          >
            <p className="text-xs text-gray-500 dark:text-white/50">
              You're all caught up! New travel updates and messages will appear
              here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesCard;
