import Image from "next/image";
import { Users, Award, Building2, Globe2 } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "50+", label: "Industry Awards" },
  { icon: Building2, value: "500+", label: "Active Businesses" },
  { icon: Globe2, value: "15+", label: "Countries" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">A&Q Master Pro</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              We're on a mission to revolutionize how businesses manage customer flow and appointments. 
              With cutting-edge technology and intuitive design, we help organizations deliver exceptional 
              service experiences.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Founded in 2020 by industry experts",
                "Serving businesses across 15+ countries",
                "99.9% system uptime guarantee",
                "ISO 27001 certified for security"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image/Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Our Mission</h4>
                <p className="text-sm text-gray-600">
                  To eliminate waiting lines and enhance customer satisfaction through smart technology.
                </p>
              </div>
              <div className="bg-blue-600 p-6 rounded-2xl shadow-lg">
                <h4 className="font-semibold text-white mb-2">Our Vision</h4>
                <p className="text-sm text-blue-100">
                  A world where every customer interaction is seamless and delightful.
                </p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-purple-600 p-6 rounded-2xl shadow-lg">
                <h4 className="font-semibold text-white mb-2">Our Values</h4>
                <p className="text-sm text-purple-100">
                  Innovation, Reliability, Customer-Centricity, Excellence.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">
                  Round-the-clock assistance for all your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
