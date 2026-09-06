import { useRef, useState } from "react";
import {
  Camera,
  Download,
  ImagePlus,
  MapPin,
  Plus,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { useTrips } from "../../context/TripContext.jsx";

function Memories() {
  const { trips } = useTrips();
  const fileInputRef = useRef(null);

  const [memories, setMemories] = useState(() => {
    try {
      const savedMemories = localStorage.getItem("travelgenie-memories");
      return savedMemories ? JSON.parse(savedMemories) : [];
    } catch {
      return [];
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [caption, setCaption] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // Save memories to localStorage
  // ---------------------------------------------------------

  const saveMemories = (updatedMemories) => {
    setMemories(updatedMemories);
    localStorage.setItem(
      "travelgenie-memories",
      JSON.stringify(updatedMemories),
    );
  };

  // ---------------------------------------------------------
  // Handle image selection
  // ---------------------------------------------------------

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setError("");
    };

    reader.readAsDataURL(file);
  };

  // ---------------------------------------------------------
  // Add memory
  // ---------------------------------------------------------

  const handleAddMemory = (event) => {
    event.preventDefault();

    if (!selectedImage) {
      setError("Please add a photo to create a memory.");
      return;
    }

    if (!selectedTrip) {
      setError("Please choose the trip this memory belongs to.");
      return;
    }

    const trip = trips.find((item) => String(item.id) === String(selectedTrip));

    const newMemory = {
      id: Date.now(),
      image: selectedImage,
      tripId: selectedTrip,
      destination: trip?.destination || "My Trip",
      caption: caption.trim() || "A beautiful travel memory ✨",
      createdAt: new Date().toISOString(),
    };

    saveMemories([newMemory, ...memories]);

    setSelectedImage(null);
    setSelectedTrip("");
    setCaption("");
    setError("");
    setShowForm(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ---------------------------------------------------------
  // Delete memory
  // ---------------------------------------------------------

  const handleDeleteMemory = (id) => {
    const updatedMemories = memories.filter((memory) => memory.id !== id);

    saveMemories(updatedMemories);
  };

  // ---------------------------------------------------------
  // Download memories as PDF
  // ---------------------------------------------------------

  const handleDownloadPDF = () => {
    if (memories.length === 0) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let yPosition = 20;

    pdf.setFontSize(22);
    pdf.text("Travel Memories", 20, yPosition);

    yPosition += 10;

    pdf.setFontSize(10);
    pdf.text(
      "A collection of unforgettable moments from my journeys.",
      20,
      yPosition,
    );

    yPosition += 12;

    memories.forEach((memory, index) => {
      // Start a new page when needed
      if (yPosition > 190) {
        pdf.addPage();
        yPosition = 20;
      }

      try {
        pdf.addImage(memory.image, "JPEG", 20, yPosition, 80, 60);
      } catch (error) {
        console.error("Could not add image to PDF:", error);
      }

      pdf.setFontSize(14);
      pdf.text(memory.destination, 110, yPosition + 10);

      pdf.setFontSize(10);

      const captionLines = pdf.splitTextToSize(memory.caption, 75);

      pdf.text(captionLines, 110, yPosition + 20);

      pdf.setDrawColor(220, 220, 220);
      pdf.line(20, yPosition + 70, 190, yPosition + 70);

      yPosition += 80;

      // Add page number on the last memory if needed
      if (index === memories.length - 1) {
        pdf.setFontSize(8);
      }
    });

    pdf.save("my-travel-memories.pdf");
  };

  return (
    <div className="space-y-8">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
              <Camera size={23} />
            </div>

            <div>
              <h1
                className="
                  text-3xl
                  font-bold
                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-500
                  to-purple-500
                  bg-clip-text
                  text-transparent
                "
              >
                Travel Memories
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-white/60">
                Save and revisit the moments that made your journeys special.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {memories.length > 0 && (
            <button
              onClick={handleDownloadPDF}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-700
                shadow-sm
                transition
                hover:bg-gray-50
                dark:border-white/10
                dark:bg-white/10
                dark:text-white
                dark:hover:bg-white/15
              "
            >
              <Download size={17} />
              Export PDF
            </button>
          )}

          <button
            onClick={() => {
              setShowForm(!showForm);
              setError("");
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-cyan-500/20
              transition
              hover:bg-cyan-400
              hover:-translate-y-0.5
            "
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}

            {showForm ? "Close" : "Add Memory"}
          </button>
        </div>
      </div>

      {/* =====================================================
          ADD MEMORY FORM
          ===================================================== */}

      {showForm && (
        <section
          className="
            rounded-[28px]
            border
            border-gray-200/70
            bg-white/80
            p-6
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/5
          "
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create a New Memory
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
              Add a photo and connect it to one of your adventures.
            </p>
          </div>

          <form onSubmit={handleAddMemory} className="space-y-5">
            {/* PHOTO */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/80">
                Photo
              </label>

              {selectedImage ? (
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
                  <img
                    src={selectedImage}
                    alt="Memory preview"
                    className="h-64 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="
                      absolute
                      right-3
                      top-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-black/60
                      text-white
                      backdrop-blur-sm
                      transition
                      hover:bg-black/80
                    "
                    aria-label="Remove image"
                  >
                    <X size={17} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="
                    flex
                    min-h-[180px]
                    w-full
                    flex-col
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    border-2
                    border-dashed
                    border-gray-200
                    bg-gray-50/50
                    text-gray-500
                    transition
                    hover:border-cyan-400
                    hover:bg-cyan-50/50
                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-white/50
                    dark:hover:border-cyan-400/50
                    dark:hover:bg-cyan-500/5
                  "
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
                    <ImagePlus size={23} />
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-white/80">
                      Add your favorite photo
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Click here to choose an image
                    </p>
                  </div>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* TRIP */}

            <div>
              <label
                htmlFor="trip"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/80"
              >
                Which trip was this memory from?
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
                />

                <select
                  id="trip"
                  value={selectedTrip}
                  onChange={(event) => setSelectedTrip(event.target.value)}
                  className="
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    text-gray-700
                    outline-none
                    transition
                    focus:border-cyan-400
                    focus:ring-4
                    focus:ring-cyan-500/10
                    dark:border-white/10
                    dark:bg-white/5
                    dark:text-white
                  "
                >
                  <option value="">Select a trip</option>

                  {trips.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.destination || "Unnamed Trip"}
                    </option>
                  ))}
                </select>
              </div>

              {trips.length === 0 && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                  Create a trip first so you can attach memories to it.
                </p>
              )}
            </div>

            {/* CAPTION */}

            <div>
              <label
                htmlFor="caption"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/80"
              >
                Caption
              </label>

              <textarea
                id="caption"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                placeholder="Tell the story behind this moment..."
                rows={4}
                maxLength={250}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-500/10
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                  dark:placeholder:text-white/30
                "
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {caption.length}/250
              </p>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-cyan-500
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-cyan-400
                "
              >
                <Plus size={18} />
                Save Memory
              </button>
            </div>
          </form>
        </section>
      )}

      {/* =====================================================
          MEMORIES
          ===================================================== */}

      {memories.length === 0 ? (
        <section
          className="
            flex
            min-h-[360px]
            flex-col
            items-center
            justify-center
            rounded-[28px]
            border
            border-gray-200/70
            bg-white/80
            p-8
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/5
          "
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-500">
            <Camera size={30} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
            Your story is waiting to be captured
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-white/50">
            Add photos from your trips and create a beautiful collection of
            memories you can revisit and share.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-cyan-400
            "
          >
            <ImagePlus size={18} />
            Add Your First Memory
          </button>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {memories.map((memory) => (
            <article
              key={memory.id}
              className="
                group
                overflow-hidden
                rounded-[28px]
                border
                border-gray-200/70
                bg-white/80
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                backdrop-blur-xl
                transition
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-white/10
                dark:bg-white/5
              "
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={memory.image}
                  alt={memory.caption}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />

                <button
                  onClick={() => handleDeleteMemory(memory.id)}
                  className="
                    absolute
                    right-3
                    top-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/90
                    text-red-500
                    opacity-0
                    shadow-sm
                    backdrop-blur-sm
                    transition
                    group-hover:opacity-100
                    hover:bg-red-50
                    dark:bg-black/50
                  "
                  aria-label="Delete memory"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <MapPin size={15} />

                  <span className="text-sm font-semibold">
                    {memory.destination}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                  {memory.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* =====================================================
          SHARE INFORMATION
          ===================================================== */}

      {memories.length > 0 && (
        <p className="flex items-center justify-center gap-2 text-center text-xs text-gray-400 dark:text-white/40">
          <Share2 size={14} />
          Export your memories as a PDF and share your journey with others.
        </p>
      )}
    </div>
  );
}

export default Memories;
