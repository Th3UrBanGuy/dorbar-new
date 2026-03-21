import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-blue-200">
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 gap-12">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-500 text-lg">We are here to assist you. Reach out to us for any inquiries, spiritual guidance, or portal support.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#0066FF] mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Visit Us</h3>
              <p className="text-slate-500 font-medium">123 Spiritual Way<br/>Dhaka, Bangladesh 1200</p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#0066FF] mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-500 font-medium">+880 1234 567890<br/>Mon-Fri, 9am - 6pm</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#0066FF] mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-500 font-medium">info@darbarsharif.com<br/>support@darbarsharif.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h2>
            <form className="flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 pl-2">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John"
                    className="h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-slate-900 outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-600 pl-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe"
                    className="h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-slate-900 outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 pl-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-slate-900 outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 pl-2">Message</label>
                <textarea 
                  placeholder="How can we help you?"
                  rows={6}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none"
                ></textarea>
              </div>

              <Button className="rounded-2xl bg-[#0066FF] hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 h-14 text-lg font-bold group mt-4">
                Send Message <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
