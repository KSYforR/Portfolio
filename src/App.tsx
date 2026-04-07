import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  BarChart3, 
  Globe, 
  ChevronRight,
  FileText,
  Database,
  Truck,
  Users,
  Info,
  Wrench,
  Languages
} from "lucide-react";

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
      <Icon size={24} />
    </div>
    <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">{title}</h2>
  </div>
);

const ToolBar = ({ name, level, description, color = "bg-blue-500" }: { name: string; level: number; description: string; color?: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end gap-4">
      <span className="font-bold text-slate-900 text-sm">{name}</span>
      <span className="text-[10px] text-slate-400 font-mono text-right leading-tight">{description}</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${(level / 5) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  </div>
);

const HoverPopup = ({ 
  trigger, 
  content, 
  className = "" 
}: { 
  trigger: ReactNode; 
  content: ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {trigger}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-5 bg-white rounded-2xl shadow-2xl border border-slate-100 text-sm text-slate-600 pointer-events-none"
          >
            <div className="relative z-10">
              {content}
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExperienceItem = ({ 
  company, 
  role, 
  period, 
  location, 
  details 
}: { 
  company: string; 
  role: string; 
  period: string; 
  location: string; 
  details: { title?: string; items: string[] }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-8 last:pb-0 border-l border-slate-200 group"
    >
      <div className={`timeline-dot transition-all duration-300 ${isOpen ? 'scale-150 bg-blue-600' : 'group-hover:scale-125'}`} />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer p-6 -m-4 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{company}</h3>
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                className="text-blue-400"
              >
                <ChevronRight size={18} />
              </motion.div>
            </div>
            <p className="text-blue-600 font-medium">{role}</p>
          </div>
          <div className="text-right mt-1 md:mt-0">
            <p className="text-sm font-mono text-slate-500">{period}</p>
            <p className="text-xs text-slate-400">{location}</p>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-6 border-t border-slate-50 mt-4">
                {details.map((group, idx) => (
                  <div key={idx} className="space-y-3">
                    {group.title && (
                      <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full" />
                        {group.title}
                      </h4>
                    )}
                    <ul className="space-y-3">
                      {group.items.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
                        >
                          <span className="text-lg shrink-0">
                            {idx === 0 && i === 0 ? "🚀" : 
                             idx === 0 && i === 1 ? "📈" :
                             idx === 1 && i === 0 ? "🔍" :
                             idx === 1 && i === 1 ? "💡" : "✨"}
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold flex items-center gap-1">
            <Info size={10} /> Click or hover to expand details
          </p>
        )}
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, icon: Icon, skills }: { title: string; icon: any; skills: string[] }) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-4 text-slate-900">
      <Icon size={18} className="text-blue-500" />
      <h3 className="font-bold uppercase tracking-wide text-sm">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span key={idx} className="skill-tag">{skill}</span>
      ))}
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-tighter text-xl">SK.</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#hero" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
            <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
          </div>
          <a 
            href="mailto:soyeon.kim.anna@gmail.com"
            className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-all"
          >
            Get in touch
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto pt-32 pb-24">
        {/* Hero Section */}
        <section id="hero" className="px-6 mb-24">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Available for Opportunities
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Soyeon Kim
              </h1>
              <div className="text-xl md:text-2xl text-slate-500 font-light mb-8 max-w-2xl leading-relaxed">
                Supply Chain & Operations professional building{" "}
                <HoverPopup 
                  trigger={
                    <span className="group/item inline-flex items-center gap-1.5 text-slate-900 font-medium italic underline decoration-blue-500/30 underline-offset-4 cursor-help hover:text-blue-600 transition-colors">
                      <BarChart3 size={18} className="text-blue-500 group-hover/item:scale-110 transition-transform" />
                      visibility
                    </span>
                  }
                  content={
                    <div className="space-y-2">
                      <p className="font-bold text-slate-900">Supply Chain Visibility</p>
                      <p>Implementing real-time tracking and data transparency across global operations to eliminate bottlenecks.</p>
                    </div>
                  }
                />
                {" "}and{" "}
                <HoverPopup 
                  trigger={
                    <span className="group/item inline-flex items-center gap-1.5 text-slate-900 font-medium italic underline decoration-blue-500/30 underline-offset-4 cursor-help hover:text-blue-600 transition-colors">
                      <Truck size={18} className="text-blue-500 group-hover/item:scale-110 transition-transform" />
                      efficiency
                    </span>
                  }
                  content={
                    <div className="space-y-2">
                      <p className="font-bold text-slate-900">Operational Efficiency</p>
                      <p>Optimizing procurement cycles and reducing lead times through standardized processes and spend analysis.</p>
                    </div>
                  }
                />
                {" "}in global supply chains through data-driven insights.
              </div>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 text-sm">
                  <MapPin size={16} className="text-blue-500" />
                  Gimpo-si, Gyeonggi-do, KR
                </div>
                <a 
                  href="https://www.linkedin.com/in/soyeon-kim-seoul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 text-sm hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                  <Linkedin size={16} className="text-blue-500" />
                  LinkedIn
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
                  alt="Atmospheric Landscape" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full -z-10 blur-3xl opacity-20" />
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section-padding border-t border-slate-100">
          <SectionHeader title="Work Experience" icon={Briefcase} />
          <div className="max-w-4xl">
            <ExperienceItem 
              company="LG Electronics Australia"
              role="Procurement Intern"
              period="2025.04 – 2025.08"
              location="Sydney, Australia"
              details={[
                {
                  title: "Internal Process Optimization",
                  items: [
                    "Improved process visibility and reduced procurement lead time by up to 3 days.",
                    "Developed comprehensive PR (Purchase Request) manuals and conducted training sessions for internal teams to streamline operations."
                  ]
                },
                {
                  title: "Procurement & Data Analysis",
                  items: [
                    "Established a New Vendor Database by verifying cost logic and reviewing marketing supplier contracts.",
                    "Analyzed historical Purchase Order (PO) data to identify cost-saving opportunities and support strategic sourcing."
                  ]
                }
              ]}
            />
            <ExperienceItem 
              company="FPCU Pty Ltd"
              role="Project Assistant Intern"
              period="2024.10 – 2025.03"
              location="Sydney, Australia"
              details={[
                {
                  items: [
                    "Developed Excel-based models to analyze R&D project operating costs and supported investment decision-making.",
                    "Managed contract documentation and drafted professional business correspondence for stakeholder funding meetings.",
                    "Increased project visibility by establishing a structured shared documentation system."
                  ]
                }
              ]}
            />
            <ExperienceItem 
              company="World Vision Korea"
              role="Sponsorship Team Intern"
              period="2023.12 – 2024.02"
              location="Seoul, Korea"
              details={[
                {
                  items: [
                    "Translated 80–100 child sponsorship letters daily (KO-EN).",
                    "Managed inventory and quantity verification for seasonal membership kits."
                  ]
                }
              ]}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-padding bg-slate-100/50 rounded-[3rem]">
          <SectionHeader title="Skills & Expertise" icon={BarChart3} />
          <div className="grid md:grid-cols-3 gap-6">
            <SkillCategory 
              title="SCM & Procurement" 
              icon={Truck}
              skills={["Order Monitoring", "Vendor RFQ Coordination", "Spend Analysis", "PR/PO Management"]}
            />
            <SkillCategory 
              title="Data & BI" 
              icon={Database}
              skills={["Advanced Excel", "Pivot Tables", "XLOOKUP", "Power BI", "Tableau"]}
            />
            <SkillCategory 
              title="Languages" 
              icon={Globe}
              skills={["English (TOEIC 915, OPIc IH)", "Korean (Native)"]}
            />
          </div>
        </section>

        {/* Tools Section */}
        <section className="section-padding">
          <SectionHeader title="Tools & Proficiency" icon={Wrench} />
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <ToolBar name="Excel" level={5} description="Pivot, XLOOKUP, Financial Modeling" />
              <ToolBar name="PowerPoint" level={4} description="Strategic Reporting & Manuals" />
              <ToolBar name="Word" level={4} description="Contract Drafting & Documentation" />
              <ToolBar name="Tableau" level={3} color="bg-indigo-500" description="Data Visualization Dashboards" />
              <ToolBar name="Power BI" level={2} color="bg-violet-500" description="Basic Report Automation" />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section-padding">
          <SectionHeader title="Education" icon={GraduationCap} />
          <div className="max-w-4xl bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Soongsil University</h3>
              <p className="text-slate-600 mb-2">Bachelor of Business Administration</p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">Minor: Statistics</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-slate-500">Graduated Feb 2026</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">3.86 <span className="text-sm text-slate-400 font-normal">/ 4.5</span></p>
            </div>
          </div>
        </section>

        {/* Extra-Curricular & Certificates */}
        <div className="grid md:grid-cols-2 gap-12 section-padding border-t border-slate-100">
          <section>
            <SectionHeader title="Activities" icon={Users} />
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-slate-900">Student Council Finance Team Leader</h3>
                <p className="text-xs font-mono text-slate-400 mb-2">2023.03 – 2024.02</p>
                <p className="text-sm text-slate-600">Managed annual budgets, event procurement, and external regional partnerships.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Economics Research Society (YLC)</h3>
                <p className="text-xs font-mono text-slate-400 mb-2">2022.03 – 2023.02</p>
                <p className="text-sm text-slate-600">Conducted corporate valuation analysis and presented research on global economic trends.</p>
              </div>
            </div>
          </section>

          <section>
            <SectionHeader title="Certificates" icon={Award} />
            <div className="space-y-4">
              {[
                { name: "Computer Proficiency in Spreadsheet (Level 2)", icon: FileText },
                { name: "TOEIC: 915 / 990", icon: Globe },
                { name: "OPIc: IH (English)", icon: Globe }
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <cert.icon size={18} className="text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">{cert.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 italic">Let's build something efficient together.</h2>
          <div className="flex flex-col items-center gap-6">
            <a 
              href="mailto:soyeon.kim.anna@gmail.com" 
              className="group flex items-center gap-3 text-xl font-light hover:text-blue-400 transition-colors"
            >
              <Mail className="group-hover:scale-110 transition-transform" />
              soyeon.kim.anna@gmail.com
            </a>
            <div className="flex gap-6 mt-8">
              <a href="https://www.linkedin.com/in/soyeon-kim-seoul" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <p className="mt-20 text-slate-500 text-xs tracking-widest uppercase">
            © 2026 Soyeon Kim. Built with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
