const Loader = () => {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  };
  
  export default Loader;
  