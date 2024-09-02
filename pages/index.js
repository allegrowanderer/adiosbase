export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
        {/* Text "ADIOS" on the left side */}
        <div className="text-white text-6xl sm:text-8xl font-custom leading-none">
          <div>A</div>
          <div>D</div>
          <div>I</div>
          <div>O</div>
          <div>S</div>
        </div>

        {/* Circular image in the center */}
        <img 
          src="/adios.png" 
          alt="Token Image" 
          className="rounded-full w-48 h-48 sm:w-96 sm:h-96 object-contain"
        />

        {/* Text "BASE" on the right side */}
        <div className="text-white text-6xl sm:text-8xl font-custom leading-none">
          <div>B</div>
          <div>A</div>
          <div>S</div>
          <div>E</div>
        </div>
      </div>
    </div>
  )
}
