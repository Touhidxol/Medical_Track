import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Lightbulb, ShieldCheck } from "lucide-react";

import Link from "next/link";
import Navbar from "@/components/nav";


export default function MedicalTrack() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 text-white px-8 md:px-20 py-20 min-h-screen flex flex-col justify-center items-center text-center"
          id="hero"
        >
          {/* Background Accent */}
          <div className="absolute inset-0 bg-[url('/medical-pattern.svg')] opacity-10 bg-cover bg-center pointer-events-none"></div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Understand Your Medical Coverage
          </h1>

          <p className="max-w-2xl text-lg md:text-xl mb-8 text-white/90">
            Instantly interpret complex medical policies with clear decisions, transparent reasoning, and actionable insights for every claim.
          </p>


          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/register">
              <Button className="px-6 py-3 text-lg font-semibold bg-white/80 text-blue-700 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:bg-white transition-transform cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Tagline */}
          <p className="mt-10 text-white/70 text-sm uppercase tracking-wide">
            For Patients • Providers • Insurers
          </p>
        </section>

        {/* About Section */}
        <section className="p-10 py-24 bg-gray-100" id="about">
          <h2 className="text-2xl font-bold mb-6 text-center">About</h2>
          <div className=" gap-6">
            <p className="px-50 text-center text-gray-700">Our system makes it simple to understand what’s covered under a medical policy. Instead of searching through long documents, you can ask a plain question — like “46-year-old male, knee surgery in Pune, 3-month policy” — and the system will find the exact clauses that apply.
              It doesn’t just give an answer; it explains the decision, shows the rules it was based on, and provides a clear outcome such as approval status, payout amount, or coverage limits.
              Designed for healthcare and insurance, the platform ensures faster claim decisions, transparent justifications, and reliable results that patients, providers, and insurers can trust.</p>
          </div>
        </section>

        {/* Services Section */}
        <section className="grid md:grid-cols-3 gap-6 p-10">
          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center p-6">
              <Search className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="font-bold text-xl mb-2">Policy Q&A</h2>
              <p className="text-center text-gray-600">
                Ask plain questions like “knee surgery in Pune, 3-month policy” and instantly find the exact clauses that apply.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center p-6">
              <Lightbulb className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="font-bold text-xl mb-2">Explainable Decisions</h2>
              <p className="text-center text-gray-600">
                Every answer includes clear reasoning, rule references, and context so you understand exactly why a decision was made.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center p-6">
              <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="font-bold text-xl mb-2">Trust & Transparency</h2>
              <p className="text-center text-gray-600">
                Designed for patients, providers, and insurers — ensuring faster claims, accurate payouts, and transparent coverage.
              </p>
            </CardContent>
          </Card>
        </section>


        {/* Dashboard Preview */}
        <section className="p-10 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Preview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Upcoming Appointments</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Dr. Sharma - Cardiologist</span>
                    <span className="text-sm text-gray-500">24 Aug, 10:00 AM</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Dr. Rao - Dermatologist</span>
                    <span className="text-sm text-gray-500">27 Aug, 3:00 PM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Reports</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Blood Test</span>
                    <Button size="sm" className="bg-blue-600 text-white cursor-pointer">View</Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>X-Ray Report</span>
                    <Button size="sm" className="bg-blue-600 text-white cursor-pointer">View</Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>



        {/* FAQ Section */}
        <section className="p-10 text-center">
          <h2 className="text-2xl font-bold mb-6 text-center">FAQs</h2>
          <div className="px-3 border-b-2 bg-gray-100 border-gray-300 rounded-md overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" >

                <AccordionTrigger className="text-xl font font-semibold">How do I create a new account for the medical portal?</AccordionTrigger>

                <AccordionContent className=" items-start ">
                  Visit the registration page, enter your personal details (name, DOB, email/phone), and verify with OTP or email.
                  You may also need your patient ID or hospital reference number.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="px-3 border-b-2 bg-gray-100 border-gray-300 rounded-md overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">

                <AccordionTrigger className="text-xl font font-semibold">What should I do if I forget my username or password?</AccordionTrigger>

                <AccordionContent className=" items-start">
                  Use the “Forgot Username/Password” option on the login page. Enter your registered email or phone number to receive reset instructions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="px-3 border-b-2 bg-gray-100 border-gray-300 rounded-md overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">

                <AccordionTrigger className="text-xl font font-semibold">What devices/browsers are supported for logging into the portal?</AccordionTrigger>

                <AccordionContent className=" items-start">
                  The portal works best on Chrome, Firefox, Safari, and Edge (latest versions). It supports desktops, tablets, and smartphones.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </section>

        {/* Contact Section */}
        <section className="p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Book Your Appointment</h2>
          <p className="mb-6 text-gray-600">Get in touch with certified doctors quickly.</p>
          <Button className="bg-blue-600 text-white cursor-pointer">Contact Us</Button>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white p-6 text-center">
          <p>&copy; 2025 MedicalTrack. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
