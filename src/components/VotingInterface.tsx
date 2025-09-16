import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Users, Clock, Lock, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useConnect } from 'wagmi';
import { useCastVote, useStudentInfo } from "@/hooks/useContract";
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface Candidate {
  id: string;
  name: string;
  position: string;
  votes: number;
}

interface Election {
  id: string;
  title: string;
  description: string;
  endDate: string;
  totalVotes: number;
  candidates: Candidate[];
  userHasVoted: boolean;
}

const mockElections: Election[] = [
  {
    id: "1",
    title: "Student Body President",
    description: "Lead the student government and represent all students",
    endDate: "2024-12-20",
    totalVotes: 1247,
    userHasVoted: false,
    candidates: [
      { id: "1", name: "Alex Chen", position: "Junior, Computer Science", votes: 567 },
      { id: "2", name: "Sarah Williams", position: "Senior, Political Science", votes: 432 },
      { id: "3", name: "Marcus Johnson", position: "Junior, Business Administration", votes: 248 }
    ]
  },
  {
    id: "2", 
    title: "Student Activities Board Chair",
    description: "Organize campus events and student activities",
    endDate: "2024-12-22",
    totalVotes: 892,
    userHasVoted: true,
    candidates: [
      { id: "4", name: "Emma Davis", position: "Sophomore, Communications", votes: 445 },
      { id: "5", name: "Ryan Park", position: "Junior, Art & Design", votes: 447 }
    ]
  }
];

const VotingInterface = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { castVote, isLoading: isVoting } = useCastVote();
  const { studentInfo, isLoading: isLoadingStudent } = useStudentInfo();

  const handleVote = (electionId: string, candidateId: string) => {
    setSelectedCandidates(prev => ({
      ...prev,
      [electionId]: candidateId
    }));
  };

  const submitVote = async (electionId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to vote.",
        variant: "destructive",
      });
      return;
    }

    if (!studentInfo?.isVerified) {
      toast({
        title: "Student Not Verified",
        description: "Please register and verify your student status first.",
        variant: "destructive",
      });
      return;
    }

    if (studentInfo?.hasVoted) {
      toast({
        title: "Already Voted",
        description: "You have already voted in this election.",
        variant: "destructive",
      });
      return;
    }

    try {
      const candidateId = selectedCandidates[electionId];
      if (!candidateId) {
        toast({
          title: "No Candidate Selected",
          description: "Please select a candidate before voting.",
          variant: "destructive",
        });
        return;
      }

      await castVote(parseInt(electionId), parseInt(candidateId));
      
      toast({
        title: "Vote Submitted Successfully",
        description: "Your encrypted ballot has been recorded anonymously on the blockchain.",
      });
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast({
        title: "Vote Failed",
        description: "There was an error submitting your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Active Elections</h2>
            <p className="text-muted-foreground">
              Your vote is encrypted and anonymous. All ballots are secured using FHE and blockchain technology.
            </p>
          </div>
          <ConnectButton />
        </div>
        
        {isConnected && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4" />
              <span>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
              {studentInfo?.isVerified && (
                <Badge variant="secondary" className="ml-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Student
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {mockElections.map((election) => (
          <Card key={election.id} className="shadow-soft hover:shadow-secure transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{election.title}</CardTitle>
                  <CardDescription className="mt-1">{election.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {election.userHasVoted && (
                    <Badge variant="secondary" className="bg-campus-accent text-accent-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Voted
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Ends {formatDate(election.endDate)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {election.totalVotes.toLocaleString()} votes
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  End-to-end encrypted
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {election.candidates.map((candidate) => {
                  const votePercentage = (candidate.votes / election.totalVotes) * 100;
                  const isSelected = selectedCandidates[election.id] === candidate.id;
                  
                  return (
                    <div
                      key={candidate.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        election.userHasVoted
                          ? "bg-muted/50"
                          : isSelected
                          ? "border-primary bg-primary/5 shadow-glow"
                          : "hover:border-primary/50 hover:bg-primary/2"
                      }`}
                      onClick={() => !election.userHasVoted && handleVote(election.id, candidate.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.position}</p>
                        </div>
                        {election.userHasVoted && (
                          <div className="text-right">
                            <div className="text-sm font-medium">{candidate.votes} votes</div>
                            <div className="text-xs text-muted-foreground">{votePercentage.toFixed(1)}%</div>
                          </div>
                        )}
                      </div>
                      
                      {election.userHasVoted && (
                        <Progress value={votePercentage} className="h-2" />
                      )}
                    </div>
                  );
                })}

                {!election.userHasVoted && (
                  <div className="pt-4 border-t">
                    <Button
                      variant={selectedCandidates[election.id] ? "default" : "secondary"}
                      className="w-full"
                      disabled={!selectedCandidates[election.id] || isVoting || !isConnected}
                      onClick={() => submitVote(election.id)}
                    >
                      {isVoting ? "Submitting Vote..." : 
                       !isConnected ? "Connect Wallet to Vote" :
                       selectedCandidates[election.id] ? "Submit Encrypted Vote" : "Select a Candidate"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VotingInterface;