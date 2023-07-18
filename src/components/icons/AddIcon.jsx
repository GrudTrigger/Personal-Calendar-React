const AddIcon = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <rect
        x="1.13751"
        y="0.4189"
        width="23.4435"
        height="23.4435"
        rx="3.75"
        fill="white"
        stroke="#646464"
        strokeWidth="0.5"
      />
      <rect
        x="11.591"
        y="5.25566"
        width="2.53657"
        height="13.7699"
        rx="1.26828"
        fill="#646464"
      />
      <rect
        x="5.9743"
        y="13.4089"
        width="2.53657"
        height="13.7699"
        rx="1.26828"
        transform="rotate(-90 5.9743 13.4089)"
        fill="#646464"
      />
    </svg>
  );
};

export default AddIcon;
