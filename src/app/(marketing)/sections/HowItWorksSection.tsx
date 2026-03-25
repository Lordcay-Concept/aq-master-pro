import { UserPlus, CreditCard, Clock, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account in less than 2 minutes",
    color: "blue"
  },
  {
    icon: CreditCard,
    title: "Choose Service",
    description: "Select from our range of queue management solutions",
    color: "purple"
  },
  {
    icon: Clock,
    title: "Start Managing",
    description: "Set up your queue system and start serving customers",
    color: "green"
  },
  {
    icon: CheckCircle,
    title: "Go Live",
    description: "Launch and see immediate improvements in efficiency",
    color: "orange"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            Get started with A&Q Master Pro in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200" />
              )}
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center relative z-10">
                <div className={`w-20 h-20 bg-${step.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className={`h-10 w-10 text-${step.color}-600`} />
                </div>
                <div className="text-4xl font-bold text-gray-200 mb-2">{index + 1}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
