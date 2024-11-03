

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Image
        src={BackgroundImage}
        alt="Another Cloud Background"
        fill
        quality={100}
        priority
        placeholder="blur"
        className="object-cover object-center -z-10"
      />
      {children}
    </>
  );
};

export default layout;
