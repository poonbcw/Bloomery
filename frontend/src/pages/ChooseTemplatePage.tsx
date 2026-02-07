import { useState } from "react";
import bouquetImg from "../assets/choose-template/bouquet.png";
import handholdingImg from "../assets/choose-template/handholding.png";
import whitelabelImg from "../assets/choose-template/whitelabel.png";
import heartpointerImg from "../assets/choose-template/heartpointer.png";
import { Link } from "react-router-dom";

export default function ChooseTemplatePage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      style={{
        backgroundColor: "#F3EBD8",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'BioRhyme', serif",
            fontSize: "1.8rem",
            fontWeight: "400",
            color: "#A31616",
            marginBottom: "-35px",
            zIndex: 1,
          }}
        >
          choose your
        </h2>
        <h1
          style={{
            fontFamily: "'Birthstone', cursive",
            fontSize: "5rem",
            fontWeight: "400",
            color: "#A31616",
            margin: 0,
            zIndex: 1,
          }}
        >
          template
        </h1>
      </div>

      <div style={{ position: "relative", flex: 1 }}>
        {/* --- กลุ่มซ้าย (Hand holding) --- */}
        <img
          src={handholdingImg}
          alt="Handholding Template"
          style={{
            position: "absolute",
            height: "clamp(250px, 40vh, 500px)",
            width: "auto",
            top: "35%",
            left: "50%",
            transform:
              "translate(calc(-50% - clamp(150px, 22vw, 400px)), -50%)",
            objectFit: "contain",
            zIndex: 3,
          }}
        />
        <div
          onClick={() => setSelected("handholding")}
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform:
              "translate(calc(-50% - clamp(150px, 22vw, 400px)), calc(-50% + 30vh))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        >
          <img
            src={whitelabelImg}
            alt="Label"
            style={{ width: "clamp(180px, 15vw, 250px)" }}
          />
          <span
            style={{
              position: "absolute",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(14px, 1.2vw, 18px)",
              color: "#000000",
            }}
          >
            Hand holding
          </span>
          {selected === "handholding" && (
            <img
              src={heartpointerImg}
              alt="selected"
              style={{
                position: "absolute",
                width: "40px",
                top: "-15px",
                right: "-10px",
                zIndex: 5,
              }}
            />
          )}
        </div>
        {/* --- กลุ่มขวา (Bouquet) --- */}
        <img
          src={bouquetImg}
          alt="Bouquet Template"
          style={{
            position: "absolute",
            height: "clamp(250px, 40vh, 500px)",
            width: "auto",
            top: "35%",
            left: "50%",
            transform:
              "translate(calc(-50% + clamp(150px, 22vw, 400px)), -50%)",
            objectFit: "contain",
            zIndex: 3,
          }}
        />
        <div
          onClick={() => setSelected("bouquet")}
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform:
              "translate(calc(-50% + clamp(150px, 22vw, 400px)), calc(-50% + 30vh))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        >
          <img
            src={whitelabelImg}
            alt="Label"
            style={{ width: "clamp(180px, 15vw, 250px)" }}
          />
          <span
            style={{
              position: "absolute",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(14px, 1.2vw, 18px)",
              color: "#000000",
            }}
          >
            Bouquet
          </span>
          {selected === "bouquet" && (
            <img
              src={heartpointerImg}
              alt="selected"
              style={{
                position: "absolute",
                width: "40px",
                top: "-15px",
                right: "-10px",
                zIndex: 5,
              }}
            />
          )}
        </div>

        {/* --- ปุ่ม Next --- */}
        <Link
          to={selected ? "/pick-flowers" : "#"}
          onClick={(e) => !selected && e.preventDefault()} // ป้องกันการเปลี่ยนหน้าถ้ายังไม่เลือก
          style={{
            position: "absolute",
            zIndex: 10,
            left: "50%",
            bottom: "10%",
            transform: "translateX(-50%)",

            // สไตล์พื้นฐาน
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "700",
            padding: "12px 60px", // ปรับขนาดให้ใหญ่ขึ้นตามที่คุณต้องการ
            fontSize: "18px",
            textDecoration: "none",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            display: "inline-block", // ทำให้ padding และขนาดแสดงผลถูกต้อง
            textAlign: "center",

            // Logic เปลี่ยนสีตามการเลือก
            backgroundColor: selected ? "black" : "#E0E0E0",
            color: selected ? "white" : "#A0A0A0",
            border: `2px solid ${selected ? "black" : "#E0E0E0"}`,

            // การควบคุมการกด
            cursor: selected ? "pointer" : "not-allowed",
            pointerEvents: selected ? "auto" : "none", // **สำคัญ** ปิดการรับ event ทั้งหมดถ้ายังไม่เลือก
          }}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
