function Home() {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
          {/* Background Shape */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#8BD02A]/10 to-transparent blur-3xl opacity-70"></div>
  
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Discover Your Style
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-gray-600 mb-10">
            Explore premium men clothing with a modern  shopping experience, designed
            to be simple, and effortless.
          </p>
  
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/explore"
              className="px-8 py-3 rounded-full bg-[#8BD02A] text-white text-lg font-medium hover:bg-[#76B624] transition"
            >
              Explore Now
            </a>
            <a
              href="/register"
              className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 text-lg font-medium hover:border-black hover:text-black transition"
            >
              Join Us
            </a>
          </div>
        </section>
  
        {/* Featured Image / Mockup */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <img
src="/front/src/assets/home.jpg"   alt="Fashion showcase"
            className="rounded-2xl shadow-lg"
          />
  
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Elevate Your Wardrobe
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              From everyday essentials to premium collections, we bring you the
              perfect blend of comfort and style. Designed for the modern shopper
              who values both aesthetics and simplicity.
            </p>
            <a
              href="/explore"
              className="px-6 py-3 rounded-lg bg-[#8BD02A] text-white font-medium hover:bg-[#76B624] transition"
            >
              Shop Collection
            </a>
          </div>
        </section>
      </div>
    );
  }
  
  export default Home;
  