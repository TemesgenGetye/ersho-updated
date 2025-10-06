import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16 ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          <div className="hidden lg:block w-full min-h-screen">
            <MediaGridLarge />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-full max-w-2xl aspect-square rounded-xl">
              <LetterVideoMosaic />
            </div>
            <div className="text-center -mt-4">
              <span className="block text-5xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-amber-900">
                እrsho
              </span>
            </div>
          </div>

          <div className="w-full">
            <MediaGridLarge />
          </div>
        </div>
      </div>
    </section>
  );
}

function LetterVideoMosaic() {
  const videoSources = [
    "/vid1.mp4",
    "/vid1.mp4",
    "/vid1.mp4",
    "/vid1.mp4",
    "/vid1.mp4",
    "/vid1.mp4",
    "/vid1.mp4",
    "/vid1.mp4",
    "/vid1.mp4",
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 5000 5000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <mask id="letter-mask">
          <rect x="0" y="0" width="5000" height="5000" fill="black" />
          <text
            x="50%"
            y="52%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize="3800"
            fontWeight="700"
            fontFamily="ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
          >
            እ
          </text>
        </mask>
      </defs>

      <rect
        x="0"
        y="0"
        width="5000"
        height="5000"
        fill="url(#fallbackGradient)"
        mask="url(#letter-mask)"
      />

      <defs>
        <linearGradient id="fallbackGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <foreignObject
        x="0"
        y="0"
        width="5000"
        height="5000"
        mask="url(#letter-mask)"
      >
        <div className="h-full w-full">
          <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-[2px] bg-black/20">
            {videoSources.map((src, index) => (
              <video
                key={index}
                src={src}
                className="h-full w-full object-cover"
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
              />
            ))}
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}

// Removed unused MediaGrid (replaced by MediaGridLarge in layout)

function MediaGridLarge() {
  const videos = ["/vid1.mp4", "/vid1.mp4"];
  const images = [
    "/IMG_0335.JPG",
    "/IMG_0390.JPG",
    "/IMG_0392.JPG",
    "/IMG_0458.jpg",
    "/IMG_0526.jpg",
    "/IMG_0484.JPG",
  ];

  // 4x4 dense grid; place 2 videos and 4 images with spans to create an irregular layout
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2 sm:gap-3 lg:gap-4 h-[28rem] sm:h-[32rem] lg:h-[36rem] w-full">
      {/* Big video spanning 2x2 in top-left */}
      <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
        <video
          src={videos[0]}
          className="h-full w-full object-cover"
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
        />
      </div>

      {/* Tall image on top-right */}
      <div className="col-span-2 row-span-2 rounded-lg overflow-hidden relative">
        <Image src={images[0]} alt="Event A" fill className="object-cover" />
      </div>

      {/* Wide image middle-left */}
      <div className="col-span-2 row-span-1 rounded-lg overflow-hidden relative">
        <Image src={images[1]} alt="Event B" fill className="object-cover" />
      </div>

      {/* Small video bottom-right */}
      <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
        <video
          src={videos[1]}
          className="h-full w-full object-cover"
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
        />
      </div>

      {/* Two small images to fill remaining cells */}
      <div className="col-span-1 row-span-1 rounded-lg overflow-hidden relative">
        <Image src={images[2]} alt="Event C" fill className="object-cover" />
      </div>
      <div className="col-span-2 row-span-1 rounded-lg overflow-hidden relative">
        <Image src={images[3]} alt="Event D" fill className="object-cover" />
      </div>
    </div>
  );
}
