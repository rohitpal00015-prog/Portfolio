import React from 'react';

export default function RouteSkeleton() {
  return (
    <div className="route-skeleton" aria-busy="true" aria-label="Loading content...">
      <div className="container route-skeleton__inner">
        {/* Subtle Tech Status Bar */}
        <div className="skeleton__status">
          <span className="skeleton__pulse-dot" />
          <span className="skeleton__status-text">INITIALIZING DOSSIER &middot; PREVIEWING STREAM</span>
          <div className="skeleton__status-line" />
        </div>

        {/* Hero / Header Skeleton */}
        <div className="skeleton__head">
          <div className="skeleton-pill skeleton-pill--eyebrow skeleton-shimmer" />
          <div className="skeleton-bar skeleton-bar--h1 skeleton-shimmer" />
          <div className="skeleton-bar skeleton-bar--h2 skeleton-shimmer" />
          <div className="skeleton__lede">
            <div className="skeleton-bar skeleton-bar--p1 skeleton-shimmer" />
            <div className="skeleton-bar skeleton-bar--p2 skeleton-shimmer" />
          </div>
          <div className="skeleton__tags">
            <span className="skeleton-pill skeleton-shimmer" />
            <span className="skeleton-pill skeleton-shimmer" />
            <span className="skeleton-pill skeleton-shimmer" />
            <span className="skeleton-pill skeleton-shimmer" />
          </div>
        </div>

        {/* StatStrip Skeleton */}
        <div className="skeleton__statstrip">
          {[1, 2, 3, 4].map((i) => (
            <div className="skeleton__stat-card" key={i}>
              <div className="skeleton-bar skeleton-bar--num skeleton-shimmer" />
              <div className="skeleton-bar skeleton-bar--label skeleton-shimmer" />
            </div>
          ))}
        </div>

        {/* Content Section Skeleton */}
        <div className="skeleton__body">
          <div className="skeleton__nav">
            <span className="skeleton-pill skeleton-pill--active skeleton-shimmer" />
            <span className="skeleton-pill skeleton-shimmer" />
            <span className="skeleton-pill skeleton-shimmer" />
          </div>

          <div className="skeleton__grid">
            {[1, 2, 3].map((card) => (
              <div className="skeleton__card" key={card}>
                <div className="skeleton__card-top">
                  <span className="skeleton-bar skeleton-bar--index skeleton-shimmer" />
                  <span className="skeleton-bar skeleton-bar--tag skeleton-shimmer" />
                </div>
                <div className="skeleton-bar skeleton-bar--card-title skeleton-shimmer" />
                <div className="skeleton-bar skeleton-bar--card-line skeleton-shimmer" />
                <div className="skeleton-bar skeleton-bar--card-line skeleton-bar--short skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
