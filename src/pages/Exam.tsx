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
    {
      question: "An organization wants to implement a security control that will protect against unauthorized physical access. Which of the following would be MOST effective?",
      options: [
        "Biometric authentication system",
        "Password complexity requirements",
        "Intrusion detection system",
        "Data loss prevention software"
      ],
      correct: 0,
      difficulty: "easy"
    },
    {
      question: "A security analyst discovers that an attacker has been using stolen credentials. Which type of attack is this?",
      options: [
        "Man-in-the-middle",
        "Credential harvesting",
        "SQL injection",
        "Cross-site scripting"
      ],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which of the following BEST describes defense in depth?",
      options: [
        "Using a single strong security control",
        "Implementing multiple layers of security controls",
        "Focusing only on perimeter security",
        "Relying on endpoint protection only"
      ],
      correct: 1,
      difficulty: "hard"
    }
  ],
  "network-plus": [
    {
      question: "A network administrator needs to segment a network to improve performance and security. Which device should be used?",
      options: [
        "Hub",
        "Repeater",
        "Switch with VLANs",
        "Bridge"
      ],
      correct: 2,
      difficulty: "easy"
    },
    {
      question: "Which routing protocol is considered a distance-vector protocol?",
      options: [
        "OSPF",
        "BGP",
        "RIP",
        "IS-IS"
      ],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "What is the purpose of QoS in a network?",
      options: [
        "Increase bandwidth",
        "Prioritize traffic types",
        "Encrypt data",
        "Authenticate users"
      ],
      correct: 1,
      difficulty: "hard"
    }
  ],
  "cysa-plus": [
    {
      question: "During an incident response, which phase comes immediately after detection?",
      options: [
        "Recovery",
        "Analysis",
        "Containment",
        "Eradication"
      ],
      correct: 2,
      difficulty: "easy"
    },
    {
      question: "Which metric indicates the average time to detect a security incident?",
      options: [
        "MTTR",
        "MTTD",
        "RPO",
        "RTO"
      ],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "What is the primary purpose of a security orchestration platform?",
      options: [
        "Replace security analysts",
        "Automate response to security events",
        "Scan for vulnerabilities",
        "Manage user access"
      ],
      correct: 1,
      difficulty: "hard"
    }
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
                      min={3}
                      max={allQuestions.length}
                      step={1}
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
