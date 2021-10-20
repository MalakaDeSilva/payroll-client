import React from "react";
import { Layout } from "antd";
import facebook from "../assets/facebook.png";
import instagram  from "../assets/instagram.png";
import whatsapp  from "../assets/whatsapp.png";
import twitter  from "../assets/twitter.png";

function Footer(props) {
  const { Footer } = Layout;

  return (
    <div>
      <Layout>
        <Footer className="footer">
          <section>LFAM Designs ©2021Created by Team Picaroon</section>
          LFAM Designs ©2021Created by Team Picaroon
          <div className="footerImageContainer">
            <img src={facebook} alt="FaceBook" className="footerImages" />
            <img src={instagram} alt="instagram" className="footerImages" />
            <img src={whatsapp} alt="whatsapp" className="footerImages" />
            <img src={twitter} alt="twitter" className="footerImages" />
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default Footer;
