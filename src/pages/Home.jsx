import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Baby, Shield, Clock, Globe, Stethoscope, Heart, 
  Brain, MessageSquare, Video, FileText, ArrowRight,
  CheckCircle, Star, Users, Activity
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Triage',
      description: 'Advanced NLP and LLM technology provides accurate symptom analysis based on WHO/CDC guidelines.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Safe & Reliable',
      description: 'Evidence-based recommendations validated by pediatric health protocols and medical experts.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Get instant health guidance anytime, anywhere for your child\'s symptoms.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Full support for English and Urdu languages for accessible healthcare.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: 'Multi-Input Support',
      description: 'Describe symptoms via text, voice, or upload images for comprehensive analysis.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Video,
      title: 'Teleconsultation',
      description: 'Connect with verified pediatricians for video consultations when needed.',
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

  const stats = [
    { value: '10K+', label: 'Happy Parents', icon: Users },
    { value: '98%', label: 'Accuracy Rate', icon: Activity },
    { value: '24/7', label: 'Availability', icon: Clock },
    { value: '50+', label: 'Expert Doctors', icon: Stethoscope },
  ]

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Mother of 2',
      content: 'KinderCare AI helped me understand my daughter\'s symptoms at 2 AM. The guidance was accurate and reassuring.',
      rating: 5
    },
    {
      name: 'Dr. Hassan Ali',
      role: 'Pediatrician',
      content: 'An excellent tool that helps parents make informed decisions. The doctor summaries save valuable consultation time.',
      rating: 5
    },
    {
      name: 'Ayesha Khan',
      role: 'Working Mother',
      content: 'The Urdu language support makes it accessible for my parents to use it for my kids. Highly recommended!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200 rounded-full filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                <span>AI-Powered Pediatric Healthcare</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Child's Health,
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Our Priority</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                KinderCare AI provides intelligent, evidence-based pediatric health guidance. 
                Get instant triage recommendations and connect with expert pediatricians.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary flex items-center justify-center space-x-2">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-outline flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Trusted by 10,000+ parents</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 animate-float">
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Baby className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">KinderCare AI</h3>
                      <p className="text-white/80 text-sm">Pediatric Assistant</p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm">How can I help with your child's health today?</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Symptom Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Triage Classification</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Doctor Consultation</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  <span className="font-semibold text-gray-800">98% Accuracy</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-green-500" />
                  <span className="font-semibold text-gray-800">HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-500 mt-1">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Pediatric 
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Health Solution</span>
            </h2>
            <p className="text-xl text-gray-600">
              Advanced AI technology combined with medical expertise to provide the best care for your children.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card group hover:shadow-2xl">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How 
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> KinderCare AI </span>
              Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 4-step process to get accurate health guidance for your child.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Input Symptoms', desc: 'Describe symptoms via text, voice, or photo', icon: MessageSquare },
              { step: '02', title: 'AI Analysis', desc: 'Our AI analyzes using WHO/CDC guidelines', icon: Brain },
              { step: '03', title: 'Get Triage Result', desc: 'Receive classification: Home Care, GP Visit, or Emergency', icon: FileText },
              { step: '04', title: 'Follow Guidance', desc: 'Get recommendations or connect with a doctor', icon: Stethoscope },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white mb-6 mx-auto">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-300 to-accent-300 hidden md:block last:hidden" style={{ display: index === 3 ? 'none' : '' }}></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Parents & Doctors</span>
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about KinderCare AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Give Your Child the Best Care?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of parents who trust KinderCare AI for their children's health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Start Free Trial
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home