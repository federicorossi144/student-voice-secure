import Header from "@/components/Header";
import VotingInterface from "@/components/VotingInterface";
import heroImage from "@/assets/voting-hero.jpg";
import { Shield, Lock, Users, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-trust-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="University campus voting illustration"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Student Voices, Private Ballots
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Participate in secure, encrypted university elections. Your vote matters, and your privacy is protected.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6">
                <Shield className="h-8 w-8 text-primary-foreground mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">End-to-End Encrypted</h3>
                <p className="text-primary-foreground/80 text-sm">Your ballot is encrypted before transmission and remains anonymous throughout the process.</p>
              </div>
              
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6">
                <Lock className="h-8 w-8 text-primary-foreground mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">Blockchain Secured</h3>
                <p className="text-primary-foreground/80 text-sm">All votes are recorded on an immutable blockchain ledger for maximum transparency.</p>
              </div>
              
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-8 w-8 text-primary-foreground mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">Student Verified</h3>
                <p className="text-primary-foreground/80 text-sm">Only verified students can vote, ensuring fair and legitimate elections.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Interface */}
      <VotingInterface />
      
      {/* Footer */}
      <footer className="bg-security-gradient border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Powered by secure blockchain technology</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
