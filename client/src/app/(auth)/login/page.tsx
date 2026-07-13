"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import SiteTopBar from "@/components/layout/SiteTopBar";
import SiteNavbar from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const slides = [
  {
    title: "Instant Certificate Access",
    description: "Download certificates right after completion",
    image: "https://lms.rocket-soft.org/store/1/themes/general/authentication_slide1.png",
  },
  {
    title: "Affordable Quality Education",
    description: "High-value courses at accessible prices",
    image: "https://lms.rocket-soft.org/store/1/themes/general/authentication_slide2.png",
  },
  {
    title: "Advance Your Career",
    description: "Build your resume with proven expertise",
    image: "https://lms.rocket-soft.org/store/1/themes/general/authentication_slide3.png",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      <SiteTopBar />
      <SiteNavbar />

      <section className="flex-1 container max-w-7xl mx-auto mt-24 mb-24 px-4 flex items-center justify-center">
        <div className="w-full lg:max-w-[1000px] relative">
          {/* Decorative Background Glows */}
          <div className="absolute inset-0 bg-primary/5 rounded-[32px] blur-3xl -z-10" />

          <div className="bg-white dark:bg-[#1e1f26] rounded-[32px] p-4 shadow-2xl border border-border/50 z-10">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Side: Login Form */}
              <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-10 text-center lg:text-left">
                  <div className="text-[16px] font-bold text-primary mb-1">Welcome Back 👋</div>
                  <h1 className="text-[28px] font-black text-foreground">Sign in to SPM LMS</h1>
                  <p className="text-[14px] text-foreground-muted mt-2">
                    Enter your account details to access your learning portal.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-2xl text-danger text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-foreground-muted">Email Address</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground-muted pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@test.com or teacher@test.com"
                        className="w-full pl-11 pr-5 py-4 bg-slate-50 dark:bg-white/5 border border-border/60 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-light text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-medium text-foreground-muted">Password</label>
                      <Link href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground-muted pointer-events-none">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full pl-11 pr-5 py-4 bg-slate-50 dark:bg-white/5 border border-border/60 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-light text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-[#0170ff] dark:bg-[#3e93ff] text-white dark:text-[#1e1f26] font-bold rounded-2xl hover:bg-primary/95 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white dark:border-[#1e1f26] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-foreground-muted">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary font-medium hover:underline">
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Side: Features/Branding Showcase with Slideshow */}
              <div className="hidden lg:block w-1/2 p-4">
                <div
                  className="w-full h-full rounded-[28px] bg-[#0e2145] dark:bg-[#1a1b21] flex flex-col justify-between p-10 relative overflow-hidden min-h-[500px]"
                  style={{
                    backgroundImage: "url('https://lms.rocket-soft.org/store/1/themes/general/authentication_background.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-[#0e2145]/80 dark:bg-[#1a1b21]/90 backdrop-blur-[2px]" />
                  
                  {/* Top Quote */}
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-light mb-2 border border-white/10">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                      Elevate your technical skills
                    </div>
                  </div>

                  {/* Active Slide Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center py-6 flex-1">
                    <div className="w-full max-w-[220px] mb-6 animate-float flex justify-center">
                      <img 
                        src={slides[activeSlide].image} 
                        alt={slides[activeSlide].title} 
                        className="w-auto h-[160px] drop-shadow-2xl object-contain transition-all duration-500"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 transition-all duration-500">
                      {slides[activeSlide].title}
                    </h3>
                    <p className="text-white/70 text-xs max-w-[240px] leading-relaxed transition-all duration-500">
                      {slides[activeSlide].description}
                    </p>

                    {/* Pagination Dots */}
                    <div className="flex gap-2 mt-6 justify-center">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSlide(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === activeSlide ? "w-6 bg-white" : "w-1.5 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Agreement Text */}
                  <div className="relative z-10 pt-4 border-t border-white/15">
                    <div className="text-[11px] text-white/50 text-center leading-relaxed font-light">
                      By signing in, you agree to our Terms of Service, Privacy Policy and Data Protection standards.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
