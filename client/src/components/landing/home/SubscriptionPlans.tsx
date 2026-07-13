"use client";

import { Check, Zap, Rocket, Star } from "lucide-react";

const PLANS = [
  {
    name: "Starter Access",
    price: "$20",
    description: "Ideal for beginners to start learning.",
    features: [
      "Access to 10 Courses",
      "Course Certificates",
      "100+ Subscriptions",
    ],
    icon: <img src="https://lms.rocket-soft.org/store/1/default_images/subscribe_packages/subscribe_icon_1.svg" className="w-12 h-12" alt="Starter" />,
    color: "primary",
  },
  {
    name: "Pro Plus",
    price: "$100",
    description: "For serious learners providing advanced features.",
    features: [
      "Unlimited course access",
      "Verified course certificates",
      "1000 Subscriptions",
      "Advanced Learning Tools",
    ],
    icon: <img src="https://lms.rocket-soft.org/store/1/default_images/subscribe_packages/subscribe_icon_2.svg" className="w-12 h-12" alt="Pro" />,
    color: "rose-500",
    featured: true,
  },
  {
    name: "Elite Mastery",
    price: "$40",
    description: "Exclusive for expert users.",
    features: [
      "Access to all courses",
      "Premium content and support",
      "4000 Subscriptions",
      "Personalized learning path",
    ],
    icon: <img src="https://lms.rocket-soft.org/store/1/default_images/subscribe_packages/subscribe_icon_3.svg" className="w-12 h-12" alt="Elite" />,
    color: "primary",
  },
];

export default function SubscriptionPlans() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side */}
          <div className="lg:w-1/3">
             <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6 uppercase">
                Subscription
             </div>
             <h2 className="text-4xl font-medium text-foreground mb-6 leading-tight">
                Subscription Plans For You
             </h2>
             <p className="text-lg text-foreground-muted mb-8 leading-relaxed">
                Choose the best subscription plans for you to learn more effectively. Unlock unlimited access to courses, assignments, course certificates, and professional content. Choose your plan today!
             </p>
             <button className="px-8 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all">
                <Check className="w-5 h-5" />
                Become a VIP Member
             </button>
             
             <div className="mt-12">
                 <div className="w-24 h-24 bg-primary/20 rounded-md rotate-12 flex items-center justify-center p-4">
                    <div className="w-full h-full bg-primary/40 rounded-md -rotate-12"></div>
                 </div>
             </div>
          </div>

          {/* Right Side - Cards */}
          <div className="lg:w-2/3 grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, index) => (
              <div key={index} className={`bg-card border-2 ${plan.featured ? "border-rose-500 shadow-2xl shadow-rose-500/10" : "border-border"} rounded-md p-8 relative flex flex-col h-full card-hover`}>
                {plan.featured && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 py-1 text-xs font-black rounded-full uppercase tracking-widest flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Featured
                   </div>
                )}
                
                <div className={`w-16 h-16 rounded-md ${plan.featured ? "bg-rose-500/10" : "bg-primary/10"} flex items-center justify-center mb-6`}>
                   {plan.icon}
                </div>
                
                <h3 className="text-xl font-medium text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-foreground-muted mb-6">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-4xl font-black text-foreground">{plan.price}</span>
                   <span className="text-sm text-foreground-muted font-medium">/ 60 Days</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                   {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                        <div className={`w-5 h-5 rounded-full ${plan.featured ? "bg-rose-500/20 text-rose-500" : "bg-primary/20 text-primary"} flex items-center justify-center flex-shrink-0`}>
                           <Check className="w-3 h-3" />
                        </div>
                        {feature}
                     </li>
                   ))}
                </ul>
                
                <button className={`w-full py-4 rounded-md font-medium transition-all ${plan.featured ? "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20" : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"}`}>
                   Purchase
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
