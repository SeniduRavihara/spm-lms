"use client";

import { Star, ArrowRight, Calendar, User, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
interface Article {
  id: string;
  title: string;
  image_url?: string;
  author?: string;
  created_at: string;
}

const REVIEWS = [
  {
    name: "Sithija Ashan",
    role: "Director at Leaura group",
    avatar: "/Reviewers/Sithija_Ashan.webp",
    stars: 5,
    text: "Highly Recommended! මම 3rd batch එකේ.ඇත්තටම මම ඉගනගත්ත හොදම පන්තියක් SPM LMS කියන්නේ.ඇත්තටම ගොඩක් හොද course එකක්. course එක්කටත් එහා දේවල් කියල දෙන තැනක් ඒ වගේම ඕනි කෙනෙක්ට බය නැතුව රෙකමෙන්ඩ් කරන්න පුළුවන් ගෙවන ගානට වඩා වටනා Course එකක්. ඒ වගෙම wordpress විතරක්ම නෙමෙයි ජීවිතය දිනන්න මග පෙන්වන තැනක් තමයි SPM LMS කියන්නේ.විශේෂයෙන්ම Thank you මවන්ත අයියේ. මේකෙන් ගේමක් ගහන්න පාර කපල දුන්නට. SPM LMS කියන්නේ දිනවනම් සෙට් වෙන්නම ඕනි තැනක්. ජයවේවා.. ❤️❤️",
  },
  {
    name: "Malith Marasinghe",
    role: "Web Developer",
    avatar: "/Reviewers/Malith_Marasinghe.webp",
    stars: 5,
    text: "Just completed SPM LMS’s WordPress Development course and it was amazing! It covers everything from basics to advanced skills like SEO, security, and freelancing. Huge thanks to Lecturer Mawantha for the great guidance. Perfect for anyone starting in web development. Highly recommended! 🏆🏅❤️",
  },
];

export function StudentReviews() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % REVIEWS.length);
        setFade(true);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    setFade(false);
    setTimeout(() => {
      setActive(i);
      setFade(true);
    }, 200);
  };

  const rev = REVIEWS[active] || REVIEWS[0];

  return (
    <section className="py-20 bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: circular photo stack ── */}
          <div className="relative flex items-center justify-center py-10">
            {/* Outer ring */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-border" />

            {/* Main circle photo */}
            <div className="relative w-[320px] h-[320px] rounded-full overflow-hidden border-4 border-border shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000"
                alt="Student group"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 99+ badge */}
            <div className="absolute top-8 left-8 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-background-secondary">
              <span className="text-true-white font-black text-lg leading-none">99</span>
            </div>

            {/* Small bottom-left photo */}
            <div className="absolute bottom-6 left-0 w-28 h-28 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── Right: testimonial ── */}
          <div className="flex flex-col gap-6">
            {/* Label */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/15 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-sm" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Testimonials</span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-3">
                Our Students Say About Us
              </h2>
              <p className="text-[13.5px] text-foreground-muted leading-relaxed max-w-md">
                Hear from real students who gained in-demand skills, career growth and income freedom through SPM LMS&apos;s expert-led programs.
              </p>
            </div>

            {/* Review card */}
            <div
              className="bg-card border border-border rounded-2xl p-7 transition-all duration-300"
              style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)" }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rev.stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-[13.5px] text-foreground-muted leading-[1.85] mb-6 line-clamp-6">
                {rev.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-border shrink-0">
                  <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{rev.name}</p>
                  <p className="text-xs text-foreground-muted">{rev.role}</p>
                </div>
              </div>
            </div>

            {/* Dot navigation */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-foreground-muted"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
              <span className="ml-3 text-xs text-foreground-muted">{active + 1} / {REVIEWS.length}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const EVENTS = [
  { title: "Design and CS for Beginners on Modern Teams", date: "16 Nov 2024", price: "$20 - $80", instructor: "Robert Rumsfeld", image: "https://images.unsplash.com/photo-1540575861501-7c050c773f62?q=80&w=400" },
  { title: "Blockchain and Crypto Development for Beginners", date: "16 Nov 2024", price: "$10 - $70", instructor: "Robert Rumsfeld", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=400" },
  { title: "Cloud Computing Fundamentals for Modern Infrastructure", date: "16 Nov 2024", price: "$30 - $100", instructor: "Robert Rumsfeld", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400" },
  { title: "Digital Marketing Mastery for High Ranking and ROI", date: "16 Nov 2024", price: "$20 - $70", instructor: "Ricardo Daw", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400" },
  { title: "Modern Mobile App Development for Android and iOS", date: "16 Nov 2024", price: "$25 - $75", instructor: "Sarah Mitchell", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400" },
  { title: "Practical Cybersecurity Best Practices for Modern Organizations", date: "16 Nov 2024", price: "$40 - $170", instructor: "Light Moon", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400" },
];

const ARTICLES = [
  { title: "How to Sell Freelance Roles and Negotiate With Confidence", date: "01 Jan 2021", author: "George Harrison", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
  { title: "Top Tools Every Designer Lightroom Enthusiast Needs", date: "01 Jan 2021", author: "George Harrison", image: "https://images.unsplash.com/photo-1502465771179-51f3535da42c?q=80&w=800" },
  { title: "How to Start Freelancing with No Prior Skills in Today's Market", date: "14 Oct 2022", author: "Admin", image: "https://images.unsplash.com/photo-1454165833767-6216c495aa20?q=80&w=800" },
];

export function UpcomingEvents() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4 uppercase tracking-wider">
             Events
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-4">Explore Upcoming Events and Secure Your Spot Today With Ease</h2>
          <p className="text-foreground-muted">Register and join our upcoming events today to expand your skills, get informed on our updates and gain valuable skills and network with professionals.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
           {EVENTS.map((ev, index) => (
             <div key={index} className="group relative aspect-[3/5] rounded-md overflow-hidden cursor-pointer shadow-xl">
                <img src={ev.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
                   <div className="text-[10px] font-black text-primary uppercase mb-2 tracking-widest">{ev.date}</div>
                   <h3 className="text-sm font-medium text-white mb-4 line-clamp-3">{ev.title}</h3>
                   <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="text-sm font-black text-white">{ev.price}</div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="text-center">
           <button className="px-10 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all inline-flex items-center gap-2">
              Explore Events
           </button>
        </div>
      </div>
    </section>
  );
}

export function BlogArticles() {
  const articles: Article[] = [
    {
      id: "1",
      title: "Mastering Next.js: Best Practices for Clean Client Architecture",
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      author: "SPM LMS Team",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Why Tailwind CSS v4 is a Game Changer for Design Systems",
      image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      author: "SPM LMS Team",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "The Ultimate Guide to Relational Database Models with Prisma",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      author: "SPM LMS Team",
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <section className="py-24 bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4 uppercase tracking-wider">
             Read Blog
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground">Blog and Articles</h2>
          <p className="text-foreground-muted mt-4">Stay informed with expert-written articles, tips, and insights to support your learning journey today.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
           {articles.map((art) => (
             <div key={art.id} className="bg-card border border-border rounded-md overflow-hidden card-hover group cursor-pointer">
                <div className="aspect-video overflow-hidden">
                   <img src={art.image_url || "/placeholder-blog.jpg"} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-8">
                   <h3 className="text-xl font-medium text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">{art.title}</h3>
                   <div className="flex items-center justify-between text-xs text-foreground-muted">
                      <div className="flex items-center gap-2">
                         <User className="w-3.5 h-3.5" />
                         <span>{art.author || "Admin"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Calendar className="w-3.5 h-3.5" />
                         <span>{new Date(art.created_at).toLocaleDateString()}</span>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="text-center">
           <button className="px-10 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all inline-flex items-center gap-2">
              Blog Posts
           </button>
        </div>
      </div>
    </section>
  );
}
