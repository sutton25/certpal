import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, RotateCcw, Play } from "lucide-react";
import Navbar from "@/components/Navbar";

// Sample flashcard data
const flashcardData: Record<string, any[]> = {
  "security-plus": [
    { question: "What is CIA in cybersecurity?", answer: "Confidentiality, Integrity, and Availability - the three pillars of information security." },
    { question: "What is the difference between symmetric and asymmetric encryption?", answer: "Symmetric uses one key for both encryption and decryption, while asymmetric uses a public/private key pair." },
    { question: "What is multi-factor authentication (MFA)?", answer: "A security system that requires multiple methods of authentication from independent categories to verify user identity." },
    { question: "What is a firewall?", answer: "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules." },
    { question: "What is social engineering?", answer: "Manipulation techniques that exploit human psychology to trick users into making security mistakes or giving away sensitive information." },
    { question: "What is a VPN?", answer: "Virtual Private Network - creates a secure, encrypted connection over a less secure network, such as the internet." },
    { question: "What is zero trust security?", answer: "A security model that requires strict verification for every person and device trying to access resources, regardless of location." },
    { question: "What is ransomware?", answer: "Malicious software that encrypts files and demands payment for the decryption key." },
    { question: "What is phishing?", answer: "A social engineering attack where attackers impersonate legitimate entities to steal sensitive information." },
    { question: "What is a DDoS attack?", answer: "Distributed Denial of Service - overwhelms a target system with traffic from multiple sources to make it unavailable." },
    { question: "What is endpoint security?", answer: "Protection of end-user devices like computers, mobile devices, and servers from cyber threats." },
    { question: "What is data loss prevention (DLP)?", answer: "Strategy and tools to ensure sensitive data is not lost, misused, or accessed by unauthorized users." },
    { question: "What is intrusion detection system (IDS)?", answer: "Monitors network traffic for suspicious activity and alerts administrators." },
    { question: "What is access control?", answer: "Security technique that regulates who can view or use resources in a computing environment." },
    { question: "What is encryption at rest?", answer: "Encryption of data when it is stored on a device or backup, not actively being transmitted." }
  ],
  "network-plus": [
    { question: "What is the OSI model?", answer: "A 7-layer conceptual framework that describes how data communications occur between systems: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
    { question: "What is the difference between TCP and UDP?", answer: "TCP is connection-oriented and reliable, while UDP is connectionless and faster but less reliable." },
    { question: "What is a subnet mask?", answer: "A 32-bit number that divides an IP address into network and host portions." },
    { question: "What is DHCP?", answer: "Dynamic Host Configuration Protocol - automatically assigns IP addresses to devices on a network." },
    { question: "What is DNS?", answer: "Domain Name System - translates human-readable domain names to IP addresses." },
    { question: "What is a MAC address?", answer: "Media Access Control address - a unique identifier assigned to network interface controllers." },
    { question: "What is NAT?", answer: "Network Address Translation - modifies IP address information in packet headers while in transit." },
    { question: "What is a VLAN?", answer: "Virtual Local Area Network - logically segments a network to improve performance and security." },
    { question: "What is QoS?", answer: "Quality of Service - manages network traffic to reduce latency and ensure reliable performance for critical applications." },
    { question: "What is BGP?", answer: "Border Gateway Protocol - routes data between autonomous systems on the internet." },
    { question: "What is a switch vs router?", answer: "Switch connects devices within a network; router connects multiple networks and routes traffic between them." },
    { question: "What is ARP?", answer: "Address Resolution Protocol - maps IP addresses to MAC addresses on a local network." },
    { question: "What is a proxy server?", answer: "Intermediary server that separates end users from websites they browse, providing security and privacy." },
    { question: "What is bandwidth?", answer: "Maximum rate of data transfer across a network path, typically measured in bits per second." },
    { question: "What is latency?", answer: "Time delay between the cause and effect of a physical change in a system, typically measured in milliseconds." }
  ],
  "cysa-plus": [
    { question: "What is threat intelligence?", answer: "Evidence-based knowledge about existing or emerging threats that can be used to inform decisions about security." },
    { question: "What is a SIEM?", answer: "Security Information and Event Management - provides real-time analysis of security alerts generated by applications and network hardware." },
    { question: "What is incident response?", answer: "A structured approach to handling security breaches or attacks, including preparation, detection, containment, eradication, and recovery." },
    { question: "What is vulnerability assessment?", answer: "The process of identifying, quantifying, and prioritizing vulnerabilities in a system." },
    { question: "What is penetration testing?", answer: "Simulated cyber attack against a system to check for exploitable vulnerabilities." },
    { question: "What is threat hunting?", answer: "Proactive search through networks to detect and isolate advanced threats that evade security solutions." },
    { question: "What is a security operations center (SOC)?", answer: "Centralized unit that deals with security issues on an organizational and technical level." },
    { question: "What is behavioral analysis?", answer: "Security technique that monitors user and system behavior to detect anomalies indicating potential threats." },
    { question: "What is indicator of compromise (IoC)?", answer: "Forensic data that identifies potentially malicious activity on a system or network." },
    { question: "What is threat modeling?", answer: "Process of identifying potential threats and vulnerabilities to determine security requirements." },
    { question: "What is security orchestration?", answer: "Coordinating security tools and processes to respond to threats more efficiently." },
    { question: "What is risk assessment?", answer: "Process of identifying, analyzing, and evaluating risks to organizational assets." },
    { question: "What is forensic analysis?", answer: "Investigation of digital devices and data to uncover evidence of cybercrimes." },
    { question: "What is anomaly detection?", answer: "Identifying patterns in data that do not conform to expected behavior." },
    { question: "What is security metrics?", answer: "Quantifiable measures used to track and assess the status of security processes." }
  ]
};

const studyPaces = [
  { value: "quick", label: "Quick Review", description: "3 seconds per card", time: 3000 },
  { value: "normal", label: "Normal Pace", description: "5 seconds per card", time: 5000 },
  { value: "slow", label: "Slow & Steady", description: "7 seconds per card", time: 7000 }
];

const Flashcards = () => {
  const { certId } = useParams();
  const [showSetup, setShowSetup] = useState(true);
  const [numCards, setNumCards] = useState(10);
  const [studyPace, setStudyPace] = useState("normal");
  const [autoFlip, setAutoFlip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyCards, setStudyCards] = useState<any[]>([]);
  
  const allCards = flashcardData[certId || "security-plus"] || flashcardData["security-plus"];
  const maxCards = Math.min(allCards.length, 100);
  const currentCard = studyCards[currentIndex];
  const progress = studyCards.length > 0 ? ((currentIndex + 1) / studyCards.length) * 100 : 0;

  const startStudying = () => {
    const selectedCards = allCards.slice(0, numCards);
    setStudyCards(selectedCards);
    setShowSetup(false);
  };

  // Auto-flip functionality
  useEffect(() => {
    if (!showSetup && autoFlip && studyCards.length > 0) {
      const pace = studyPaces.find(p => p.value === studyPace);
      const delay = pace?.time || 5000;
      
      const flipInterval = setInterval(() => {
        setIsFlipped(prev => !prev);
      }, delay);
      
      return () => clearInterval(flipInterval);
    }
  }, [showSetup, autoFlip, studyPace, studyCards.length]);

  const handleNext = () => {
    if (currentIndex < studyCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setShowSetup(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudyCards([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/certifications">
              <Button variant="ghost" className="mb-4">
                ← Back to Certifications
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-2">Flashcards</h1>
            <p className="text-muted-foreground">
              {showSetup ? "Configure your study session" : "Click the card to flip and reveal the answer"}
            </p>
          </div>

          {showSetup ? (
            <Card className="p-8">
              <CardHeader>
                <CardTitle>Study Session Setup</CardTitle>
                <CardDescription>Customize your flashcard session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium">Number of Cards</label>
                    <span className="text-2xl font-bold text-primary">{numCards}</span>
                  </div>
                  <Slider
                    value={[numCards]}
                    onValueChange={(value) => setNumCards(value[0])}
                    min={5}
                    max={maxCards}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Available: {allCards.length} cards
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-4 block">Study Pace</label>
                  <div className="grid gap-3">
                    {studyPaces.map((pace) => (
                      <Card
                        key={pace.value}
                        className={`p-4 cursor-pointer transition-all ${
                          studyPace === pace.value
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => setStudyPace(pace.value)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{pace.label}</h3>
                            <p className="text-sm text-muted-foreground">{pace.description}</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              studyPace === pace.value
                                ? "border-primary bg-primary"
                                : "border-muted"
                            }`}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-flip" className="text-base font-medium">
                      Auto-flip Cards
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically flip cards at the selected pace
                    </p>
                  </div>
                  <Switch
                    id="auto-flip"
                    checked={autoFlip}
                    onCheckedChange={setAutoFlip}
                  />
                </div>

                <Button onClick={startStudying} size="lg" className="w-full">
                  <Play className="mr-2 h-5 w-5" />
                  Start Studying
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Card {currentIndex + 1} of {studyCards.length}
                </span>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Session
                </Button>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card 
              className="relative h-96 cursor-pointer perspective-1000 mb-8"
              onClick={() => studyPace === "thorough" && setIsFlipped(!isFlipped)}
            >
              <div 
                className={`absolute inset-0 transition-all duration-500 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div 
                  className={`absolute inset-0 backface-hidden p-8 flex items-center justify-center text-center bg-gradient-to-br from-card to-card/50 rounded-lg border-2 ${
                    isFlipped ? 'invisible' : 'visible'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div>
                    <div className="text-sm text-primary font-semibold mb-4">QUESTION</div>
                    <p className="text-2xl font-medium">{currentCard.question}</p>
                    <p className="text-sm text-muted-foreground mt-8">
                      {studyPace === "thorough" ? "Click to reveal answer" : "Auto-flipping..."}
                    </p>
                  </div>
                </div>
                
                {/* Back of card */}
                <div 
                  className={`absolute inset-0 backface-hidden p-8 flex items-center justify-center text-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary ${
                    isFlipped ? 'visible' : 'invisible'
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div>
                    <div className="text-sm text-primary font-semibold mb-4">ANSWER</div>
                    <p className="text-xl">{currentCard.answer}</p>
                    <p className="text-sm text-muted-foreground mt-8">
                      {studyPace === "thorough" ? "Click to see question" : "Auto-flipping..."}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                size="lg"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Previous
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleNext}
                disabled={currentIndex === studyCards.length - 1}
                size="lg"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
