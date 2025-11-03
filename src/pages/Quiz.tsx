import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const quizData: Record<string, any[]> = {
  "security-plus": [
    {
      question: "Which of the following is NOT a type of malware?",
      options: ["Trojan", "Virus", "Firewall", "Ransomware"],
      correct: 2
    },
    {
      question: "What does SSL stand for?",
      options: ["Secure Socket Layer", "System Security Layer", "Safe Server Link", "Secure System Login"],
      correct: 0
    },
    {
      question: "Which authentication factor is 'something you know'?",
      options: ["Fingerprint", "Password", "Smart card", "Retina scan"],
      correct: 1
    },
    {
      question: "What is the primary purpose of encryption?",
      options: ["Compress data", "Ensure confidentiality", "Improve speed", "Reduce storage"],
      correct: 1
    },
    {
      question: "Which protocol is used for secure email transmission?",
      options: ["HTTP", "FTP", "S/MIME", "SMTP"],
      correct: 2
    }
  ],
  "network-plus": [
    {
      question: "What layer of the OSI model does a router operate at?",
      options: ["Physical", "Data Link", "Network", "Transport"],
      correct: 2
    },
    {
      question: "What is the default subnet mask for a Class C network?",
      options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
      correct: 2
    },
    {
      question: "Which port does HTTP use by default?",
      options: ["21", "22", "80", "443"],
      correct: 2
    },
    {
      question: "What does NAT stand for?",
      options: ["Network Address Translation", "Network Access Technology", "Node Address Transfer", "Network Authentication Token"],
      correct: 0
    },
    {
      question: "Which topology connects all devices to a central hub?",
      options: ["Ring", "Star", "Mesh", "Bus"],
      correct: 1
    }
  ],
  "cysa-plus": [
    {
      question: "What is the first phase of the incident response lifecycle?",
      options: ["Detection", "Preparation", "Containment", "Recovery"],
      correct: 1
    },
    {
      question: "Which tool is primarily used for network traffic analysis?",
      options: ["Nmap", "Wireshark", "Metasploit", "Burp Suite"],
      correct: 1
    },
    {
      question: "What does IOC stand for in cybersecurity?",
      options: ["Internet of Computers", "Indicator of Compromise", "Internal Operations Center", "Integrated Operations Control"],
      correct: 1
    },
    {
      question: "Which type of testing simulates an attack with full knowledge?",
      options: ["Black box", "White box", "Gray box", "Red box"],
      correct: 1
    },
    {
      question: "What is the purpose of threat hunting?",
      options: ["Wait for alerts", "Proactively search for threats", "Install antivirus", "Configure firewalls"],
      correct: 1
    }
  ]
};

const Quiz = () => {
  const { certId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  
  const questions = quizData[certId || "security-plus"] || quizData["security-plus"];
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === question.correct) {
      setScore(score + 1);
      toast.success("Correct!");
    } else {
      toast.error("Incorrect!");
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Quiz Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-bold text-primary">
                  {percentage.toFixed(0)}%
                </div>
                <p className="text-2xl">
                  You scored {score} out of {questions.length}
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button onClick={handleReset} size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Retry Quiz
                  </Button>
                  <Link to="/certifications">
                    <Button variant="outline" size="lg">
                      Back to Certifications
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-2">Mini Quiz</h1>
            <p className="text-muted-foreground">Test your knowledge with quick questions</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium">
                Score: {score}/{questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-2 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showCorrect = answered && isCorrect;
                const showIncorrect = answered && isSelected && !isCorrect;

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-4 px-6 text-base ${
                      showCorrect ? 'border-green-500 bg-green-500/10' :
                      showIncorrect ? 'border-red-500 bg-red-500/10' :
                      isSelected ? 'border-primary' : ''
                    }`}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    <span className="flex items-center gap-3 flex-1">
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {showIncorrect && <XCircle className="h-5 w-5 text-red-500" />}
                      {option}
                    </span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              onClick={handleNext}
              disabled={!answered}
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
