import Header from "@/components/Header";
import StudentRegistration from "@/components/StudentRegistration";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Student Registration
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Register as a verified student to participate in secure, encrypted university elections.
            </p>
          </div>
          
          <StudentRegistration />
        </div>
      </div>
    </div>
  );
};

export default Register;
