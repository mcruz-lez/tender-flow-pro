
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Shield, Users, FileText, BarChart3, Clock, CheckCircle, ArrowRight, Star, MapPin, TrendingUp, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: FileText,
      title: "AI-Powered Tender Management",
      description: "Create, publish, and manage property service tenders with intelligent automation and compliance checking for US regulations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Contractor Network",
      description: "Connect with verified US contractors, handymen, and service providers with comprehensive background checks and licensing verification.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "OSHA-compliant workflows with SOC 2 security standards, ensuring all projects meet federal and state requirements.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Cost Analytics",
      description: "Real-time market pricing insights and ROI tracking for property maintenance and improvement projects across US markets.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Building2,
      title: "Property Portfolio Management",
      description: "Specialized for US commercial and residential properties with integrated maintenance scheduling and compliance tracking.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Clock,
      title: "Automated Workflows",
      description: "Streamlined approval chains with automated notifications, ensuring projects stay on schedule and within budget.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const stats = [
    { label: "US Property Organizations", value: "1,250+", icon: Building2, change: "+15%" },
    { label: "Projects Completed", value: "$85M+", icon: TrendingUp, change: "+32%" },
    { label: "Verified Contractors", value: "12K+", icon: Users, change: "+28%" },
    { label: "Average Cost Savings", value: "23%", icon: Award, change: "+5%" }
  ];

  const testimonials = [
    {
      quote: "TendProcure revolutionized our procurement process across 200+ properties. We've reduced costs by 25% while improving contractor quality and compliance.",
      author: "Michael Rodriguez",
      role: "VP of Operations",
      company: "American Property Solutions",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "The transparency and efficiency gains have been remarkable. Our compliance scores improved to 98% within the first quarter of implementation.",
      author: "Sarah Chen",
      role: "Director of Facilities", 
      company: "Metro Real Estate Group",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "As a contractor, TendProcure has opened doors to premium projects. The platform's verification system builds trust with property managers.",
      author: "David Thompson",
      role: "Founder & CEO",
      company: "Elite Construction Services",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/5 to-transparent rotate-12 blur-3xl" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  TendProcure
                </h1>
                <p className="text-sm text-blue-300 font-medium">US Property Procurement Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 border border-blue-400/20 backdrop-blur-sm">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Effects */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div 
          className="container mx-auto text-center max-w-7xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          {/* Floating 3D Cards */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl border border-white/10 rotate-12 animate-pulse" />
          <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-xl border border-white/10 -rotate-12 animate-pulse delay-500" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-white/10 rotate-45 animate-pulse delay-1000" />

          <Badge className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border-blue-400/20 backdrop-blur-xl px-6 py-2 text-lg">
            <Zap className="w-4 h-4 mr-2" />
            Next-Generation US Property Procurement
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Transform Your
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Property Procurement
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The most advanced tender management platform for US property companies. 
            Connect with verified contractors, streamline compliance, and drive unprecedented cost savings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/register">
              <Button 
                size="lg" 
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl shadow-blue-500/25 border border-blue-400/20 backdrop-blur-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-12 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Watch Demo
            </Button>
          </div>

          {/* 3D Mockup */}
          <div className="relative perspective-1000">
            <div 
              className="relative max-w-6xl mx-auto transform-gpu"
              style={{ 
                transform: `rotateX(${scrollY * 0.02}deg) rotateY(${scrollY * 0.01}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    <div className="h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                    <div className="h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-xl" />
                      <div className="h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
              {/* 3D Shadow */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl transform translate-z-[-50px] scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 text-center hover:scale-105 transition-all duration-300 hover:bg-white/15"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/10">
                  <stat.icon className="w-10 h-10 text-blue-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium mb-2">{stat.label}</div>
                <div className="text-green-400 text-sm flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-200 border-green-400/20 backdrop-blur-xl px-6 py-2 text-lg">
              Platform Features
            </Badge>
            <h2 className="text-5xl font-bold text-white mb-6">
              Built for US Property Excellence
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From federal compliance to state regulations, TendProcure ensures every project 
              meets the highest standards while maximizing efficiency and cost savings.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})` }} />
                <CardHeader className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Real Images */}
      <section className="relative z-10 py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 border-yellow-400/20 backdrop-blur-xl px-6 py-2 text-lg">
              <Star className="w-4 h-4 mr-2" />
              Customer Success Stories
            </Badge>
            <h2 className="text-5xl font-bold text-white mb-6">
              Trusted Across America
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              See how property management leaders are transforming their operations with TendProcure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-200 text-lg mb-8 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-2xl object-cover mr-4 border-2 border-white/20"
                    />
                    <div>
                      <div className="text-white font-semibold text-lg">{testimonial.author}</div>
                      <div className="text-blue-300 text-sm">{testimonial.role}</div>
                      <div className="text-gray-400 text-sm">{testimonial.company}</div>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold text-white mb-8">
                Ready to Revolutionize Your Property Operations?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of US property management companies using TendProcure to 
                streamline procurement, ensure compliance, and maximize ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl shadow-blue-500/25 border border-blue-400/20 backdrop-blur-xl transition-all duration-300 hover:scale-105"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-12 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  Schedule Demo
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-8">
                No credit card required • 30-day free trial • OSHA compliant • SOC 2 certified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/10 py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  TendProcure
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                The leading tender management platform for US property services and procurement excellence.
              </p>
              <div className="text-sm text-gray-500">
                🇺🇸 Proudly serving US property markets
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-white text-lg">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-white text-lg">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-white text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TendProcure. All rights reserved. | SOC 2 Certified | OSHA Compliant</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
