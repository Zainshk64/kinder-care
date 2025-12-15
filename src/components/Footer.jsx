import { Link } from 'react-router-dom'
import { Baby, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
                <Baby className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">KinderCare</span>
                <span className="text-sm text-gray-400 block">AI Assistant</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              AI-powered pediatric health assistant providing safe, accurate, and timely health guidance for your children.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-triage" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  <span>AI Triage</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>
                <span>AI Symptom Analysis</span>
              </li>
              <li className="text-gray-400 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>
                <span>Doctor Consultations</span>
              </li>
              <li className="text-gray-400 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>
                <span>Health Records</span>
              </li>
              <li className="text-gray-400 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>
                <span>Emergency Alerts</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span>PMAS-Arid University, Rawalpindi</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary-500" />
                <span>info@kindercareai.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary-500" />
                <span>+92 300 1234567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 KinderCare AI. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Developed by Faiq Ahmed Sheikh & Muhammad Bilal | Supervised by Dr. Sarfraz Bibi
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer