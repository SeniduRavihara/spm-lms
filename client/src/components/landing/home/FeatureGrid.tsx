import { IcoQuizzes, IcoCertificate, IcoAssignment, IcoSupportBrand, IcoLearnMore } from "@/components/icons/LmsBrandIcons";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const featureCards = [
  {
    title: "Smart Quizzes Tool",
    description: "Test knowledge instantly with interactive quizzes designed to boost understanding and track progress effectively.",
    icon: <IcoQuizzes size={32} />,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Verified Course Certificates",
    description: "Earn official certificates upon completion to showcase skills and add credibility to your portfolio.",
    icon: <IcoCertificate size={32} />,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    title: "Practical Course Assignments",
    description: "Apply what you learn with real assignments that reinforce skills and deepen your practical knowledge.",
    icon: <IcoAssignment size={32} />,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    title: "Dedicated Student Support",
    description: "Get help anytime with responsive support, ensuring a smooth and guided learning experience for everyone.",
    icon: <IcoSupportBrand size={32} />,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
];

export default function FeatureGrid() {
  const { user } = useAuth();
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
          {/* Left Side: Content */}
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 bg-secondary rounded-md text-primary text-[11px] font-black uppercase tracking-widest mb-6">
              Features
            </div>
            <h2 className="text-[34px] md:text-[42px] font-black text-foreground mb-6 leading-tight tracking-[-0.03em]">
              Master New Skills Using Advanced Learning Features
            </h2>
            <p className="text-[13.5px] text-foreground-muted mb-8 leading-[1.8] max-w-xl">
              Access modern tools, interactive content, and expert resources to master new skills and stay competitive.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Flexible Learning Schedule",
                "Affordable Course Prices",
                "Expert Instructor Access",
                "Self-Paced Progression"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-[14px] font-medium text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" width="16" height="16" className="text-success shrink-0">
                    <path d="M3 7.48222L6.17305 11L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={user ? "/courses" : "/login"}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-all shadow-lg shadow-primary/25 flex items-center gap-2.5 text-sm w-fit"
            >
              <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center">
                 <IcoLearnMore size={20} className="text-white" />
              </div>
              Learn More
            </Link>
          </div>

          {/* Right Side: Feature Cards Grid */}
          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
            {featureCards.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 bg-card border border-border/50 rounded-md transition-all hover:-translate-y-2 hover:shadow-2xl group"
              >
                <div className={`w-16 h-16 rounded-md ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-[18px] font-black text-foreground mb-4 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-[12.5px] text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
