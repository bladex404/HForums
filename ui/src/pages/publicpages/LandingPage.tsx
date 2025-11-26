import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const LandingPage = () => {
  return (
    <div className="layout">
      <Container>
        <div>
          <Navbar />
          <Hero />
        </div>
      </Container>
    </div>
  );
};
export default LandingPage;
