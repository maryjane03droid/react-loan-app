export default function Modal({ message, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
    textAlign: "center",
  },
};