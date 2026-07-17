import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { blogPosts as posts } from "../data/products";

export default function Blog() {
  return (
    <>
      <Breadcrumb title="Actualités" links={[{ label: "Blog" }]} />
      <div className="section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="blog-card" style={{ textDecoration: "none" }}>
                  <div className="blog-card-img">
                    <img src={post.image || "/img/bg-img/blog1.jpg"} alt={post.title} />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-date">
                      <i className="fa-regular fa-calendar" style={{ marginRight: 6 }}></i>
                      {post.date}
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-newspaper"></i>
              <p>Aucun article pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
