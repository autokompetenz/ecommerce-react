export default function Breadcrumb({ title, backgroundImage = "/img/bg-img/breadcumb.jpg", style2 = false }) {
  return (
    <div className={`breadcumb_area bg-img ${style2 ? "breadcumb-style-two" : ""}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <div className="page-title text-center">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
