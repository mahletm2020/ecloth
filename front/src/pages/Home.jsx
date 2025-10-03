import { motion } from "framer-motion";

function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#8BD02A]/20 to-transparent blur-[120px] opacity-60" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
        >
           Your Style
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-xl text-lg md:text-xl text-gray-600 mb-10"
        >
          Explore premium men clothing with a modern shopping experience —
          simple, effortless, and elegant.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
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
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="/src/assets/home.jpg"
          alt="Fashion showcase"
          className="rounded-3xl shadow-xl transform hover:scale-105 transition duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Elevate Your Wardrobe
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            From everyday essentials to premium collections — we bring you the
            perfect blend of comfort, elegance, and simplicity.
          </p>
          <a
            href="/explore"
            className="px-6 py-3 rounded-lg bg-[#8BD02A] text-white font-medium shadow hover:bg-[#76B624] transition duration-300"
          >
            Shop Collection
          </a>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
