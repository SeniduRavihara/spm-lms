"use client";

import { Star, ArrowRight, Calendar, User, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

const INSTRUCTORS = [
  { 
    name: "Mawantha Dilshan", 
    title: "Founder | Web Development Expert | AI Automation & Strategic Expert", 
    avatar: "/instructors/MawanthaDilshan.webp",
  },
  { 
    name: "Dilanka Sanjaya", 
    title: "Award Winning Entrepreneur | Strategic Expert | Digital Marketing Expert", 
    avatar: "/instructors/DilankaSanjaya.webp",
  },
  { 
    name: "Uditha Harshana", 
    title: "Web Developer @ SPM LMS | Lecturer | Freelancer", 
    avatar: "/instructors/UdithaHarshana.webp",
  },
];

const ORGANIZATIONS = [
  { name: "Light Moon", logo: "https://i.pravatar.cc/100?u=org1", courses: 5, instructors: 2 },
  { name: "Tech Development", logo: "https://i.pravatar.cc/100?u=org2", courses: 3, instructors: 1 },
  { name: "King Pictures", logo: "https://i.pravatar.cc/100?u=org3", courses: 14, instructors: 4 },
  { name: "Carousel Clothing", logo: "https://i.pravatar.cc/100?u=org4", courses: 9, instructors: 1 },
  { name: "Dasso", logo: "https://i.pravatar.cc/100?u=org5", courses: 1, instructors: 1 },
];

const MENTORS = [
  { name: "Jacee Wiley", hours: "4/5", meetings: 0, time: "11 Apr 2024, 08:30AM - 09:30AM", price: "$100" },
  { name: "John Does", hours: "1/5", meetings: 0, time: "11 Apr 2024, 12:30PM - 01:30AM", price: "$150" },
  { name: "Kate Williams", hours: "3/5", meetings: 0, time: "11 Apr 2024, 04:30PM - 05:30PM", price: "$200" },
  { name: "Linda Anderson", hours: "2/5", meetings: 0, time: "11 Apr 2024, 01:30PM - 02:30PM", price: "$50" },
  { name: "Robert Rumsfeld", hours: "2/5", meetings: 0, time: "11 Apr 2024, 10:30AM - 11:30AM", price: "$30" },
  { name: "Ricardo Daw", hours: "1/5", meetings: 0, time: "11 Apr 2024, 05:30PM - 06:30PM", price: "$40" },
];

export function ExpertInstructors() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center mb-16">
           <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-4 uppercase tracking-wider">
              Lecturers
           </div>
           <h2 className="text-[34px] md:text-[42px] font-black text-foreground mb-4 tracking-[-0.03em]">Our Expert Lecturers</h2>
           <p className="text-[13.5px] text-foreground-muted max-w-2xl mx-auto leading-relaxed">Learn directly from industry experts with years of proven real-world experience.</p>
         </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {INSTRUCTORS.map((ins, index) => (
            <div key={index} className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-[24px] p-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
               <div className="relative aspect-square rounded-[20px] overflow-hidden mb-6">
                  <img src={ins.avatar} alt={ins.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               </div>

               <div className="px-5 pb-6 text-center">
                  <h3 className="text-xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">{ins.name}</h3>
                  <p className="text-[13px] text-foreground-muted font-medium mb-6">{ins.title}</p>

                  <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/50">
                     <Link href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                       <Facebook className="w-4 h-4" />
                     </Link>
                     <Link href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                       <Linkedin className="w-4 h-4" />
                     </Link>
                     <Link href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                       <Instagram className="w-4 h-4" />
                     </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center">
           <button className="px-10 py-4 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-all inline-flex items-center gap-3 text-[15px]">
              View All Instructors
              <ArrowRight className="w-4 h-4" />
           </button>
        </div> */}
      </div>
    </section>
  );
}

export function OfficialOrganizations() {
  return (
    <section className="py-24 bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-4 uppercase tracking-wider">
             Organizations
          </div>
          <h2 className="text-[34px] md:text-[42px] font-black text-foreground tracking-[-0.03em]">Official Organizations</h2>
          <p className="text-[13.5px] text-foreground-muted mt-4 max-w-2xl mx-auto leading-relaxed">Partner with trusted educational organizations, delivering high-quality courses and programs for formal, career-focused learning pathways.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {ORGANIZATIONS.map((org, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-md p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl">
               <div className="w-14 h-14 rounded-full bg-muted mx-auto mb-4 overflow-hidden shadow-inner border-2 border-white">
                  <img src={org.logo} alt="" className="w-full h-full object-cover" />
               </div>
               <h3 className="text-[14px] font-medium text-foreground mb-4 line-clamp-1">{org.name}</h3>
               <div className="flex justify-between items-center text-[11px] text-foreground-muted mb-6 px-1">
                  <div className="flex flex-col items-center">
                     <span className="font-black text-primary text-[13px]">{org.courses}</span>
                     <span>Courses</span>
                  </div>
                  <div className="w-[px] h-5 bg-border/50"></div>
                  <div className="flex flex-col items-center">
                     <span className="font-black text-primary text-[13px]">{org.instructors}</span>
                     <span>Instructors</span>
                  </div>
               </div>
               <Link href="#" className="text-[11.5px] font-medium text-primary hover:underline">View Profile</Link>
            </div>
          ))}
        </div>

        <div className="text-center">
           <button className="px-10 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all inline-flex items-center gap-2">
              Explore Organizations
           </button>
        </div>
      </div>
    </section>
  );
}

export function MentorsTable() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-4 uppercase tracking-wider">
             Meeting Booking
          </div>
          <h2 className="text-[34px] md:text-[42px] font-black text-foreground mb-4 tracking-[-0.03em]">Book Sessions With Trusted Mentors</h2>
          <p className="text-[13.5px] text-foreground-muted leading-relaxed">Unlock tailored learning by booking sessions with verified mentors for personal guidance, support, and faster growth.</p>
        </div>

        <div className="bg-card border border-border rounded-md overflow-hidden shadow-2xl">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-primary/5 text-[11px] font-black text-foreground uppercase tracking-widest">
                       <th className="px-8 py-6">Instructor Name</th>
                       <th className="px-6 py-6 text-center">Weekly Hours</th>
                       <th className="px-6 py-6 text-center">Total Meetings</th>
                       <th className="px-6 py-6">Meeting Time</th>
                       <th className="px-6 py-6">Price</th>
                       <th className="px-8 py-6 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                    {MENTORS.map((mentor, index) => (
                       <tr key={index} className="hover:bg-primary/5 transition-colors group">
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                                   <img src={`https://i.pravatar.cc/150?u=${index + 50}`} alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-[14px] font-medium text-foreground group-hover:text-primary transition-colors">{mentor.name}</span>
                             </div>
                          </td>
                          <td className="px-6 py-5 text-center text-[12.5px] text-foreground-muted">{mentor.hours}</td>
                          <td className="px-6 py-5 text-center text-sm text-foreground-muted">{mentor.meetings}</td>
                          <td className="px-6 py-5 text-[12.5px] text-foreground-muted italic">{mentor.time}</td>
                          <td className="px-6 py-5">
                             <span className="font-black text-primary text-[16px]">{mentor.price}</span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <button className="px-5 py-2.5 bg-primary text-white text-[11px] font-medium rounded-md hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                                Book Now
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="mt-16 bg-blue-500/10 rounded-md p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20">
           <div className="flex items-center gap-4">
              <div className="text-4xl">💡</div>
              <div>
                 <h3 className="text-xl font-medium text-foreground">Need help to find your ideal instructor?</h3>
                 <p className="text-sm text-foreground-muted">Use our search to easily search and find the ideal instructor by expertise, availability, and teaching style.</p>
              </div>
           </div>
           <button className="px-6 py-3 bg-primary text-white font-medium rounded-md text-sm whitespace-nowrap">
              Instructor Finder
           </button>
        </div>
      </div>
    </section>
  );
}
