import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: "123 Tech Street, Silicon Valley, CA 94025",
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    title: "Email",
    details: "support@techzone.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon - Fri: 9AM - 9PM",
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mt-2">
            Have questions? We'd love to hear from you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card p-6 md:p-8 rounded-xl card-shadow">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Send us a message
            </h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    First Name
                  </label>
                  <Input placeholder="John" className="bg-secondary border-0" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Last Name
                  </label>
                  <Input placeholder="Doe" className="bg-secondary border-0" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-secondary border-0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Subject
                </label>
                <Input
                  placeholder="How can we help?"
                  className="bg-secondary border-0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Message
                </label>
                <Textarea
                  placeholder="Your message..."
                  rows={4}
                  className="bg-secondary border-0 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Contact Information
            </h3>
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-card p-4 rounded-lg card-shadow"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.title}</p>
                    <p className="text-sm text-muted-foreground">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-card rounded-xl overflow-hidden card-shadow h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Interactive map coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
