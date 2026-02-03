import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Stethoscope,
  Users,
  Shield,
  ArrowRight,
  X,
} from "lucide-react";
import { registerUser } from "../services/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "parent",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setApiMessage({ type: "error", text: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phone: formData.phone,
      role: formData.userType,
    };

    try {
      const res = await registerUser(payload);

      if (res.success && res.data?.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        login({
          token: res.data.accessToken,
          user: res.data.user,
        });

        setApiMessage({
          type: "success",
          text: "Account created successfully! Redirecting...",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1800);
      }
    } catch (err) {
      const msg = err.message || "Registration failed. Please try again.";
      setApiMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One number", met: /[0-9]/.test(formData.password) },
    {
      text: "Passwords match",
      met:
        formData.password === formData.confirmPassword &&
        formData.password.length > 0,
    },
  ];

  // Role options without admin
  const roleOptions = [
    {
      id: "parent",
      label: "Parent",
      description: "Monitor your child's health",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "doctor",
      label: "Doctor",
      description: "Provide medical consultations",
      icon: Stethoscope,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient with animations */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex flex-1 items- justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 p-12 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-lg text-white text-center relative z-10">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/30"
          >
            <Baby className="w-14 h-14" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4"
          >
            Join KinderCare AI Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg leading-relaxed mb-10"
          >
            Create your account and get access to AI-powered pediatric health
            guidance, doctor consultations, and personalized health tracking for
            your children.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {[
              "AI-powered symptom analysis",
              "Evidence-based recommendations",
              "Connect with pediatricians",
              "Multilingual support (English & Urdu)",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-green-400/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                </div>
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg py-8"
        >
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/30"
              >
                <Baby className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  KinderCare
                </span>
                <span className="text-sm font-medium text-gray-500 block -mt-1">
                  AI Assistant
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 mb-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              Get started with your free account
            </p>
          </motion.div>

          {/* ── Modern Message Box ──────────────────────────────── */}
          <AnimatePresence>
            {apiMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`mb-6 p-4 rounded-2xl border backdrop-blur-sm flex items-start gap-3 ${
                  apiMessage.type === "success"
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                    : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    apiMessage.type === "success"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {apiMessage.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      apiMessage.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {apiMessage.type === "success" ? "Success!" : "Error"}
                  </p>
                  <p
                    className={`text-sm ${
                      apiMessage.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {apiMessage.text}
                  </p>
                </div>
                <button
                  onClick={() => setApiMessage(null)}
                  className={`p-1 rounded-lg hover:bg-white/50 transition-colors ${
                    apiMessage.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Modern Role Selection */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                I want to register as
              </label>
              <div className="grid grid-cols-2 gap-4">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  const isSelected = formData.userType === role.id;

                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, userType: role.id })
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-2xl text-left transition-all duration-300 ${
                        isSelected
                          ? "bg-white ring-2 ring-primary-500 shadow-lg shadow-primary-500/20"
                          : "bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-md"
                      }`}
                    >
                      {/* Selection indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-3 shadow-md`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3
                        className={`font-bold ${
                          isSelected ? "text-primary-600" : "text-gray-800"
                        }`}
                      >
                        {role.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {role.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-800 placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-800 placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-800 placeholder-gray-400"
                  placeholder="+92 300 1234567"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-800 placeholder-gray-400"
                  placeholder="Create a password"
                  required
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-800 placeholder-gray-400"
                  placeholder="Confirm your password"
                  required
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors p-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Password Requirements */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl"
            >
              {passwordRequirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <motion.div
                    animate={{
                      scale: req.met ? [1, 1.2, 1] : 1,
                      backgroundColor: req.met ? "#10b981" : "#d1d5db",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle
                      className={`w-3.5 h-3.5 ${
                        req.met ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </motion.div>
                  <span
                    className={`text-xs font-medium ${
                      req.met ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {req.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Terms */}
            <motion.label
              variants={itemVariants}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl cursor-pointer group"
            >
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="w-5 h-5 rounded-md border-2 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 transition-all cursor-pointer"
                  required
                />
              </div>
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
              </span>
            </motion.label>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.p
            variants={itemVariants}
            className="text-center mt-8 text-gray-600"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-bold hover:underline"
            >
              Sign In
            </Link>
          </motion.p>

          {/* Security Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400"
          >
            <Shield className="w-4 h-4" />
            <span>Secured with 256-bit encryption</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;