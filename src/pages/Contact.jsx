// pages/Contact.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, Mail, Phone, MapPin, Clock, Send, 
  MessageCircle, CheckCircle, Loader2, AlertCircle,
  Facebook, Twitter, Linkedin, Instagram, ArrowRight
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'parent'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // success, error, null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        userType: 'parent'
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@kindercare-ai.com', 'info@kindercare-ai.com'],
      color: 'blue'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+92 51 123 4567', 'Helpline: 0800-KINDER'],
      color: 'green'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['PMAS-Arid Agriculture University', 'Rawalpindi, Pakistan'],
      color: 'red'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
      color: 'purple'
    }
  ]

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on "Get Started" and follow the registration process. You can sign up as a parent or healthcare provider.'
    },
    {
      question: 'Is the AI triage service free?',
      answer: 'Yes! The basic AI triage service is free for all registered users. Premium features may require a subscription.'
    },
    {
      question: 'How do I connect with a doctor?',
      answer: 'After receiving your triage result, you can book an appointment or start a teleconsultation directly from the app.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use end-to-end encryption and comply with international health data privacy standards.'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">KinderCare AI</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
              <Link to="/contact" className="text-primary-600 font-medium">Contact</Link>
              <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">Login</Link>
              <Link to="/register" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-500 via-primary-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions about KinderCare AI? We're here to help! 
            Reach out to us and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${colorClasses[info.color]}`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-500">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                  <p className="text-gray-500">We'll get back to you within 24 hours</p>
                </div>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. We'll respond shortly.</p>
                  <button 
                    onClick={() => setSubmitStatus(null)}
                    className="text-primary-600 font-medium hover:text-primary-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                    <div className="flex space-x-4">
                      {['parent', 'doctor', 'other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, userType: type})}
                          className={`px-6 py-2 rounded-xl border-2 capitalize transition-all ${
                            formData.userType === type
                              ? 'border-primary-500 bg-primary-50 text-primary-600'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-primary-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-3xl h-72 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-blue-100">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">PMAS-Arid Agriculture University</p>
                    <p className="text-gray-500 text-sm">Rawalpindi, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Quick FAQs */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-medium text-gray-800 mb-1">{faq.question}</h4>
                      <p className="text-gray-500 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="flex items-center space-x-1 text-primary-600 font-medium mt-4 hover:text-primary-700">
                  <span>View all FAQs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Connect with Us</h3>
                <p className="text-gray-400 mb-6">Follow us on social media for updates and health tips!</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 bg-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <AlertCircle className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg">Medical Emergency?</h3>
                <p className="text-red-100">For immediate medical emergencies, please call emergency services.</p>
              </div>
            </div>
            <a href="tel:115" className="bg-white text-red-500 px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-red-50 transition-colors">
              <Phone className="w-5 h-5" />
              <span>Call Emergency: 115</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="w-6 h-6 text-primary-400" />
              <span className="font-bold">KinderCare AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 KinderCare AI. Final Year Project - PMAS-Arid Agriculture University
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact