import { motion } from "framer-motion";

function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Glowing Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#8BD02A]/20 to-transparent blur-[120px] opacity-60" />

      {/* Hero Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >


          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
           MAN FASION
          </h1>
          <p className="max-w-md text-lg md:text-xl text-gray-600 mb-10">
            Explore premium men clothing 
            simple, effortless, and elegant.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/explore"
              className="px-8 py-3 rounded-full bg-[#8BD02A] text-white text-lg font-semibold shadow-lg hover:bg-[#76B624] transition duration-300"
            >
              Explore Now
            </a>
            <a
              href="/register"
              className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 text-lg font-semibold hover:border-black hover:text-black transition duration-300"
            >
              Join Us
            </a>
          </div>
        </motion.div>

        {/* Right Image Side with Ripped Paper Effect */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <div className="relative overflow-hidden rounded-3xl  h-80 shadow-2xl border border-gray-200 bg-white">
            <img
              src="/src/assets/home.jpg"
              alt="Fashion Showcase"
              className="w-full object-cover mask-ripped-paper"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
