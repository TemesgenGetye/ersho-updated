import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      content:
        "Ersho Events made our wedding absolutely perfect! Every detail was handled with such care and attention. Our guests are still talking about how beautiful everything was.",
      rating: 5,
      image: null,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Client",
      content:
        "Professional, organized, and incredibly creative. They transformed our company retreat into an unforgettable experience. Highly recommended!",
      rating: 5,
      image: null,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Event Host",
      content:
        "From planning to execution, Ersho Events exceeded all our expectations. Their team is responsive, creative, and truly passionate about what they do.",
      rating: 5,
      image: null,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don’t just take our word for it. Here’s what our amazing clients
            have to say about their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-8 relative"
            >
              <div className="absolute top-6 right-6">
                <Quote className="h-8 w-8 text-slate-200" />
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-slate-400 fill-current"
                  />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-6 italic">
                “{testimonial.content}”
              </blockquote>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-slate-800 font-semibold text-lg">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-slate-100 rounded-full px-6 py-3">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-slate-400 fill-current" />
              ))}
            </div>
            <span className="text-slate-800 font-semibold">
              5.0 Average Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
