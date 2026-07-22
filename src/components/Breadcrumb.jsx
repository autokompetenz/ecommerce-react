import { Link } from "react-router-dom";

export default function Breadcrumb({ title, links = [] }) {
  return (
    <div className="breadcrumb-banner">
      <div className="container">
        <h2>{title}</h2>
        {links.length > 0 && (
          <div className="breadcrumb-links">
            <Link to="/">Startseite</Link>
            {links.map((link, i) => (
              <span key={i}>
                <span>/</span>
                {link.to ? <Link to={link.to}>{link.label}</Link> : <span>{link.label}</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
