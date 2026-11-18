export function HomeSkeleton() {
  return (
    <div className="home" data-ready="false" aria-busy="true">
      <p className="sr-only" role="status">
        Loading the Finlete homepage
      </p>
      <header className="site-header">
        <div className="wrap header-bar">
          <div className="skel skel-logo" />
        </div>
      </header>
      <div className="wrap skeleton" aria-hidden="true">
        <div className="skel skel-line" style={{ width: "46%" }} />
        <div className="skel skel-title" />
        <div className="skel skel-line" />
        <div className="skel skel-line" style={{ width: "82%" }} />
        <div className="skel skel-btn" />
        <div className="skel skel-card" />
      </div>
    </div>
  );
}
