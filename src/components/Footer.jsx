const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">NamaBrand</h2>
          <p className="text-sm leading-relaxed">
            Kami menyediakan solusi digital modern untuk membantu bisnis Anda tumbuh
            lebih cepat dan lebih kuat di era digital.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-white transition">Layanan</a></li>
            <li><a href="#" className="hover:text-white transition">Kontak</a></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Kontak</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 0812-3456-7890</li>
            <li>✉️ info@namabrand.com</li>
            <li>🕘 Senin - Jumat, 09.00 - 17.00</li>
          </ul>

          {/* Social */}
          <div className="flex gap-4 mt-4 text-lg">
            <a href="#" className="hover:text-white transition">🌐</a>
            <a href="#" className="hover:text-white transition">📘</a>
            <a href="#" className="hover:text-white transition">📸</a>
          </div>
        </div>

        {/* Alamat + Maps */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Alamat</h3>
          <p className="text-sm mb-3">
            Jl. Merdeka No. 123<br />
            Jakarta Pusat, 10110<br />
            Indonesia
          </p>

          <div className="w-full h-40 rounded overflow-hidden">
            <iframe
              title="Lokasi Kami"
              src="https://www.google.com/maps?q=Jl.+Merdeka+No.+123+Jakarta&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} NamaBrand. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
