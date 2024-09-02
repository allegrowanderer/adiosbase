import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    let ships = [];
    let animationFrameId;
    let lastTime = 0;

    const spawnShip = () => {
      const ship = document.createElement('div');
      ship.classList.add('ship');

      // Set initial position at the bottom with a random horizontal position
      ship.style.left = `${Math.random() * 90}vw`;
      ship.style.bottom = '-60px'; // Start just below the viewport

      document.body.appendChild(ship);

      ships.push({ element: ship, startTime: performance.now() });

      // Add click event to "explode" the ship and stop movement
      ship.addEventListener('click', () => {
        const rect = ship.getBoundingClientRect();
        ship.style.backgroundImage = 'url(/explosion.webp)';
        ship.style.backgroundSize = 'contain';
        ship.style.width = '120px';
        ship.style.height = '120px';
        ship.style.left = `${rect.left}px`;
        ship.style.bottom = 'auto';
        ship.style.top = `${rect.top}px`;
        ship.style.transform = 'none'; // Stop the movement
        ship.classList.add('explode');
        setTimeout(() => {
          ship.remove();
          ships = ships.filter(s => s.element !== ship); // Remove ship from the array
        }, 1000); // Remove the ship after explosion
      });
    };

    const animate = (time) => {
      ships.forEach(shipData => {
        const { element, startTime } = shipData;
        const elapsed = time - startTime;
        
        if (!element.classList.contains('explode')) {
          // Calculate the position based on elapsed time
          const progress = elapsed / 5000; // 5 seconds for the full animation
          element.style.transform = `translateY(${Math.min(-100 * progress, -100)}vh)`;

          // If the ship reaches the top and hasn't exploded, remove it
          if (progress >= 1) {
            element.remove();
            ships = ships.filter(s => s.element !== element); // Remove ship from the array
          }
        }
      });

      // Continue the animation
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Spawn a new ship every 2 seconds
    const shipSpawnInterval = setInterval(spawnShip, 2000);

    // Start the animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Listen for tab visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up on component unmount
    return () => {
      clearInterval(shipSpawnInterval);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      ships.forEach(shipData => shipData.element.remove());
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
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

      {/* "BUY NOW!!!" Link directly below the adios.png */}
      <div className="mt-8 flex justify-center">
        <a 
          href="https://ape.store/base/0xbcba68c664a16112cce31623106881173ff76b71" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white text-4xl sm:text-5xl font-custom bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          BUY NOW!!! 
        </a>
      </div>
    </div>
  )
}
