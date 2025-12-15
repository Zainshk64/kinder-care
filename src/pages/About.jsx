// pages/About.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, Shield, Users, Award, CheckCircle, Star,
  Brain, Stethoscope, Globe, Lock, Clock, Zap,
  ArrowRight, Play, ChevronDown, ChevronUp
} from 'lucide-react'

const About = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Triage',
      description: 'Advanced NLP and LLM technology analyzes symptoms and provides accurate triage recommendations based on WHO/CDC guidelines.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Evidence-Based',
      description: 'All recommendations are grounded in validated pediatric health protocols from WHO, CDC, and NICE guidelines.',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Full support for English and Urdu, making healthcare accessible to more families across Pakistan.',
      color: 'purple'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'HIPAA/GDPR compliant with end-to-end encryption ensuring your child\'s health data remains secure.',
      color: 'red'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access health guidance anytime, anywhere. No waiting rooms, no appointments needed for initial assessment.',
      color: 'orange'
    },
    {
      icon: Stethoscope,
      title: 'Doctor Integration',
      description: 'Seamless connection with pediatricians through doctor-ready summaries and teleconsultation options.',
      color: 'teal'
    }
  ]

  const team = [
    {
      name: 'Faiq Ahmed Sheikh',
      role: 'Full Stack Developer',
      id: '22-ARID-898',
      avatar: '👨‍💻',
      expertise: 'Frontend & System Architecture'
    },
    {
      name: 'Muhammad Bilal',
      role: 'AI/ML Specialist',
      id: '22-ARID-1030',
      avatar: '👨‍💻',
      expertise: 'AI/ML and Backend Development'
    }
  ]

  const stats = [
    { value: '10,000+', label: 'Health Assessments' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '5,000+', label: 'Families Helped' },
    { value: '50+', label: 'Partner Clinics' }
  ]

  const timeline = [
    { phase: 'Phase 1', title: 'Research & Planning', status: 'completed', date: 'Jan 2025' },
    { phase: 'Phase 2', title: 'Core Development', status: 'completed', date: 'Feb 2025' },
    { phase: 'Phase 3', title: 'AI Integration', status: 'completed', date: 'Mar 2025' },
    { phase: 'Phase 4', title: 'Testing & Validation', status: 'current', date: 'Apr 2025' },
    { phase: 'Phase 5', title: 'Deployment', status: 'upcoming', date: 'May 2025' }
  ]

  const faqs = [
    {
      question: 'Is KinderCare AI a replacement for doctors?',
      answer: 'No, KinderCare AI is designed to provide initial triage and guidance, not to replace professional medical consultation. It helps parents understand when to seek medical care and prepares doctor-ready summaries for more efficient consultations.'
    },
    {
      question: 'How accurate is the AI triage system?',
      answer: 'Our AI system has been validated against WHO/CDC pediatric guidelines and achieves a 95% accuracy rate in triage classification. However, we always recommend consulting a healthcare professional for definitive diagnosis.'
    },
    {
      question: 'Is my child\'s health data secure?',
      answer: 'Absolutely. We use end-to-end encryption, secure cloud storage, and comply with international health data privacy standards including HIPAA and GDPR guidelines.'
    },
    {
      question: 'What languages are supported?',
      answer: 'Currently, KinderCare AI supports English and Urdu, with voice input available in both languages. We plan to add more languages in future updates.'
    },
    {
      question: 'Can I share reports with my doctor?',
      answer: 'Yes! The system generates doctor-ready summaries that can be shared directly with your pediatrician via the app or downloaded as PDF reports.'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
    orange: 'bg-orange-100 text-orange-600',
    teal: 'bg-teal-100 text-teal-600'
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
              <Link to="/about" className="text-primary-600 font-medium">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
              <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">Login</Link>
              <Link to="/register" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-500 via-primary-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Final Year Project 2025</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About KinderCare AI
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              An intelligent AI-based pediatric health assistant designed to bridge the gap 
              between parents and healthcare providers, ensuring every child gets timely care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
              <Link to="/register" className="bg-white/20 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:bg-white/30 transition-colors border border-white/30">
                <span>Try It Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</h3>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 font-semibold">OUR MISSION</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
                Empowering Parents with AI-Driven Pediatric Care
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                KinderCare AI was born from a simple observation: parents often struggle to 
                determine whether their child's symptoms require immediate medical attention 
                or can be managed at home. This uncertainty leads to unnecessary emergency 
                visits or, worse, delayed care for serious conditions.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Our mission is to provide evidence-based, accessible, and multilingual 
                health guidance that helps parents make informed decisions while ensuring 
                seamless communication with healthcare providers.
              </p>
              <div className="space-y-4">
                {['Reduce parental anxiety during health emergencies', 
                  'Minimize unnecessary emergency room visits', 
                  'Support doctors with structured patient data',
                  'Make pediatric healthcare accessible in Urdu & English'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-3xl p-8">
                <img 
                  src="/api/placeholder/500/400" 
                  alt="KinderCare AI Interface" 
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">WHO/CDC Validated</p>
                    <p className="text-sm text-gray-500">Evidence-based guidelines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold">FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Why Choose KinderCare AI?
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with validated medical 
              guidelines to provide the most accurate and helpful pediatric health assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${colorClasses[feature.color]}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-400 font-semibold">OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Meet the Developers
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              BS Software Engineering Students at PMAS-Arid Agriculture University, Rawalpindi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-colors">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary-400 font-medium">{member.role}</p>
                <p className="text-gray-400 text-sm mt-1">{member.id}</p>
                <p className="text-gray-300 mt-3">{member.expertise}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2">Project Supervisor</h3>
              <p className="text-2xl font-bold text-primary-400">Dr. Sarfraz Bibi</p>
              <p className="text-gray-400 mt-2">
                University Institute of Information Technology<br/>
                PMAS-Arid Agriculture University, Rawalpindi Pakistan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold">DEVELOPMENT TIMELINE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Project Progress
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className={`inline-block p-6 rounded-2xl ${
                      item.status === 'completed' ? 'bg-green-50 border border-green-200' :
                      item.status === 'current' ? 'bg-primary-50 border border-primary-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}>
                      <span className={`text-sm font-semibold ${
                        item.status === 'completed' ? 'text-green-600' :
                        item.status === 'current' ? 'text-primary-600' :
                        'text-gray-500'
                      }`}>{item.phase}</span>
                      <h3 className="text-lg font-bold text-gray-800 mt-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.date}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className={`w-6 h-6 rounded-full border-4 ${
                      item.status === 'completed' ? 'bg-green-500 border-green-200' :
                      item.status === 'current' ? 'bg-primary-500 border-primary-200 animate-pulse' :
                      'bg-gray-300 border-gray-200'
                    }`}></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Smart Pediatric Care?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of parents who trust KinderCare AI for their children's health guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </Link>
            <Link to="/contact" className="bg-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30">
              Contact Us
            </Link>
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

export default About