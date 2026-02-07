interface FlowerProps {
  src: string;
  top: string;
  left: string;
  zIndex: number;
  height?: string;
}

const FlowerItem = ({ src, top, left, zIndex, height = "23vh" }: FlowerProps) => (
  <img
    src={src}
    alt="flower"
    style={{
      height: `clamp(100px, ${height}, 500px)`,
      width: "auto",
      position: "absolute",
      top,
      left,
      objectFit: "contain",
      zIndex,
      cursor: "pointer"
    }}
  />
);

export default FlowerItem;