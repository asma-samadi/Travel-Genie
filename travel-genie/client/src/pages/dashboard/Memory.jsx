import { Brain } from "lucide-react";
import GlassCard from "../../components/common/GlassCard";

function Memory() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              shadow-lg
            "
          >
            <Brain size={24} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-white
              "
            >
              Memory
            </h1>

            <p className="mt-1 text-white/70">
              Your saved travel preferences and experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Memory Card */}
      <GlassCard className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">Your Travel Memory</h2>

        <p className="mt-3 text-white/70">
          TravelGenie will use your travel history, preferences, and experiences
          to provide more personalized recommendations.
        </p>

        <div className="mt-6 rounded-2xl bg-white/10 p-5">
          <p className="text-sm text-white/60">No memories saved yet.</p>
        </div>
      </GlassCard>
    </div>
  );
}

export default Memory;
