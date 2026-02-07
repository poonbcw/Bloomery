import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import shopfrontImg from "../assets/homepage/shopfront.png";
import flowersImg1 from "../assets/homepage/flowersv1.png";
import flowersImg2 from "../assets/homepage/flowersv2.png";
import potImg from "../assets/homepage/pots.png";

export default function HomePage() {
  const [showV2, setShowV2] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowV2((prev) => !prev); 
    }, 500); 

    return () => clearInterval(interval); // ล้าง Timer เมื่อปิดหน้านี้
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#F3EBD8",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* รูปที่ 1 - ชั้นล่างสุด */}
      <img
        src={shopfrontImg}
        alt="Shopfront"
        style={{
          position: "absolute",
          height: "100vh",
          width: "auto",
          objectFit: "contain",
          zIndex: 1,
        }}
      />
      
      {/* รูปที่ 2 - ชั้นกลาง */}
      <img
        src={showV2 ? flowersImg2 : flowersImg1} // ถ้า showV2 เป็น true ใช้ v2 ถ้าไม่ใช่ใช้ v1
        alt="Animated Flowers"
        style={{
          position: "absolute",
          height: "100vh",
          width: "auto",
          objectFit: "contain",
          zIndex: 2,
          transition: "all 0.1s ease-in-out", 
        }}
      />
      
      {/* รูปที่ 3 - ชั้นบนสุด */}
      <img
        src={potImg}
        alt="Pots"
        style={{
          position: "absolute",
          height: "100vh",
          width: "auto",
          objectFit: "contain",
          zIndex: 3,
        }}
      />

      {/* ปุ่มลิงก์ */}
      <Link
        to="/choose-template"
        onMouseEnter={() => setIsHover(true)} 
        onMouseLeave={() => setIsHover(false)} 
        style={{
          position: "absolute",
          zIndex: 10, 
          paddingRight: "10px",
          left: "32.5%",
          bottom: "40%", 
          
          // สไตล์พื้นฐาน
          fontFamily: "'Poppins', sans-serif", 
          fontWeight: "700", 
          padding: "5px 50px",
          fontSize: "16px",
          textDecoration: "none",
          borderRadius: "10px",
          transition: "all 0.3s ease", 
          
          
          backgroundColor: isHover ? "black" : "transparent",
          color: isHover ? "white" : "black",
          border: "2px solid black",
          cursor: "pointer",
        }}
      >
        Start
      </Link>
    </div>
  );
}