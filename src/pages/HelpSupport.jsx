// pages/HelpSupport.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  HelpCircle, Search, Book, MessageCircle, Phone, Mail,
  ChevronDown, ChevronRight, ExternalLink, PlayCircle,
  FileText, Users, Shield, Stethoscope, Activity, Baby
} from 'lucide-react'

const HelpSupport = ({ userType = 'parent' }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const categories = [
    { id: 1, title: 'Getting Started', icon: Book, count: 8 },
    { id: 2, title: 'AI Triage', icon: Activity, count: 12 },
    { id: 3, title: 'Appointments', icon: Stethoscope, count: 6 },
    { id: 4, title: 'Child Profiles', icon: Baby, count: 5 },
    { id: 5, title: 'Account & Security', icon: Shield, count: 7 },
    { id: 6, title: 'Billing', icon: FileText, count: 4 },
  ]

  const faqs = [
    { id: 1, question: 'How accurate is the AI triage system?', answer: 'KinderCare AI uses WHO/CDC guidelines with 94.5% accuracy. However, it\'s designed as a guidance tool and not a replacement for professional medical advice. Always consult a doctor for serious concerns.' },
    { id: 2, question: 'Can I use KinderCare AI in Urdu?', answer: 'Yes! KinderCare AI supports both English and Urdu. You can change your language preference in Settings > Language.' },
    { id: 3, question: 'How do I add a new child profile?', answer: 'Go to your Profile > Children tab and click "Add Child". Fill in the required information including name, age, blood type, and any known allergies.' },
    { id: 4, question: 'Is my health data secure?', answer: 'Absolutely! We use end-to-end encryption and comply with HIPAA/GDPR standards. Your data is stored securely on encrypted servers and never shared without consent.' },
    { id: 5, question: 'How do I schedule an appointment?', answer: 'Click on "Appointments" in the sidebar, then "New Appointment". Select your child, choose a doctor, pick a date and time, and confirm your booking.' },
    { id: 6, question: 'What do the triage results mean?', answer: '"Home Care" means symptoms can be managed at home. "GP Visit" means schedule a doctor visit within 24 hours. "Emergency" means seek immediate medical attention.' },
  ]

  const videos = [
    { id: 1, title: 'How to Use AI Symptom Checker', duration: '3:45' },
    { id: 2, title: 'Setting Up Your Child\'s Profile', duration: '2:30' },
    { id: 3, title: 'Booking Your First Appointment', duration: '4:15' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType={userType} />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">How can we help you?</h1>
          <p className="text-gray-500 text-lg mb-8">Search our knowledge base or contact support</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
            />
          </div>
        </div>

        {/* Quick Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((cat) => (
            <button key={cat.id} className="card hover:shadow-lg transition-all hover:-translate-y-1 text-center py-6">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <cat.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{cat.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.count} articles</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQs */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 text-gray-600 bg-gray-50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="card mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Video Tutorials</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <div key={video.id} className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-8 h-8 text-primary-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-medium text-sm">{video.title}</p>
                      <p className="text-white/60 text-xs">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <h3 className="text-xl font-bold mb-4">Need more help?</h3>
              <p className="text-white/80 mb-6">Our support team is available 24/7 to assist you.</p>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Live Chat</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>support@kindercare.ai</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+92 51 1234567</span>
                </button>
              </div>
            </div>

            {/* Community */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Community</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Parent Forum</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Book className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Health Blog</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">Privacy Policy</a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">Terms of Service</a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">Medical Disclaimer</a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HelpSupport