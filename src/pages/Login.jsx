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
  LogIn,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  Stethoscope,
  Users,
  Shield,
  Heart,
  Activity,
  Clock,
} from "lucide-react";
import { loginUser } from "../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "parent",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiMessage(null);

    const payload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      const res = await loginUser(payload);

      if (res.success && res.data?.accessToken) {
        localStorage.setItem("token", res.data.accessToken);

        login({
          token: res.data.accessToken,
          ...res.data.user,
          userType: res.data.user.role,
        });

        setApiMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          const role = res.data.user.role;
          if (role === "parent") {
            navigate("/parent-dashboard");
          } else if (role === "doctor") {
            navigate("/doctor-dashboard");
          } else if (role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1200);
      }
    } catch (err) {
      const msg = err.message || "Invalid email or password";
      setApiMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  // Role options without admin
  const roleOptions = [
    {
      id: "parent",
      label: "Parent",
      description: "Access your dashboard",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "doctor",
      label: "Doctor",
      description: "Manage consultations",
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

  const statsData = [
    { value: "10K+", label: "Happy Parents", icon: Heart },
    { value: "98%", label: "Accuracy", icon: Activity },
    { value: "24/7", label: "Available", icon: Clock },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items- justify-center p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md py-8"
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
              Welcome Back!
            </h1>
            <p className="text-gray-500 mb-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              Sign in to continue to your account
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
            {/* <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Login as
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
            </motion.div> */}

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
                  placeholder="Enter your password"
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

            {/* Remember & Forgot */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData({ ...formData, rememberMe: e.target.checked })
                    }
                    className="w-5 h-5 rounded-md border-2 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 transition-all cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-all"
              >
                Forgot Password?
              </Link>
            </motion.div>

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
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-b from-gray-50 to-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-2 py-3.5 px-4 bg-white border-2 border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all group"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                Google
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-2 py-3.5 px-4 bg-white border-2 border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all group"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                Facebook
              </span>
            </motion.button>
          </motion.div>

          {/* Register Link */}
          <motion.p
            variants={itemVariants}
            className="text-center mt-8 text-gray-600"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700 font-bold hover:underline"
            >
              Sign Up
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

      {/* Right Side - Gradient with animations */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
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

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
              }}
            />
          ))}
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
            AI-Powered Pediatric Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg leading-relaxed mb-10"
          >
            Get instant, accurate health guidance for your children based on
            WHO/CDC guidelines. Our AI assistant is available 24/7 to help you
            make informed decisions.
          </motion.p>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6"
          >
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 min-w-[100px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">Verified Doctors</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;