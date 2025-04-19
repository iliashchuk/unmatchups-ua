export const HomeButton = () => (
  <h3
    style={{ cursor: "pointer" }}
    onClick={() => {
      window.location.replace("/");
    }}
  >
    Unmatchups
  </h3>
);
