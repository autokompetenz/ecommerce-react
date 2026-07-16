import { Link } from "react-router-dom";

export default function SingleBlog() {
  return (
    <div className="single-blog-wrapper">
      {/* Thumbnail */}
      <div className="single-blog-post-thumb">
        <img src="/img/bg-img/bg-7.jpg" alt="" />
      </div>

      {/* Content */}
      <div className="single-blog-content-wrapper d-flex">
        <div className="single-blog--text">
          <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis perferendis rem accusantium ducimus animi nesciunt expedita omnis aut quas molestias!</h2>
          <p>Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin. Praesent at tempus lectus, eleifend blandit felis. Fusce augue arcu, consequat a nisl aliquet, consectetur elementum turpis. Donec iaculis lobortis nisl, et viverra risus imperdiet eu. Etiam mollis posuere elit non sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis arcu a magna sodales venenatis. Integer non diam sit amet magna luctus mollis ac eu nisi. In accumsan tellus ut dapibus blandit.</p>

          <blockquote>
            <h6><i className="fa fa-quote-left" aria-hidden="true"></i> Quisque sagittis non ex eget vestibulum. Sed nec ultrices dui. Cras et sagittis erat. Maecenas pulvinar, turpis in dictum tincidunt, dolor nibh lacinia lacus.</h6>
            <span>Liam Neeson</span>
          </blockquote>

          <p>Praesent ac magna sed massa euismod congue vitae vitae risus. Nulla lorem augue, mollis non est et, eleifend elementum ante. Nunc id pharetra magna. Praesent vel orci ornare, blandit mi sed, aliquet nisi.</p>
        </div>

        {/* Related Posts */}
        <div className="related-blog-post">
          {[
            { img: "/img/bg-img/rp1.jpg", title: "Cras lobortis nisl nec libero pulvinar lacinia. Nunc sed ullamcorper massa" },
            { img: "/img/bg-img/rp2.jpg", title: "Fusce tincidunt nulla magna, ac euismod quam viverra id. Fusce eget metus feugiat" },
            { img: "/img/bg-img/rp3.jpg", title: "Etiam leo nibh, consectetur nec orci et, tempus tempus ex" },
            { img: "/img/bg-img/rp4.jpg", title: "Sed viverra pellentesque dictum. Aenean ligula justo, viverra in lacus porttitor" },
          ].map((rp, i) => (
            <div className="single-related-blog-post" key={i}>
              <img src={rp.img} alt="" />
              <Link to="/blog/1"><h5>{rp.title}</h5></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
