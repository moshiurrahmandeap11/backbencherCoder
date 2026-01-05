"use client"
import {
    ArrowRight,
    Award,
    Briefcase,
    CheckCircle,
    Clock,
    Code2,
    Globe,
    Heart,
    Lightbulb,
    Rocket,
    Shield,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';
import { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { value: "5+", label: "Years Experience", icon: <Clock className="w-6 h-6" />, color: "from-blue-500 to-cyan-500" },
    { value: "200+", label: "Projects Delivered", icon: <Briefcase className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
    { value: "50+", label: "Happy Clients", icon: <Users className="w-6 h-6" />, color: "from-green-500 to-emerald-500" },
    { value: "99%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" />, color: "from-orange-500 to-yellow-500" },
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with 8+ years of experience in React and Node.js",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Sarah Williams",
      role: "UI/UX Designer",
      bio: "Creative designer specializing in user-centric interfaces and experiences",
      skills: ["Figma", "UI/UX", "Prototyping", "Illustration"],
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Michael Chen",
      role: "DevOps Engineer",
      bio: "Infrastructure specialist with expertise in cloud and containerization",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Emma Davis",
      role: "Project Manager",
      bio: "Agile expert ensuring timely delivery and client satisfaction",
      skills: ["Agile", "Scrum", "JIRA", "Client Relations"],
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We embrace new technologies and creative solutions",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Quality",
      description: "Excellence in every line of code and every design pixel",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Transparency",
      description: "Open communication and honest collaboration",
      icon: <Shield className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Growth",
      description: "Continuous learning and improvement for our team and clients",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const timeline = [
    {
      year: "2019",
      title: "Founded Backbencher Coder",
      description: "Started as a small team of passionate developers",
      milestone: "First 10 projects delivered"
    },
    {
      year: "2020",
      title: "Expanded Services",
      description: "Added UI/UX design and mobile development services",
      milestone: "50+ clients served"
    },
    {
      year: "2021",
      title: "Team Growth",
      description: "Expanded team with senior developers and designers",
      milestone: "Awarded 'Best Tech Startup'"
    },
    {
      year: "2022",
      title: "International Projects",
      description: "Started working with clients from 10+ countries",
      milestone: "100+ projects milestone"
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Incorporated AI/ML capabilities into our services",
      milestone: "Featured in TechCrunch"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Expanding into AR/VR and blockchain solutions",
      milestone: "Targeting 200+ projects"
    }
  ];

  const technologies = [
    { name: "React/Next.js", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "Node.js", level: 90, color: "from-green-500 to-emerald-500" },
    { name: "TypeScript", level: 85, color: "from-blue-600 to-indigo-500" },
    { name: "Tailwind CSS", level: 92, color: "from-teal-500 to-cyan-500" },
    { name: "AWS/Azure", level: 88, color: "from-orange-500 to-yellow-500" },
    { name: "Docker/K8s", level: 82, color: "from-blue-400 to-blue-600" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <Heart className="w-4 h-4 text-[#D9FDA3]" />
            <span className="text-[#D9FDA3] text-sm font-medium">Our Story</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Backbencher Coder</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            We're a passionate team of developers, designers, and innovators building digital solutions that make a difference.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} p-3 flex items-center justify-center mb-4`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About Content Tabs */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { id: 'mission', label: 'Our Mission', icon: <Target className="w-4 h-4" /> },
              { id: 'story', label: 'Our Story', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'vision', label: 'Our Vision', icon: <Globe className="w-4 h-4" /> },
              { id: 'approach', label: 'Our Approach', icon: <Code2 className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-8">
            {activeTab === 'mission' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Empowering Businesses Through Technology
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Our mission is to transform ideas into powerful digital solutions that drive growth, enhance user experiences, and create lasting impact.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Deliver exceptional value to every client",
                      "Push the boundaries of technological innovation",
                      "Build sustainable and scalable solutions",
                      "Foster long-term partnerships based on trust"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D9FDA3]" />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 rounded-2xl blur-3xl" />
                  <div className="relative h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center">
                    <Target className="w-24 h-24 text-[#D9FDA3]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-[#D9FDA3]" />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    From Passion to Profession
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    What started as a group of passionate coders sitting in the backbench of a university classroom has grown into a full-service digital agency.
                  </p>
                  <p className="text-gray-300 mb-6">
                    We believe that great ideas can come from anywhere, and our "backbencher" mentality keeps us humble, curious, and always eager to learn.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#D9FDA3] font-medium">
                    <span>Read our full story</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Shaping the Future of Digital Innovation
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    We envision a world where technology seamlessly enhances human potential and creates opportunities for everyone.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-white font-semibold mb-2">Global Impact</div>
                      <div className="text-gray-300">Expanding our services to emerging markets and underserved communities</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-white font-semibold mb-2">Sustainable Tech</div>
                      <div className="text-gray-300">Developing eco-friendly and energy-efficient digital solutions</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 rounded-2xl blur-3xl" />
                  <div className="relative h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center">
                    <Globe className="w-24 h-24 text-[#D9FDA3]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'approach' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center">
                    <Code2 className="w-24 h-24 text-[#D9FDA3]" />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Agile, Collaborative, Results-Driven
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Our agile methodology ensures transparency, flexibility, and rapid delivery without compromising quality.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Agile Sprints", desc: "2-week development cycles" },
                      { title: "Daily Updates", desc: "Transparent communication" },
                      { title: "QA Testing", desc: "Rigorous quality checks" },
                      { title: "Client Feedback", desc: "Regular review sessions" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 rounded-lg bg-white/5">
                        <div className="text-white font-semibold">{item.title}</div>
                        <div className="text-gray-300 text-sm">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Our Core <span className="text-[#D9FDA3]">Values</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} p-3 flex items-center justify-center mb-4`}>
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Meet Our <span className="text-[#D9FDA3]">Team</span>
              </h3>
              <p className="text-gray-300 mt-2">Passionate professionals driving innovation</p>
            </div>
            <button className="px-5 py-2.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10">
              View All Team
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
                  {/* Profile Image Placeholder */}
                  <div className="h-48 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`} />
                    <div className="relative h-full flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm flex items-center justify-center">
                        <Users className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                    <div className="text-[#D9FDA3] font-medium mb-3">{member.role}</div>
                    <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                      <button className="text-[#D9FDA3] text-sm font-medium hover:text-cyan-400 transition-colors">
                        View Profile
                      </button>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                          <span className="text-gray-300 text-xs">TW</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                          <span className="text-gray-300 text-xs">IN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies & Skills */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Our <span className="text-[#D9FDA3]">Tech Stack</span>
          </h3>
          <div className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Technology Expertise</h4>
                <div className="space-y-6">
                  {technologies.map((tech, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">{tech.name}</span>
                        <span className="text-gray-300">{tech.level}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${tech.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${tech.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Certifications & Awards</h4>
                <div className="space-y-4">
                  {[
                    { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
                    { title: "Google UX Design Professional", issuer: "Google", year: "2022" },
                    { title: "Best Tech Startup 2022", issuer: "Tech Awards", year: "2022" },
                    { title: "React Advanced Certification", issuer: "Meta", year: "2023" }
                  ].map((cert, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-white font-semibold">{cert.title}</div>
                          <div className="text-gray-300 text-sm">{cert.issuer}</div>
                        </div>
                        <div className="text-[#D9FDA3] font-medium">{cert.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Our <span className="text-[#D9FDA3]">Journey</span>
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#D9FDA3] to-cyan-400" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 z-10" />
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10">
                      <div className="text-[#D9FDA3] font-bold text-lg mb-2">{item.year}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-300 mb-3">{item.description}</p>
                      <div className="text-sm text-gray-400">{item.milestone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center rounded-3xl overflow-hidden bg-gradient-to-r from-[#051320] via-[#0a1a2d] to-[#051320] border border-white/10 p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-6">
              <Rocket className="w-4 h-4 text-[#D9FDA3]" />
              <span className="text-[#D9FDA3] text-sm font-medium">Ready to Start?</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join Our Growing Family of Clients
            </h3>
            
            <p className="text-gray-300 text-lg mb-8">
              Let's build something amazing together. Our team is ready to bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3.5 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-full font-semibold hover:shadow-2xl hover:shadow-[#D9FDA3]/30 transition-all duration-300 flex items-center gap-3">
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="px-8 py-3.5 bg-transparent border-2 border-[#D9FDA3] text-[#D9FDA3] rounded-full font-semibold hover:bg-[#D9FDA3]/10 transition-all duration-300">
                Join Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;