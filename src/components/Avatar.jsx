import React, { useState, useEffect, useRef } from "react";

/* ---------- SIZE CONSTANTS ---------- */
const HEAD_SIZE = 110;
const EYE_WIDTH = 32;
const EYE_HEIGHT = 36;
const PUPIL_SIZE = 12;
const MAX_OFFSET = 8;
const MAX_TILT = 12;

const Avatar = () => {
  const avatarRef = useRef(null);

  const [leftEye, setLeftEye] = useState("translate(-50%, -50%)");
  const [rightEye, setRightEye] = useState("translate(-50%, -50%)");
  const [tilt, setTilt] = useState("");

  useEffect(() => {
    const handleMove = (e) => {
      if (!avatarRef.current) return;

      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      /* ---------- TILT ---------- */
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const rotateX = Math.max(
        -MAX_TILT,
        Math.min(MAX_TILT, (-dy / rect.height) * MAX_TILT)
      );
      const rotateY = Math.max(
        -MAX_TILT,
        Math.min(MAX_TILT, (dx / rect.width) * MAX_TILT)
      );

      setTilt(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

      /* ---------- EYE MOVEMENT ---------- */
      const movePupil = (eyeCenterX, eyeCenterY) => {
        const ex = e.clientX - eyeCenterX;
        const ey = e.clientY - eyeCenterY;
        const dist = Math.sqrt(ex * ex + ey * ey) || 1;

        return `translate(calc(-50% + ${
          (ex / dist) * MAX_OFFSET
        }px), calc(-50% + ${(ey / dist) * MAX_OFFSET}px))`;
      };

      setLeftEye(movePupil(centerX - 20, centerY - 10));
      setRightEye(movePupil(centerX + 20, centerY - 10));
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={avatarRef} style={{ ...styles.container, transform: tilt }}>
      {/* Hoodie */}
      <div style={styles.hoodie}></div>

      {/* Head */}
      <div style={styles.head}>
        {/* Hair */}
        <div style={styles.hair}></div>

        {/* Eyes */}
        <div style={{ ...styles.eye, left: "25%" }}>
          <div style={{ ...styles.pupil, transform: leftEye }} />
        </div>

        <div style={{ ...styles.eye, right: "25%" }}>
          <div style={{ ...styles.pupil, transform: rightEye }} />
        </div>
      </div>
    </div>
  );
};

/* ---------- STYLES ---------- */
const styles = {
  container: {
    width: 200,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    transition: "transform 0.15s ease",
  },

  head: {
    width: HEAD_SIZE,
    height: HEAD_SIZE,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #fbd3c4, #f7b7a3)",
    position: "relative",
    zIndex: 2,
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  hair: {
    position: "absolute",
    top: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 120,
    height: 55,
    background: "linear-gradient(90deg, #7c3aed, #ec4899)",
    borderRadius: "50px 50px 20px 20px"

  },

  eye: {
    position: "absolute",
    top: "35%",
    width: EYE_WIDTH,
    height: EYE_HEIGHT,
    background: "#ffffff",
    borderRadius: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  pupil: {
    width: PUPIL_SIZE,
    height: PUPIL_SIZE,
    background: "radial-gradient(circle, #0ea5e9, #0369a1)",
    borderRadius: "50%",
    transition: "transform 0.05s linear",
  },

  hoodie: {
    width: 180,
    height: 90,
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    borderRadius: "40px 40px 20px 20px",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
};

export default Avatar;
