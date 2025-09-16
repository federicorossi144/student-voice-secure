import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, GraduationCap, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from 'wagmi';
import { useRegisterStudent, useStudentInfo } from "@/hooks/useContract";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const StudentRegistration = () => {
  const [university, setUniversity] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentIdHash, setStudentIdHash] = useState("");
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { registerStudent, isLoading } = useRegisterStudent();
  const { studentInfo, isLoading: isLoadingStudent } = useStudentInfo();

  const generateHash = (input: string) => {
    // Simple hash function for demo purposes
    // In production, use a proper cryptographic hash
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  };

  const handleStudentIdChange = (value: string) => {
    setStudentId(value);
    if (value) {
      setStudentIdHash(generateHash(value));
    } else {
      setStudentIdHash("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to register.",
        variant: "destructive",
      });
      return;
    }

    if (!university || !studentId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await registerStudent({
        args: [university, studentIdHash],
      });
      
      toast({
        title: "Registration Submitted",
        description: "Your student registration has been submitted for verification.",
      });
      
      // Reset form
      setUniversity("");
      setStudentId("");
      setStudentIdHash("");
    } catch (error) {
      console.error('Error registering student:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoadingStudent) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">Loading student information...</div>
        </CardContent>
      </Card>
    );
  }

  if (studentInfo?.university) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Status
          </CardTitle>
          <CardDescription>
            Your student registration information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">University</p>
              <p className="text-sm text-muted-foreground">{studentInfo.university}</p>
            </div>
            <Badge variant={studentInfo.isVerified ? "default" : "secondary"}>
              {studentInfo.isVerified ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </>
              ) : (
                "Pending Verification"
              )}
            </Badge>
          </div>
          
          <div>
            <p className="font-medium">Student ID Hash</p>
            <p className="text-sm text-muted-foreground font-mono">{studentInfo.studentIdHash}</p>
          </div>
          
          <div>
            <p className="font-medium">Voting Status</p>
            <p className="text-sm text-muted-foreground">
              {studentInfo.hasVoted ? "Has voted" : "Has not voted"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Student Registration
        </CardTitle>
        <CardDescription>
          Register as a verified student to participate in elections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ConnectButton />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="university">University *</Label>
            <Input
              id="university"
              placeholder="Enter your university name"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID *</Label>
            <Input
              id="studentId"
              placeholder="Enter your student ID"
              value={studentId}
              onChange={(e) => handleStudentIdChange(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Your student ID will be hashed for privacy
            </p>
          </div>
          
          {studentIdHash && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Generated Hash
              </Label>
              <div className="p-3 bg-muted rounded-md">
                <code className="text-sm">{studentIdHash}</code>
              </div>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isConnected || !university || !studentId || isLoading}
          >
            {isLoading ? "Registering..." : "Register as Student"}
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Privacy Notice</h4>
          <p className="text-sm text-muted-foreground">
            Your student ID is hashed locally before being sent to the blockchain. 
            Only the hash is stored on-chain, ensuring your personal information remains private.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentRegistration;
