import { Book, Heart, Globe, Users, BookOpen, Star, Trophy, Sparkles } from 'lucide-react';

export default function About() {
  const stats = [
    { number: '50K+', label: 'Books Available', icon: BookOpen },
    { number: '100K+', label: 'Happy Customers', icon: Users },
    { number: '4.8/5', label: 'Customer Rating', icon: Star },
    { number: '10+', label: 'Years of Service', icon: Trophy }
  ];

  const values = [
    {
      icon: Book,
      title: 'Quality Literature',
      description: 'Curating the finest collection of books across all genres.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Dedicated to providing exceptional customer service and experience.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting readers worldwide with their next favorite book.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Continuously improving our services and digital experience.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      quote: 'Building a community of book lovers worldwide.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Curation',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      quote: 'Every book has a reader waiting to discover it.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      quote: 'Creating moments of joy through literature.'
    }
  ];

  return (
    <main className="bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-primary-600 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
            alt="Library"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Story</h1>
            <p className="text-xl text-white/90">
              Welcome to Bookverse, where passion for literature meets modern book shopping experience.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Bookverse, we're driven by our commitment to making quality literature accessible to everyone
            while fostering a community of passionate readers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Bookverse who work tirelessly to bring the joy of reading to our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 italic">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From a small online bookstore to a global community of readers.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-secondary-500"></div>
          <div className="space-y-12">
            {[
              { year: '2014', title: 'Founded', description: 'Bookverse launches with a mission to revolutionize online book shopping.' },
              { year: '2016', title: 'Global Expansion', description: 'Expanded operations to serve customers worldwide.' },
              { year: '2019', title: 'Community Growth', description: 'Reached 50,000 active members in our reading community.' },
              { year: '2024', title: 'Digital Innovation', description: 'Launched new digital experiences and personalized recommendations.' }
            ].map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-1/2 pr-8 text-right">
                  {index % 2 === 0 && (
                    <>
                      <div className="text-2xl font-bold text-primary-600">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </>
                  )}
                </div>
                <div className="relative flex items-center justify-center w-8">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-primary-500"></div>
                </div>
                <div className="w-1/2 pl-8">
                  {index % 2 !== 0 && (
                    <>
                      <div className="text-2xl font-bold text-primary-600">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}