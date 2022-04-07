import InputSection from "./InputSection";

const HeroSection = ({ dataTrip }) => (
  <div className="hero text-white">
    <div className="section-heading__hero">
      <h1 className="text-heading">Explore</h1>
      <h2 className="text-subheading">your amazing city together</h2>
    </div>

    <InputSection dataTrip={dataTrip} />
  </div>
);

export default HeroSection;
