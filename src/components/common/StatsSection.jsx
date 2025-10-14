const StatsSection = () => {
    const stats = [
      { number: "10K+", label: "Historical Artifacts" },
      { number: "50K+", label: "Registered Bidders" },
      { number: "100%", label: "Authenticity Guaranteed" },
      { number: "4.9★", label: "Customer Rating" }
    ];
  
    return (
      <section className="py-16 bg-amber-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-amber-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default StatsSection;