import { CheckCircle, Clock, CreditCard, HeadphonesIcon, Settings, Users } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Queue Management",
    description: "Real-time queue tracking with digital display integration and automated calling system.",
    features: ["Digital signage", "SMS notifications", "Multi-counter support"]
  },
  {
    icon: Clock,
    title: "Appointment Booking",
    description: "24/7 online booking with calendar integration and automated reminders.",
    features: ["Calendar sync", "Email/SMS reminders", "Reschedule options"]
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Secure payment integration with support for multiple payment gateways.",
    features: ["Paystack/Flutterwave", "Invoice generation", "Payment history"]
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    description: "Dedicated support team to assist with any issues or inquiries.",
    features: ["Live chat", "Ticket system", "Knowledge base"]
  },
  {
    icon: Settings,
    title: "Staff Management",
    description: "Comprehensive tools for managing staff performance and schedules.",
    features: ["Performance tracking", "Shift management", "Role-based access"]
  },
  {
    icon: CheckCircle,
    title: "Analytics & Reports",
    description: "Detailed insights into queue performance and customer behavior.",
    features: ["Real-time dashboard", "Export reports", "Peak hour analysis"]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive queue management solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <service.icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
