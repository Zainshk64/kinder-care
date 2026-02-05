// pages/AITriage.jsx
import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  Mic, MicOff, Camera, Send, Loader2, AlertTriangle,
  CheckCircle, Clock, Upload, X, Volume2, Baby,
  Thermometer, Heart, Activity, FileText, Download,
  ChevronRight, RefreshCw, MessageCircle, User,
  Stethoscope, Shield, Phone, Calendar
} from 'lucide-react'

const AITriage = () => {
  const [inputMethod, setInputMethod] = useState('text') // text, voice, photo
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [conversation, setConversation] = useState([])
  const [triageResult, setTriageResult] = useState(null)
  const [childInfo, setChildInfo] = useState({
    name: '',
    age: '',
    gender: '',
    temperature: '',
    weight: ''
  })
  const [step, setStep] = useState('info') // info, chat, result
  const [language, setLanguage] = useState('en') // en, ur

  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const handleStartChat = () => {
    if (childInfo.name && childInfo.age) {
      setStep('chat')
      setConversation([
        {
          type: 'bot',
          message: language === 'en' 
            ? `Hello! I'm KinderCare AI. I'll help assess ${childInfo.name}'s symptoms. Please describe what symptoms you've noticed.`
            : `السلام علیکم! میں KinderCare AI ہوں۔ میں ${childInfo.name} کی علامات کا جائزہ لینے میں مدد کروں گا۔ براہ کرم بتائیں کہ آپ نے کیا علامات دیکھی ہیں۔`,
          timestamp: new Date()
        }
      ])
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim() && !uploadedImage) return

    const userMessage = {
      type: 'user',
      message: message || 'Uploaded an image for analysis',
      image: uploadedImage,
      timestamp: new Date()
    }

    setConversation(prev => [...prev, userMessage])
    setMessage('')
    setUploadedImage(null)
    setIsProcessing(true)

    // Simulate AI response
    setTimeout(() => {
      const followUpQuestions = [
        {
          type: 'bot',
          message: language === 'en'
            ? 'How long has your child been experiencing these symptoms?'
            : 'آپ کا بچہ کب سے یہ علامات محسوس کر رہا ہے؟',
          timestamp: new Date()
        },
        {
          type: 'bot',
          message: language === 'en'
            ? 'Has your child taken any medication? Is there any fever?'
            : 'کیا بچے نے کوئی دوائی لی ہے؟ کیا بخار ہے؟',
          timestamp: new Date()
        },
        {
          type: 'bot',
          message: language === 'en'
            ? 'Based on my analysis, I have enough information to provide a recommendation. Let me generate the triage result...'
            : 'میرے تجزیے کی بنیاد پر، میرے پاس سفارش فراہم کرنے کے لیے کافی معلومات ہیں۔',
          timestamp: new Date()
        }
      ]

      // Simulate progressive responses
      const randomIndex = Math.floor(Math.random() * 2)
      setConversation(prev => [...prev, followUpQuestions[randomIndex]])
      setIsProcessing(false)

      // After a few exchanges, show result
      if (conversation.length >= 4) {
        setTimeout(() => {
          generateTriageResult()
        }, 1000)
      }
    }, 2000)
  }

  const generateTriageResult = () => {
    const results = ['Home Care', 'GP Visit', 'Emergency']
    const randomResult = results[Math.floor(Math.random() * 2)] // Mostly non-emergency for demo
    
    setTriageResult({
      classification: randomResult,
      confidence: 87 + Math.floor(Math.random() * 10),
      symptoms: ['Mild fever', 'Runny nose', 'Slight cough'],
      recommendations: randomResult === 'Home Care' 
        ? [
            'Ensure adequate rest and sleep',
            'Keep the child hydrated with water and clear fluids',
            'Monitor temperature every 4 hours',
            'Use saline drops for nasal congestion',
            'Contact doctor if symptoms worsen'
          ]
        : randomResult === 'GP Visit'
        ? [
            'Schedule an appointment within 24 hours',
            'Continue monitoring symptoms',
            'Document any changes for the doctor',
            'Keep the child comfortable',
            'Prepare a list of all symptoms and their duration'
          ]
        : [
            'Seek immediate medical attention',
            'Call emergency services if needed',
            'Do not give any medication without professional advice',
            'Keep the child calm and comfortable'
          ],
      warningSign: randomResult === 'Emergency' 
        ? ['High fever above 103°F', 'Difficulty breathing', 'Persistent vomiting']
        : [],
      generatedAt: new Date()
    })
    setStep('result')
  }

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setMessage(language === 'en' 
          ? "My child has been having a fever since yesterday and seems tired."
          : "میرے بچے کو کل سے بخار ہے اور تھکا ہوا لگ رہا ہے۔"
        )
        setIsRecording(false)
      }, 3000)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetTriage = () => {
    setStep('info')
    setConversation([])
    setTriageResult(null)
    setChildInfo({ name: '', age: '', gender: '', temperature: '', weight: '' })
    setMessage('')
  }

  const getTriageColor = (classification) => {
    switch(classification) {
      case 'Home Care': return 'green'
      case 'GP Visit': return 'orange'
      case 'Emergency': return 'red'
      default: return 'blue'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <Sidebar userType="parent" />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">AI Symptom Triage</h1>
              <p className="text-gray-500 mt-1">Get instant health guidance based on WHO/CDC pediatric guidelines</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex items-center bg-white rounded-xl p-1 border border-gray-200">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    language === 'en' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('ur')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    language === 'ur' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  اردو
                </button>
              </div>
              {step !== 'info' && (
                <button 
                  onClick={resetTriage}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>New Assessment</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {['Child Info', 'Symptom Chat', 'Triage Result'].map((label, index) => {
              const stepMap = ['info', 'chat', 'result']
              const isActive = stepMap.indexOf(step) >= index
              return (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    isActive ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-400'
                  }`}>{label}</span>
                  {index < 2 && (
                    <ChevronRight className={`w-5 h-5 mx-4 ${
                      isActive ? 'text-primary-400' : 'text-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Child Information */}
        {step === 'info' && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <Baby className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {language === 'en' ? "Child's Information" : "بچے کی معلومات"}
                  </h2>
                  <p className="text-gray-500">
                    {language === 'en' 
                      ? "Please provide basic information about your child"
                      : "براہ کرم اپنے بچے کے بارے میں بنیادی معلومات فراہم کریں"
                    }
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? "Child's Name" : "بچے کا نام"}
                  </label>
                  <input
                    type="text"
                    value={childInfo.name}
                    onChange={(e) => setChildInfo({...childInfo, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={language === 'en' ? "Enter name" : "نام درج کریں"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? "Age" : "عمر"}
                  </label>
                  <select
                    value={childInfo.age}
                    onChange={(e) => setChildInfo({...childInfo, age: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">{language === 'en' ? "Select age" : "عمر منتخب کریں"}</option>
                    <option value="0-6 months">0-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2-5 years">2-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? "Gender" : "جنس"}
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setChildInfo({...childInfo, gender: 'male'})}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                        childInfo.gender === 'male' 
                          ? 'border-primary-500 bg-primary-50 text-primary-600' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {language === 'en' ? "Boy" : "لڑکا"}
                    </button>
                    <button
                      onClick={() => setChildInfo({...childInfo, gender: 'female'})}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                        childInfo.gender === 'female' 
                          ? 'border-primary-500 bg-primary-50 text-primary-600' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {language === 'en' ? "Girl" : "لڑکی"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? "Temperature (if known)" : "درجہ حرارت (اگر معلوم ہو)"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={childInfo.temperature}
                      onChange={(e) => setChildInfo({...childInfo, temperature: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="98.6°F"
                    />
                    <Thermometer className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartChat}
                disabled={!childInfo.name || !childInfo.age}
                className={`w-full mt-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                  childInfo.name && childInfo.age
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{language === 'en' ? "Start Symptom Assessment" : "علامات کا جائزہ شروع کریں"}</span>
              </button>
            </div>

            {/* Guidelines */}
            <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800">
                    {language === 'en' ? "Medical Disclaimer" : "طبی اعلان"}
                  </h3>
                  <p className="text-blue-600 text-sm mt-1">
                    {language === 'en'
                      ? "KinderCare AI provides guidance based on WHO/CDC guidelines but is not a replacement for professional medical advice. Always consult a doctor for serious concerns."
                      : "KinderCare AI ڈبلیو ایچ او/سی ڈی سی کے رہنما اصولوں پر مبنی رہنمائی فراہم کرتا ہے لیکن یہ پیشہ ورانہ طبی مشورے کا متبادل نہیں ہے۔"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Chat Interface */}
        {step === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <div className="card h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">KinderCare AI</h3>
                    <p className="text-sm text-green-500 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {language === 'en' ? "Online - Analyzing symptoms" : "آن لائن - علامات کا تجزیہ"}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-1">
                  <span className="text-sm text-gray-600">
                    {language === 'en' ? `Patient: ${childInfo.name}` : `مریض: ${childInfo.name}`}
                  </span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {conversation.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        msg.type === 'user' 
                          ? 'bg-primary-500 text-white rounded-br-md' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}>
                        {msg.image && (
                          <img src={msg.image} alt="Uploaded" className="rounded-lg mb-2 max-w-[200px]" />
                        )}
                        <p>{msg.message}</p>
                      </div>
                      <p className={`text-xs text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${
                      msg.type === 'user' ? 'order-2 bg-gray-200' : 'order-1 bg-primary-100'
                    }`}>
                      {msg.type === 'user' 
                        ? <User className="w-4 h-4 text-gray-600" />
                        : <Stethoscope className="w-4 h-4 text-primary-600" />
                      }
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 rounded-bl-md">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                        <span className="text-gray-500">
                          {language === 'en' ? "Analyzing..." : "تجزیہ ہو رہا ہے..."}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Image Preview */}
              {uploadedImage && (
                <div className="relative inline-block mb-2">
                  <img src={uploadedImage} alt="Upload preview" className="h-20 rounded-lg" />
                  <button 
                    onClick={() => setUploadedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Input Methods */}
              <div className="pt-4 border-t border-gray-100">
                {/* Method Toggle */}
                <div className="flex items-center space-x-2 mb-4">
                  <button
                    onClick={() => setInputMethod('text')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      inputMethod === 'text' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'en' ? "Text" : "متن"}</span>
                  </button>
                  <button
                    onClick={() => setInputMethod('voice')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      inputMethod === 'voice' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>{language === 'en' ? "Voice" : "آواز"}</span>
                  </button>
                  <button
                    onClick={() => setInputMethod('photo')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      inputMethod === 'photo' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>{language === 'en' ? "Photo" : "تصویر"}</span>
                  </button>
                </div>

                {/* Input Area */}
                <div className="flex items-center space-x-3">
                  {inputMethod === 'photo' && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {inputMethod === 'voice' ? (
                    <button
                      onClick={handleVoiceInput}
                      className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      <span>
                        {isRecording 
                          ? (language === 'en' ? 'Recording... Tap to stop' : 'ریکارڈنگ... رکنے کے لیے ٹیپ کریں')
                          : (language === 'en' ? 'Tap to speak' : 'بولنے کے لیے ٹیپ کریں')
                        }
                      </span>
                    </button>
                  ) : (
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={language === 'en' ? "Describe your child's symptoms..." : "اپنے بچے کی علامات بیان کریں..."}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  )}
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={(!message.trim() && !uploadedImage) || isProcessing}
                    className={`p-3 rounded-xl transition-all ${
                      (message.trim() || uploadedImage) && !isProcessing
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>

                {/* Quick Generate Result (for demo) */}
                <button
                  onClick={generateTriageResult}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-blue-600 transition-all"
                >
                  {language === 'en' ? "Generate Triage Result" : "ٹرائیج نتیجہ حاصل کریں"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Triage Result */}
        {step === 'result' && triageResult && (
          <div className="max-w-4xl mx-auto">
            {/* Result Card */}
            <div className={`card border-2 ${
              triageResult.classification === 'Home Care' ? 'border-green-200 bg-gradient-to-br from-green-50 to-white' :
              triageResult.classification === 'GP Visit' ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-white' :
              'border-red-200 bg-gradient-to-br from-red-50 to-white'
            }`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    triageResult.classification === 'Home Care' ? 'bg-green-100' :
                    triageResult.classification === 'GP Visit' ? 'bg-orange-100' : 'bg-red-100'
                  }`}>
                    {triageResult.classification === 'Home Care' ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : triageResult.classification === 'GP Visit' ? (
                      <Clock className="w-8 h-8 text-orange-600" />
                    ) : (
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      triageResult.classification === 'Home Care' ? 'text-green-700' :
                      triageResult.classification === 'GP Visit' ? 'text-orange-700' : 'text-red-700'
                    }`}>
                      {triageResult.classification}
                    </h2>
                    <p className="text-gray-500">
                      {language === 'en' 
                        ? `AI Confidence: ${triageResult.confidence}%`
                        : `اے آئی کا اعتماد: ${triageResult.confidence}%`
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {language === 'en' ? "Patient:" : "مریض:"} {childInfo.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {triageResult.generatedAt.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Identified Symptoms */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {language === 'en' ? "Identified Symptoms" : "شناخت شدہ علامات"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {triageResult.symptoms.map((symptom, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {language === 'en' ? "Recommendations" : "سفارشات"}
                </h3>
                <div className="space-y-3">
                  {triageResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 ${
                        triageResult.classification === 'Home Care' ? 'text-green-500' :
                        triageResult.classification === 'GP Visit' ? 'text-orange-500' : 'text-red-500'
                      }`} />
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Signs */}
              {triageResult.warningSign.length > 0 && (
                <div className="p-4 bg-red-50 rounded-xl border border-red-200 mb-6">
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    {language === 'en' ? "Warning Signs Detected" : "انتباہی علامات"}
                  </h3>
                  <ul className="space-y-1">
                    {triageResult.warningSign.map((sign, index) => (
                      <li key={index} className="text-red-600 text-sm">• {sign}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                  <Calendar className="w-5 h-5" />
                  <span>{language === 'en' ? "Book Appointment" : "اپائنٹمنٹ بک کریں"}</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>{language === 'en' ? "Download Report" : "رپورٹ ڈاؤن لوڈ کریں"}</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <FileText className="w-5 h-5" />
                  <span>{language === 'en' ? "Share with Doctor" : "ڈاکٹر کے ساتھ شیئر کریں"}</span>
                </button>
              </div>

              {/* Emergency Contact */}
              {triageResult.classification === 'Emergency' && (
                <div className="mt-6 p-4 bg-red-500 text-white rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-6 h-6" />
                      <div>
                        <h4 className="font-bold">
                          {language === 'en' ? "Emergency? Call Now!" : "ایمرجنسی؟ ابھی کال کریں!"}
                        </h4>
                        <p className="text-red-100">
                          {language === 'en' ? "Emergency Helpline: 115" : "ایمرجنسی ہیلپ لائن: 115"}
                        </p>
                      </div>
                    </div>
                    <button className="bg-white text-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                      {language === 'en' ? "Call 115" : "115 کال کریں"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Doctor Ready Summary */}
            <div className="card mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary-500" />
                  {language === 'en' ? "Doctor-Ready Summary" : "ڈاکٹر کے لیے تیار خلاصہ"}
                </h3>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  {language === 'en' ? "Copy to Clipboard" : "کلپ بورڈ پر کاپی کریں"}
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 font-mono">
                <p><strong>Patient:</strong> {childInfo.name} ({childInfo.age}, {childInfo.gender})</p>
                <p><strong>Temperature:</strong> {childInfo.temperature || 'Not recorded'}</p>
                <p><strong>Chief Complaint:</strong> {triageResult.symptoms.join(', ')}</p>
                <p><strong>AI Triage Classification:</strong> {triageResult.classification}</p>
                <p><strong>Confidence Score:</strong> {triageResult.confidence}%</p>
                <p><strong>Assessment Date:</strong> {triageResult.generatedAt.toLocaleString()}</p>
                <p className="mt-2"><strong>Recommendations:</strong></p>
                <ul className="ml-4">
                  {triageResult.recommendations.map((rec, i) => (
                    <li key={i}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AITriage