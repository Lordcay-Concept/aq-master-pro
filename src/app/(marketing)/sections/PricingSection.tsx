import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses",
    features: [
      { name: "Up to 3 counters", included: true },
      { name: "Basic queue management", included: true },
      { name: "Email notifications", included: true },
      { name: "Basic analytics", included: true },
      { name: "SMS notifications", included: false },
      { name: "API access", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      { name: "Up to 10 counters", included: true },
      { name: "Advanced queue management", included: true },
      { name: "Email & SMS notifications", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Digital signage", included: true },
      { name: "API access", included: true },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      { name: "Unlimited counters", included: true },
      { name: "Custom solutions", included: true },
      { name: "All notification channels", included: true },
      { name: "Real-time analytics", included: true },
      { name: "White-label solution", included: true },
      { name: "Dedicated API support", included: true },
      { name: "24/7 priority support", included: true },
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, <span className="text-blue-600">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? "lg:scale-105 border-2 border-blue-500" : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
              <div className="border-t border-gray-200 p-8">
                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
