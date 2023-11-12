import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Nav from "./components/Nav/page";
import "./globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="" lang="en">
      <body className="container-fluid">
        <div className="row">
          <div className="col-md-2 col-4">
            <Nav />
          </div>
          <div className="col-md-10  col-8">
            {children}

          </div>
        </div>
      </body>
    </html>
  );
}
