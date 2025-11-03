import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { Trophy, Target, Clock, TrendingUp } from "lucide-react";

const ProgressPage = () => {
  const stats = [
    {
      icon: Trophy,
      label: "Total Score",
      value: "78%",
      subtitle: "Average across all certs"
    },
    {
      icon: Target,
      label: "Questions Answered",
      value: "324",
      subtitle: "Out of 903 total"
    },
    {
      icon: Clock,
      label: "Study Time",
      value: "12.5h",
      subtitle: "This week"
    },
    {
      icon: TrendingUp,
      label: "Improvement",
      value: "+15%",
      subtitle: "Since last week"
    }
  ];

  const certProgress = [
    { name: "Security+", progress: 65, score: 75, color: "from-blue-500 to-cyan-500" },
    { name: "Network+", progress: 45, score: 82, color: "from-green-500 to-emerald-500" },
    { name: "CySA+", progress: 30, score: 70, color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Progress</h1>
            <p className="text-muted-foreground text-lg">Track your learning journey and achievements</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certification Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Certification Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {certProgress.map((cert, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Latest exam score: {cert.score}%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{cert.progress}%</div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>
                  <Progress value={cert.progress} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Completed Security+ Quiz", time: "2 hours ago", score: "85%" },
                  { action: "Studied Network+ Flashcards", time: "5 hours ago", score: "20 cards" },
                  { action: "Completed CySA+ Practice Exam", time: "1 day ago", score: "70%" },
                  { action: "Studied Security+ Flashcards", time: "2 days ago", score: "15 cards" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="text-sm font-semibold">{activity.score}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
