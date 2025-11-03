import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Network, Search } from "lucide-react";
import Navbar from "@/components/Navbar";

const Certifications = () => {
  const certifications = [
    {
      id: "security-plus",
      name: "CompTIA Security+",
      icon: Shield,
      description: "Master cybersecurity fundamentals and best practices",
      topics: 320,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "network-plus",
      name: "CompTIA Network+",
      icon: Network,
      description: "Learn networking concepts and infrastructure",
      topics: 285,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "cysa-plus",
      name: "CompTIA CySA+",
      icon: Search,
      description: "Develop cybersecurity analyst skills and techniques",
      topics: 298,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Certification</h1>
            <p className="text-xl text-muted-foreground">
              Select a certification to begin your study journey
            </p>
          </div>

          <div className="grid gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
                        <cert.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{cert.name}</CardTitle>
                        <CardDescription className="text-base">{cert.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {cert.topics} study topics available
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/study/${cert.id}/flashcards`}>
                        <Button>Flashcards</Button>
                      </Link>
                      <Link to={`/study/${cert.id}/quiz`}>
                        <Button variant="outline">Quiz</Button>
                      </Link>
                      <Link to={`/study/${cert.id}/exam`}>
                        <Button variant="outline">Practice Exam</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
