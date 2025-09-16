import Header from "@/components/Header";
import VotingInterface from "@/components/VotingInterface";
import { Vote, Shield, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Elections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Elections Overview */}
      <section className="bg-trust-gradient py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              University Elections
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Participate in democratic decision-making with secure, anonymous voting
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
                <CardHeader className="pb-2">
                  <Vote className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                  <CardTitle className="text-lg text-primary-foreground">Active Elections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary-foreground">2</div>
                  <p className="text-sm text-primary-foreground/80">Currently open for voting</p>
                </CardContent>
              </Card>
              
              <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                  <CardTitle className="text-lg text-primary-foreground">Total Voters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary-foreground">2,139</div>
                  <p className="text-sm text-primary-foreground/80">Registered students</p>
                </CardContent>
              </Card>
              
              <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
                <CardHeader className="pb-2">
                  <TrendingUp className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                  <CardTitle className="text-lg text-primary-foreground">Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary-foreground">67%</div>
                  <p className="text-sm text-primary-foreground/80">Turnout rate</p>
                </CardContent>
              </Card>
              
              <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
                <CardHeader className="pb-2">
                  <Shield className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                  <CardTitle className="text-lg text-primary-foreground">Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary-foreground">100%</div>
                  <p className="text-sm text-primary-foreground/80">Encrypted votes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Interface */}
      <VotingInterface />
    </div>
  );
};

export default Elections;