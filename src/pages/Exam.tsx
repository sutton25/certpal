import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const examData: Record<string, any[]> = {
  "security-plus": [
    // Threats, Attacks, and Vulnerabilities
    { question: "An organization wants to implement a security control that will protect against unauthorized physical access. Which of the following would be MOST effective?", options: ["Biometric authentication system", "Password complexity requirements", "Intrusion detection system", "Data loss prevention software"], correct: 0, difficulty: "easy", category: "Physical Security" },
    { question: "A security analyst discovers that an attacker has been using stolen credentials. Which type of attack is this?", options: ["Man-in-the-middle", "Credential harvesting", "SQL injection", "Cross-site scripting"], correct: 1, difficulty: "medium", category: "Attack Types" },
    { question: "Which of the following BEST describes defense in depth?", options: ["Using a single strong security control", "Implementing multiple layers of security controls", "Focusing only on perimeter security", "Relying on endpoint protection only"], correct: 1, difficulty: "hard", category: "Security Architecture" },
    { question: "What type of malware can replicate itself without user interaction?", options: ["Trojan", "Worm", "Virus", "Adware"], correct: 1, difficulty: "easy", category: "Malware" },
    { question: "Which attack involves overwhelming a system with traffic to make it unavailable?", options: ["Phishing", "DDoS", "SQL Injection", "Buffer Overflow"], correct: 1, difficulty: "easy", category: "Attack Types" },
    { question: "What is the primary purpose of encryption?", options: ["Authentication", "Confidentiality", "Availability", "Non-repudiation"], correct: 1, difficulty: "easy", category: "Cryptography" },
    { question: "Which protocol provides secure remote access to network devices?", options: ["Telnet", "SSH", "FTP", "SMTP"], correct: 1, difficulty: "easy", category: "Network Security" },
    { question: "What does a digital signature provide?", options: ["Confidentiality only", "Integrity and authentication", "Availability", "Encryption"], correct: 1, difficulty: "medium", category: "Cryptography" },
    { question: "Which type of attack targets web applications by injecting malicious scripts?", options: ["SQL Injection", "XSS", "CSRF", "Buffer Overflow"], correct: 1, difficulty: "medium", category: "Web Security" },
    { question: "What is the difference between symmetric and asymmetric encryption?", options: ["Speed of encryption", "Number of keys used", "Level of security", "Type of algorithm"], correct: 1, difficulty: "medium", category: "Cryptography" },
    { question: "Which of the following is a characteristic of a zero-day exploit?", options: ["It has been patched", "No fix is available", "It only works on old systems", "It requires physical access"], correct: 1, difficulty: "hard", category: "Vulnerabilities" },
    { question: "What is the purpose of a honeypot?", options: ["Block all attacks", "Attract and analyze attackers", "Encrypt data", "Manage passwords"], correct: 1, difficulty: "medium", category: "Security Tools" },
    { question: "Which authentication factor is 'something you are'?", options: ["Password", "Smart card", "Fingerprint", "PIN"], correct: 2, difficulty: "easy", category: "Authentication" },
    { question: "What does MFA stand for?", options: ["Multiple Factor Authentication", "Multi-Factor Authentication", "Mandatory Factor Authentication", "Maximum Factor Authentication"], correct: 1, difficulty: "easy", category: "Authentication" },
    { question: "Which protocol is used for secure email transmission?", options: ["HTTP", "FTP", "S/MIME", "SNMP"], correct: 2, difficulty: "medium", category: "Cryptography" },
    { question: "What is the primary goal of risk management?", options: ["Eliminate all risks", "Reduce risk to acceptable levels", "Transfer all risks", "Ignore minor risks"], correct: 1, difficulty: "medium", category: "Risk Management" },
    { question: "Which attack involves tricking users into revealing sensitive information?", options: ["DDoS", "Phishing", "SQL Injection", "Buffer Overflow"], correct: 1, difficulty: "easy", category: "Social Engineering" },
    { question: "What is the principle of least privilege?", options: ["Give users maximum access", "Grant minimum necessary access", "Allow access to everything", "Restrict all access"], correct: 1, difficulty: "easy", category: "Access Control" },
    { question: "Which type of backup copies only changed files since the last full backup?", options: ["Full", "Incremental", "Differential", "Mirror"], correct: 2, difficulty: "medium", category: "Business Continuity" },
    { question: "What does IDS stand for?", options: ["Internet Detection System", "Intrusion Detection System", "Internal Defense System", "Information Defense System"], correct: 1, difficulty: "easy", category: "Security Tools" },
    { question: "Which security model focuses on data confidentiality?", options: ["Bell-LaPadula", "Biba", "Clark-Wilson", "Brewer-Nash"], correct: 0, difficulty: "hard", category: "Security Models" },
    { question: "What is the purpose of a VPN?", options: ["Speed up internet", "Create secure tunnel", "Block malware", "Scan for viruses"], correct: 1, difficulty: "easy", category: "Network Security" },
    { question: "Which port does HTTPS use by default?", options: ["80", "443", "8080", "22"], correct: 1, difficulty: "easy", category: "Network Security" },
    { question: "What is a rootkit?", options: ["Antivirus software", "Malware with elevated privileges", "Network scanner", "Firewall rule"], correct: 1, difficulty: "medium", category: "Malware" },
    { question: "Which attack exploits trust relationships between systems?", options: ["Privilege escalation", "Lateral movement", "Initial access", "Exfiltration"], correct: 1, difficulty: "medium", category: "Attack Types" },
    { question: "What does PKI stand for?", options: ["Public Key Infrastructure", "Private Key Infrastructure", "Protected Key Infrastructure", "Primary Key Infrastructure"], correct: 0, difficulty: "medium", category: "Cryptography" },
    { question: "Which protocol is used for network time synchronization?", options: ["NTP", "SNMP", "DNS", "DHCP"], correct: 0, difficulty: "medium", category: "Network Protocols" },
    { question: "What is the purpose of security awareness training?", options: ["Technical skills", "Reduce human risk", "Install software", "Configure firewalls"], correct: 1, difficulty: "easy", category: "Security Awareness" },
    { question: "Which type of fire suppression is safe for electronic equipment?", options: ["Water", "Foam", "FM-200", "Chemical powder"], correct: 2, difficulty: "medium", category: "Physical Security" },
    { question: "What is a SQL injection attack?", options: ["Network flood", "Database query exploit", "Email scam", "Physical breach"], correct: 1, difficulty: "medium", category: "Web Security" },
    { question: "Which encryption standard replaced DES?", options: ["3DES", "AES", "RSA", "RC4"], correct: 1, difficulty: "medium", category: "Cryptography" },
    { question: "What is the CIA triad in security?", options: ["Confidentiality, Integrity, Availability", "Control, Implement, Assess", "Create, Integrate, Analyze", "Central Intelligence Agency"], correct: 0, difficulty: "easy", category: "Security Fundamentals" },
    { question: "Which device filters traffic based on IP addresses and ports?", options: ["Hub", "Switch", "Firewall", "Router"], correct: 2, difficulty: "easy", category: "Network Security" },
    { question: "What is penetration testing?", options: ["Installing software", "Authorized hacking", "Password cracking", "Network monitoring"], correct: 1, difficulty: "medium", category: "Security Assessment" },
    { question: "Which standard defines information security management?", options: ["ISO 9001", "ISO 27001", "ISO 14001", "ISO 20000"], correct: 1, difficulty: "medium", category: "Compliance" }
  ],
  "network-plus": [
    // Networking Concepts
    { question: "A network administrator needs to segment a network to improve performance and security. Which device should be used?", options: ["Hub", "Repeater", "Switch with VLANs", "Bridge"], correct: 2, difficulty: "easy", category: "Network Devices" },
    { question: "Which routing protocol is considered a distance-vector protocol?", options: ["OSPF", "BGP", "RIP", "IS-IS"], correct: 2, difficulty: "medium", category: "Routing Protocols" },
    { question: "What is the purpose of QoS in a network?", options: ["Increase bandwidth", "Prioritize traffic types", "Encrypt data", "Authenticate users"], correct: 1, difficulty: "hard", category: "Network Services" },
    { question: "What is the maximum cable length for Cat6 Ethernet?", options: ["50 meters", "100 meters", "150 meters", "200 meters"], correct: 1, difficulty: "easy", category: "Cabling" },
    { question: "Which OSI layer does a router operate at?", options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"], correct: 2, difficulty: "easy", category: "OSI Model" },
    { question: "What does DHCP stand for?", options: ["Dynamic Host Configuration Protocol", "Direct Host Connection Protocol", "Dynamic Hardware Control Protocol", "Direct Hardware Configuration Protocol"], correct: 0, difficulty: "easy", category: "Network Services" },
    { question: "Which IP address is a private address?", options: ["8.8.8.8", "192.168.1.1", "1.1.1.1", "151.101.1.1"], correct: 1, difficulty: "easy", category: "IP Addressing" },
    { question: "What is the subnet mask for a /24 network?", options: ["255.255.0.0", "255.255.255.0", "255.255.255.128", "255.0.0.0"], correct: 1, difficulty: "easy", category: "Subnetting" },
    { question: "Which protocol translates domain names to IP addresses?", options: ["DHCP", "DNS", "ARP", "NAT"], correct: 1, difficulty: "easy", category: "Network Protocols" },
    { question: "What type of cable is used for connecting two switches directly?", options: ["Straight-through", "Crossover", "Rollover", "Console"], correct: 1, difficulty: "medium", category: "Cabling" },
    { question: "Which wireless standard supports speeds up to 600 Mbps?", options: ["802.11a", "802.11b", "802.11g", "802.11n"], correct: 3, difficulty: "medium", category: "Wireless" },
    { question: "What is the default gateway?", options: ["DNS server", "Router IP address", "DHCP server", "Web server"], correct: 1, difficulty: "easy", category: "IP Addressing" },
    { question: "Which protocol is connectionless?", options: ["TCP", "HTTP", "UDP", "FTP"], correct: 2, difficulty: "medium", category: "Transport Protocols" },
    { question: "What does NAT do?", options: ["Translates IP addresses", "Assigns IP addresses", "Resolves domain names", "Routes packets"], correct: 0, difficulty: "medium", category: "Network Services" },
    { question: "Which command displays the routing table on Windows?", options: ["ipconfig", "route print", "netstat", "tracert"], correct: 1, difficulty: "medium", category: "Network Commands" },
    { question: "What is the purpose of ARP?", options: ["Resolve IP to MAC", "Resolve domain to IP", "Assign IP addresses", "Route packets"], correct: 0, difficulty: "medium", category: "Network Protocols" },
    { question: "Which topology has a central connection point?", options: ["Bus", "Ring", "Star", "Mesh"], correct: 2, difficulty: "easy", category: "Network Topology" },
    { question: "What is the speed of Fast Ethernet?", options: ["10 Mbps", "100 Mbps", "1000 Mbps", "10 Gbps"], correct: 1, difficulty: "easy", category: "Ethernet Standards" },
    { question: "Which protocol operates at the Application layer?", options: ["IP", "TCP", "HTTP", "Ethernet"], correct: 2, difficulty: "easy", category: "OSI Model" },
    { question: "What is a VLAN?", options: ["Virtual LAN", "Very Large Area Network", "Variable Link Access Network", "Verified Local Area Network"], correct: 0, difficulty: "easy", category: "Network Concepts" },
    { question: "Which device operates at Layer 2 of the OSI model?", options: ["Router", "Switch", "Hub", "Modem"], correct: 1, difficulty: "easy", category: "Network Devices" },
    { question: "What is the IPv6 address length?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], correct: 2, difficulty: "medium", category: "IP Addressing" },
    { question: "Which protocol provides reliable data delivery?", options: ["UDP", "ICMP", "TCP", "ARP"], correct: 2, difficulty: "easy", category: "Transport Protocols" },
    { question: "What is the maximum number of hosts in a /26 network?", options: ["32", "62", "64", "126"], correct: 1, difficulty: "hard", category: "Subnetting" },
    { question: "Which cable type uses light to transmit data?", options: ["UTP", "STP", "Fiber optic", "Coaxial"], correct: 2, difficulty: "easy", category: "Cabling" },
    { question: "What does PoE stand for?", options: ["Power over Ethernet", "Protocol over Ethernet", "Port of Entry", "Packet over Ethernet"], correct: 0, difficulty: "easy", category: "Network Technologies" },
    { question: "Which command tests connectivity to a remote host?", options: ["tracert", "ping", "netstat", "ipconfig"], correct: 1, difficulty: "easy", category: "Network Commands" },
    { question: "What is the purpose of ICMP?", options: ["Transfer files", "Error reporting", "Assign addresses", "Encrypt data"], correct: 1, difficulty: "medium", category: "Network Protocols" },
    { question: "Which port does FTP use for control?", options: ["20", "21", "22", "23"], correct: 1, difficulty: "medium", category: "Port Numbers" },
    { question: "What is a collision domain?", options: ["Network segment where collisions occur", "Security zone", "VLAN group", "Subnet"], correct: 0, difficulty: "medium", category: "Network Concepts" },
    { question: "Which wireless encryption is most secure?", options: ["WEP", "WPA", "WPA2", "WPA3"], correct: 3, difficulty: "medium", category: "Wireless Security" },
    { question: "What is the purpose of STP?", options: ["Secure transmission", "Prevent loops", "Speed up traffic", "Encrypt packets"], correct: 1, difficulty: "medium", category: "Switching" },
    { question: "Which protocol automatically assigns IP addresses?", options: ["DNS", "ARP", "DHCP", "NAT"], correct: 2, difficulty: "easy", category: "Network Services" },
    { question: "What is the MTU of Ethernet?", options: ["576 bytes", "1024 bytes", "1500 bytes", "2048 bytes"], correct: 2, difficulty: "medium", category: "Ethernet Standards" },
    { question: "Which command shows active connections on Windows?", options: ["ping", "tracert", "netstat", "nslookup"], correct: 2, difficulty: "medium", category: "Network Commands" }
  ],
  "cysa-plus": [
    // Security Operations and Monitoring
    { question: "During an incident response, which phase comes immediately after detection?", options: ["Recovery", "Analysis", "Containment", "Eradication"], correct: 2, difficulty: "easy", category: "Incident Response" },
    { question: "Which metric indicates the average time to detect a security incident?", options: ["MTTR", "MTTD", "RPO", "RTO"], correct: 1, difficulty: "medium", category: "Security Metrics" },
    { question: "What is the primary purpose of a security orchestration platform?", options: ["Replace security analysts", "Automate response to security events", "Scan for vulnerabilities", "Manage user access"], correct: 1, difficulty: "hard", category: "Security Tools" },
    { question: "What does SIEM stand for?", options: ["Security Information Event Management", "Security Information and Event Management", "System Information and Event Monitoring", "Secure Internet Event Management"], correct: 1, difficulty: "easy", category: "Security Tools" },
    { question: "Which phase of incident response involves removing the threat?", options: ["Containment", "Eradication", "Recovery", "Lessons learned"], correct: 1, difficulty: "easy", category: "Incident Response" },
    { question: "What is threat hunting?", options: ["Waiting for alerts", "Proactively searching for threats", "Installing antivirus", "Blocking all traffic"], correct: 1, difficulty: "medium", category: "Threat Intelligence" },
    { question: "Which indicator of compromise shows command and control activity?", options: ["File hash", "Network beacon", "Registry key", "User account"], correct: 1, difficulty: "medium", category: "Threat Intelligence" },
    { question: "What is the purpose of log correlation?", options: ["Delete old logs", "Identify patterns across logs", "Compress log files", "Export logs"], correct: 1, difficulty: "medium", category: "Log Analysis" },
    { question: "Which tool is used for packet analysis?", options: ["Nmap", "Wireshark", "Metasploit", "Burp Suite"], correct: 1, difficulty: "easy", category: "Security Tools" },
    { question: "What does IOC stand for?", options: ["Internet of Compromise", "Indicator of Compromise", "Internal Operations Center", "Incident Operations Command"], correct: 1, difficulty: "easy", category: "Threat Intelligence" },
    { question: "Which type of analysis examines malware in a controlled environment?", options: ["Static analysis", "Dynamic analysis", "Signature analysis", "Heuristic analysis"], correct: 1, difficulty: "medium", category: "Malware Analysis" },
    { question: "What is the purpose of a playbook in security operations?", options: ["Document policies", "Automate responses", "Store passwords", "Monitor networks"], correct: 1, difficulty: "medium", category: "Security Operations" },
    { question: "Which protocol is commonly used for log forwarding?", options: ["HTTP", "Syslog", "FTP", "SMTP"], correct: 1, difficulty: "easy", category: "Log Management" },
    { question: "What is behavioral analysis in threat detection?", options: ["Analyzing user behavior", "Checking signatures", "Scanning files", "Blocking ports"], correct: 0, difficulty: "medium", category: "Threat Detection" },
    { question: "Which framework helps categorize attacker tactics?", options: ["NIST", "MITRE ATT&CK", "ISO 27001", "COBIT"], correct: 1, difficulty: "medium", category: "Security Frameworks" },
    { question: "What is the purpose of vulnerability scanning?", options: ["Exploit systems", "Identify weaknesses", "Block attacks", "Encrypt data"], correct: 1, difficulty: "easy", category: "Vulnerability Management" },
    { question: "Which metric measures time to repair after an incident?", options: ["MTTD", "MTTR", "RTO", "RPO"], correct: 1, difficulty: "medium", category: "Security Metrics" },
    { question: "What is threat intelligence?", options: ["Antivirus software", "Information about threats", "Firewall rules", "Password policy"], correct: 1, difficulty: "easy", category: "Threat Intelligence" },
    { question: "Which analysis method examines malware without executing it?", options: ["Dynamic", "Static", "Behavioral", "Heuristic"], correct: 1, difficulty: "medium", category: "Malware Analysis" },
    { question: "What is the purpose of security baselining?", options: ["Measure normal activity", "Block all traffic", "Delete logs", "Install updates"], correct: 0, difficulty: "medium", category: "Security Operations" },
    { question: "Which tool performs vulnerability assessments?", options: ["Wireshark", "Nessus", "Metasploit", "Burp Suite"], correct: 1, difficulty: "easy", category: "Security Tools" },
    { question: "What does TTP stand for in threat analysis?", options: ["Threat Testing Protocol", "Tactics, Techniques, Procedures", "Technical Testing Platform", "Total Threat Protection"], correct: 1, difficulty: "medium", category: "Threat Intelligence" },
    { question: "Which phase comes first in incident response?", options: ["Containment", "Detection", "Preparation", "Recovery"], correct: 2, difficulty: "medium", category: "Incident Response" },
    { question: "What is the purpose of threat feeds?", options: ["Provide threat intelligence", "Block websites", "Scan emails", "Monitor users"], correct: 0, difficulty: "easy", category: "Threat Intelligence" },
    { question: "Which type of log records authentication events?", options: ["Application log", "Security log", "System log", "Network log"], correct: 1, difficulty: "easy", category: "Log Analysis" },
    { question: "What is security orchestration?", options: ["Manual processes", "Automated coordination of tools", "User training", "Policy documentation"], correct: 1, difficulty: "medium", category: "Security Operations" },
    { question: "Which metric indicates acceptable data loss?", options: ["RTO", "RPO", "MTTR", "MTTD"], correct: 1, difficulty: "medium", category: "Business Continuity" },
    { question: "What is the purpose of a SOC?", options: ["Software development", "Monitor and respond to threats", "User support", "Network installation"], correct: 1, difficulty: "easy", category: "Security Operations" },
    { question: "Which tool is used for endpoint detection and response?", options: ["IDS", "EDR", "WAF", "DLP"], correct: 1, difficulty: "medium", category: "Security Tools" },
    { question: "What is false positive in security monitoring?", options: ["Missed threat", "Legitimate activity flagged as threat", "Critical alert", "System error"], correct: 1, difficulty: "easy", category: "Security Operations" },
    { question: "Which analysis focuses on file hashes and strings?", options: ["Dynamic", "Static", "Behavioral", "Runtime"], correct: 1, difficulty: "medium", category: "Malware Analysis" },
    { question: "What is the purpose of threat modeling?", options: ["Install patches", "Identify potential threats", "Configure firewalls", "Train users"], correct: 1, difficulty: "medium", category: "Risk Management" },
    { question: "Which protocol encrypts SIEM traffic?", options: ["HTTP", "FTP", "TLS", "Telnet"], correct: 2, difficulty: "medium", category: "Security Tools" },
    { question: "What is anomaly detection?", options: ["Signature matching", "Identifying unusual behavior", "Blocking known threats", "Scanning ports"], correct: 1, difficulty: "medium", category: "Threat Detection" },
    { question: "Which framework guides cybersecurity implementation?", options: ["MITRE ATT&CK", "NIST CSF", "ISO 9001", "ITIL"], correct: 1, difficulty: "medium", category: "Security Frameworks" }
  ]
};

const Exam = () => {
  const { certId } = useParams();
  const [showSetup, setShowSetup] = useState(true);
  const [numQuestions, setNumQuestions] = useState([5]);
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  
  const allQuestions = examData[certId || "security-plus"] || examData["security-plus"];

  const startExam = () => {
    let filtered = difficulty === "all" 
      ? [...allQuestions] 
      : allQuestions.filter(q => q.difficulty === difficulty);
    
    filtered = filtered.slice(0, numQuestions[0]);
    setFilteredQuestions(filtered);
    setAnswers(new Array(filtered.length).fill(null));
    setTimeLeft(filtered.length * 120); // 2 minutes per question
    setShowSetup(false);
  };

  useEffect(() => {
    if (showSetup) {
      setAnswers([]);
      setCurrentQuestion(0);
      setShowResults(false);
    }
  }, [certId, showSetup]);

  useEffect(() => {
    if (showResults || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === filteredQuestions[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl">Exam Setup</CardTitle>
                <CardDescription>
                  Configure your practice exam before you begin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Number of Questions: {numQuestions[0]}
                    </label>
                    <Slider
                      value={numQuestions}
                      onValueChange={setNumQuestions}
                      min={5}
                      max={Math.min(100, allQuestions.length)}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Maximum: {allQuestions.length} questions available
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Difficulty Level
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={difficulty === "all" ? "default" : "outline"}
                        onClick={() => setDifficulty("all")}
                        className="h-auto py-4"
                      >
                        <div>
                          <div className="font-semibold">All Levels</div>
                          <div className="text-xs opacity-80">Mixed difficulty</div>
                        </div>
                      </Button>
                      <Button
                        variant={difficulty === "easy" ? "default" : "outline"}
                        onClick={() => setDifficulty("easy")}
                        className="h-auto py-4"
                      >
                        <div>
                          <div className="font-semibold">Easy</div>
                          <div className="text-xs opacity-80">Foundation level</div>
                        </div>
                      </Button>
                      <Button
                        variant={difficulty === "medium" ? "default" : "outline"}
                        onClick={() => setDifficulty("medium")}
                        className="h-auto py-4"
                      >
                        <div>
                          <div className="font-semibold">Medium</div>
                          <div className="text-xs opacity-80">Intermediate</div>
                        </div>
                      </Button>
                      <Button
                        variant={difficulty === "hard" ? "default" : "outline"}
                        onClick={() => setDifficulty("hard")}
                        className="h-auto py-4"
                      >
                        <div>
                          <div className="font-semibold">Hard</div>
                          <div className="text-xs opacity-80">Advanced level</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2">Exam Details</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Questions: {numQuestions[0]}</li>
                      <li>• Time limit: {numQuestions[0] * 2} minutes</li>
                      <li>• Passing score: 70%</li>
                      <li>• Difficulty: {difficulty === "all" ? "Mixed" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link to="/certifications" className="flex-1">
                      <Button variant="outline" className="w-full">Cancel</Button>
                    </Link>
                    <Button 
                      onClick={startExam}
                      className="flex-1 bg-gradient-to-r from-primary to-accent"
                    >
                      Start Exam
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / filteredQuestions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Exam Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>
                    {percentage.toFixed(0)}%
                  </div>
                  <div className={`text-2xl font-semibold ${passed ? 'text-green-500' : 'text-red-500'}`}>
                    {passed ? 'PASSED' : 'FAILED'}
                  </div>
                  <p className="text-xl mt-4">
                    {score} correct out of {filteredQuestions.length} questions
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Passing score: 70%
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  {filteredQuestions.map((q, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === q.correct;
                    
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-2">Question {index + 1}</p>
                            <p className="text-sm text-muted-foreground mb-2">{q.question}</p>
                            {!isCorrect && (
                              <p className="text-sm text-green-600">
                                Correct answer: {q.options[q.correct]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 justify-center pt-4">
                  <Link to="/certifications">
                    <Button size="lg">Back to Certifications</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;
  const question = filteredQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">Practice Exam</h1>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>
            </div>
            <p className="text-muted-foreground">Complete all questions to see your results</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {filteredQuestions.length}
              </span>
              <span className="text-sm font-medium">
                {answers.filter(a => a !== null).length} answered
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-2 mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start text-left h-auto py-4 px-6 text-base ${
                    answers[currentQuestion] === index ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {currentQuestion < filteredQuestions.length - 1 ? (
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                  Next Question
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  Submit Exam
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
