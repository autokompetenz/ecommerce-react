import Breadcrumb from "../components/Breadcrumb";
import { blogPosts } from "../data/products";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <>
      <Breadcrumb title="Fashion Blog" backgroundImage="/img/bg-img/breadcumb2.jpg" style2 />

      <div className="blog-wrapper section-padding-80">
        <div className="container">
          <div className="row">
            {blogPosts.map((post) => (
              <div className="col-12 col-lg-6" key={post.id}>
                <div className="single-blog-area mb-50">
                  <img src={post.image} alt="" />
                  <div className="post-title">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </div>
                  <div className="hover-content">
                    <div className="hover-post-title">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </div>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`}>Continue reading <i className="fa fa-angle-right"></i></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
