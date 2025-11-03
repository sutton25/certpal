import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, FileCheck, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Flashcards",
      description: "Master concepts with our smart flashcard system featuring spaced repetition."
    },
    {
      icon: Brain,
      title: "Mini Quizzes",
      description: "Test your knowledge with quick quizzes after each study session."
    },
    {
      icon: FileCheck,
      title: "Full Practice Exams",
      description: "Simulate real exam conditions with timed practice tests."
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your improvement and identify areas that need more focus."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="IT Certification Study" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Master IT Certifications
            </h1>
            <p className="text-xl text-muted-foreground">
              Your complete study companion for Security+, Network+, and CySA+ certifications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/certifications">
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  Start Studying
                </Button>
              </Link>
              <Link to="/certifications">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Certifications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground text-lg">Comprehensive tools designed for effective learning</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Certified?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of IT professionals who have successfully passed their certification exams with CertPal
            </p>
            <Link to="/certifications">
              <Button size="lg" className="text-lg px-12">
                Get Started Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
