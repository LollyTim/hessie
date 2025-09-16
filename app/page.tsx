import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[rgba(239,244,255,1)]">
      {/* Navigation */}
      <div className="mx-auto mt-4 md:mt-10 max-w-6xl flex w-[90%] flex-row justify-center items-center">
        <nav className="bg-white shadow-sm w-full rounded-2xl">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#2764E7] rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-xl font-semibold text-gray-900 font-sans">SmartA</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                  Features
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                  Integrations
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                  Pricing
                </a>
              </div>

              <div className="flex items-center">
                <Button
                  variant="outline"
                  className="h-10 md:h-10 border-[#2764E7] text-[#2764E7] hover:bg-[#2764E7] hover:text-white bg-transparent text-sm md:text-base px-3 md:px-4"
                >
                  Send us a mail
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center w-full">
          {/* Smart Assistant Badge */}
          <div className="inline-flex items-center justify-center mb-6 md:mb-8">
            <div className="bg-[#CFDEFF] text-[#192040] px-4 py-2 rounded-full text-sm font-medium">
              Hi, I am a smart executive assistant
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[56px] font-bold text-[#0A1C41] mb-4 md:mb-6 leading-tight font-sans text-balance px-4">
            Automate Routine Tasks. <br className="hidden sm:block" />
            Focus On Important Work.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-[#0B1A39] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed font-sans text-pretty px-4">
            I help summarize meetings, draft emails, and manage your calendar to keep you productive. Get early access.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto mb-8 md:mb-12 px-4">
            {/* Desktop layout */}
            <div className="hidden sm:block bg-white rounded-2xl p-1 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <Input
                  type="email"
                  placeholder="my-email@mail.com"
                  className="flex-1 h-12 px-4 text-base border-0 bg-transparent focus:ring-0 focus:outline-none shadow-none"
                />
                <Button className="h-11 px-6 text-white font-medium text-base bg-gradient-to-b from-[rgba(39,100,231,1)] to-[rgba(39,100,231,1)] shadow-[0_8px_24px_rgba(39,100,231,0.12)] hover:opacity-90 rounded-xl">
                  Get access
                </Button>
              </div>
            </div>

            {/* Mobile layout - stacked */}
            <div className="sm:hidden space-y-3">
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-200">
                <Input
                  type="email"
                  placeholder="my-email@mail.com"
                  className="w-full h-12 px-4 text-base border-0 bg-transparent focus:ring-0 focus:outline-none shadow-none"
                />
              </div>
              <Button className="w-full h-12 text-white font-medium text-base bg-gradient-to-b from-[rgba(39,100,231,1)] to-[rgba(39,100,231,1)] shadow-[0_8px_24px_rgba(39,100,231,0.12)] hover:opacity-90 rounded-2xl">
                Get access
              </Button>
            </div>
          </div>

          {/* Integration Text */}
          <p className="text-[#0B1A39] text-sm md:text-base mb-4 md:mb-6 font-sans">I integrate well with these</p>

          {/* Integration Icons */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 max-w-sm md:max-w-none mx-auto">
            {/* Calendar Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src={"/Group 5.png"} alt="Slack" className="w-full h-full" />
            </div>

            {/* Gmail Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src={"/Group 3.png"} alt="Slack" className="w-full h-full" />
            </div>

            {/* Slack Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src={"/Group 8.png"} alt="Slack" className="w-full h-full" />
            </div>

            {/* Outlook Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src={"/Group 4.png"} alt="Slack" className="w-full h-full" />
            </div>

            {/* Notification Icon with Red Bubble */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative">
              <img src={"/Group 6.png"} alt="Slack" className="w-full h-full" />
              {/* Red notification bubble */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
