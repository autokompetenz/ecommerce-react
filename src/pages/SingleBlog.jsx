import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { blogPosts as posts } from "../data/products";

export default function SingleBlog() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="empty-state">
        <i className="fa-solid fa-newspaper"></i>
        <p>Article non trouvé.</p>
        <Link to="/blog" className="btn btn-brand" style={{ marginTop: 16 }}>Retour au blog</Link>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb title={post.title} links={[{ to: "/blog", label: "Blog" }, { label: post.title }]} />
      <div className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="blog-card-date" style={{ marginBottom: 12 }}>
            <i className="fa-regular fa-calendar" style={{ marginRight: 6 }}></i>
            {post.date}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>{post.title}</h1>
          {post.image && (
            <img src={post.image} alt={post.title} style={{ width: "100%", borderRadius: "var(--radius-lg)", marginBottom: 32, maxHeight: 400, objectFit: "cover" }} />
          )}
          <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-sec)" }}>
            {post.content || post.excerpt || "Contenu de l'article à venir..."}
          </div>
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            <Link to="/blog" className="btn btn-outline">
              <i className="fa-solid fa-arrow-left"></i> Retour au blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
