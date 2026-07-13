import { IcoInstructor, IcoStudents, IcoCourses, IcoOrganization } from "@/components/icons/LmsBrandIcons";

const statItems = [
  {
    icon: <IcoInstructor size={32} />,
    value: "257",
    label: "Skillful Instructors",
    iconBg: "bg-[#5aadff]",
    iconColor: "text-[#0d3b6e]",
  },
  {
    icon: <IcoStudents size={32} />,
    value: "508",
    label: "Happy Students",
    iconBg: "bg-[#22c55e]",
    iconColor: "text-[#14532d]",
  },
  {
    icon: <IcoCourses size={32} />,
    value: "29",
    label: "Professional Courses",
    iconBg: "bg-[#ef4444]",
    iconColor: "text-[#7f1d1d]",
  },
  {
    icon: <IcoOrganization size={32} />,
    value: "6",
    label: "Official Organizations",
    iconBg: "bg-[#f59e0b]",
    iconColor: "text-[#78350f]",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-background mt-10 px-4 sm:px-6 lg:px-8 -translate-y-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0e2145] dark:bg-[#2658b7] rounded-md p-6 sm:p-10 shadow-2xl flex flex-wrap justify-center sm:justify-between items-center gap-y-10 relative overflow-hidden">
          {/* Subtle Dotted Pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          ></div>
          
          <div className="relative z-10 w-full flex flex-wrap justify-center sm:justify-between items-center gap-y-10">
            {statItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 min-w-[200px]">
                {/* Icon circle — iconColor sets fill="currentColor" tint */}
                <div className={`w-16 h-16 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[20px] font-black text-white leading-tight">
                    {item.value}
                  </span>
                  <span className="text-[12px] font-medium text-white/70 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
