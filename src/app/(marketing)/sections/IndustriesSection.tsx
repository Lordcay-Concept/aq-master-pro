import { Building2, Store, Hospital, GraduationCap, Hotel, Landmark } from "lucide-react";

const industries = [
  {
    icon: Hospital,
    name: "Healthcare",
    description: "Hospitals, clinics, and dental practices",
    color: "blue",
    stats: "45% reduction in wait times"
  },
  {
    icon: Landmark,
    name: "Banking & Finance",
    description: "Banks, microfinance, and insurance",
    color: "green",
    stats: "60% faster customer service"
  },
  {
    icon: Store,
    name: "Retail",
    description: "Stores, supermarkets, and malls",
    color: "purple",
    stats: "30% increase in sales"
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Schools, universities, and training centers",
    color: "orange",
    stats: "50% less registration time"
  },
  {
    icon: Hotel,
    name: "Hospitality",
    description: "Hotels, restaurants, and events",
    color: "red",
    stats: "40% better guest experience"
  },
  {
    icon: Building2,
    name: "Government",
    description: "Public services and offices",
    color: "indigo",
    stats: "55% improved efficiency"
  }
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industries We <span className="text-blue-600">Serve</span>
          </h2>
          <p className="text-lg text-gray-600">
            Tailored queue management solutions for every sector
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-${industry.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <industry.icon className={`h-8 w-8 text-${industry.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h3>
              <p className="text-gray-600 mb-4">{industry.description}</p>
              <div className="flex items-center text-sm">
                <span className={`text-${industry.color}-600 font-semibold`}>{industry.stats}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
