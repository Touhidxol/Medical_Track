import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Stethoscope, FileText, User } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/nav";

export default function MedicalTrack() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white p-12 text-center ">
          <h1 className="text-4xl font-bold mb-4">MedicalTrack</h1>
          <p className="text-lg mb-6">Track your health, appointments, and reports with ease.</p>
          <Link href="/auth/register">
            <Button className="bg-white/80 text-blue-600 font-semibold hover:bg-white hover:-translate-y-0.5 hover:scale-105 hover:shadow-md shadow-black/30 ease-in-out cursor-pointer ">Get Started</Button>
          </Link>
        </section>
        {/* About Section */}
        <section className="p-10 bg-gray-100">
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
              <Calendar className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="font-bold text-xl mb-2">Appointments</h2>
              <p className="text-center text-gray-600">Book and manage your doctor visits effortlessly.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center p-6">
              <FileText className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="font-bold text-xl mb-2">Medical Records</h2>
              <p className="text-center text-gray-600">Securely access your prescriptions and lab results.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center p-6">
              <Stethoscope className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="font-bold text-xl mb-2">Health Tracking</h2>
              <p className="text-center text-gray-600">Monitor vitals and track your daily health progress.</p>
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
