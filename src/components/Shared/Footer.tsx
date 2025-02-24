import { Bike } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const sections = [
  {
    title: "Shop",
    links: [
      { name: "Bicycles", href: "#" },
      { name: "Accessories", href: "#" },
      { name: "Parts", href: "#" },
      { name: "E-Bikes", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "#" },
      { name: "Shipping & Returns", href: "#" },
      { name: "Warranty", href: "#" },
      { name: "FAQs", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <section className="py-20 bg-gray-100 border-t border-gray-300">
      <div className="container px-6 mx-auto">
        <footer>
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex flex-col items-center justify-between w-full gap-6 max-w-96 shrink lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <div className="flex items-center gap-2">
                    <Bike
                      size={56}
                      className="p-2 text-white rounded-lg bg-slate-900"
                    />
                    <span className="pl-2 text-4xl font-black text-zinc-900">
                      Spinzo
                    </span>
                  </div>
                </span>
                <p className="mt-6 text-sm text-gray-600">
                  Your go-to destination for high-quality bicycles, accessories,
                  and expert service. Ride with confidence!
                </p>
              </div>
              <ul className="flex items-center space-x-6 text-gray-600">
                <li className="hover:text-primary">
                  <a href="#">
                    <FaInstagram className="size-6" />
                  </a>
                </li>
                <li className="hover:text-primary">
                  <a href="#">
                    <FaFacebook className="size-6" />
                  </a>
                </li>
                <li className="hover:text-primary">
                  <a href="#">
                    <FaTwitter className="size-6" />
                  </a>
                </li>
                <li className="hover:text-primary">
                  <a href="#">
                    <FaLinkedin className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections.map((section, index) => (
                <div key={index}>
                  <h3 className="mb-6 font-bold text-zinc-900">
                    {section.title}
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-600">
                    {section.links.map((link, idx) => (
                      <li key={idx} className="hover:text-primary">
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-8 mt-16 text-sm font-medium text-center text-gray-600 border-t lg:flex-row lg:items-center lg:text-left">
            <p>© 2024 Spinzo. All rights reserved.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="hover:text-primary">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
