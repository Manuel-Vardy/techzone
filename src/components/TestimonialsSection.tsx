import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Developer",
    avatar: "SJ",
    rating: 5,
    review:
      "Amazing selection and the delivery was super fast! My new laptop exceeded all expectations. The customer service team was incredibly helpful.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Graphic Designer",
    avatar: "MC",
    rating: 5,
    review:
      "Best prices I've found anywhere. The product quality is outstanding and the warranty support gave me peace of mind. Highly recommended!",
  },
  {
    id: 3,
    name: "Emily Williams",
    role: "Business Analyst",
    avatar: "EW",
    rating: 5,
    review:
      "Tech Zone has become my go-to store for all tech purchases. The website is easy to use and the checkout process is seamless.",
  },
  {
    id: 4,
    name: "David Martinez",
    role: "Content Creator",
    avatar: "DM",
    rating: 5,
    review:
      "I've been a loyal customer for 3 years now. Every purchase has been smooth and the products are always genuine and well-packaged.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-2">
            Trusted by thousands of happy customers worldwide
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-6 rounded-xl card-shadow relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
