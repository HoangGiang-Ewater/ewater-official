const blurSlideUp = {
  initial: { opacity: 0, y: 100, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0)" },
  transition: { duration: 0.5, ease: "easeInOut" },
  viewport: { margin: "300px 0px 0px 0px", once: true },
};

const blur = {
  initial: { opacity: 0, filter: "blur(10px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.2 },
};

export { blurSlideUp, blur };
