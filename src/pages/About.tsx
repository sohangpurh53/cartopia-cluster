const About = () => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Welcome to our store! We are dedicated to providing high-quality products and exceptional customer service.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide our customers with the best shopping experience possible, offering quality products at competitive prices.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              To become the most trusted online marketplace, known for our quality, service, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;