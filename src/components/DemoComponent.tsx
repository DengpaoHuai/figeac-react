type DemoComponentProps = {
  content: {
    title: string;
    content: string;
  };
  title?: string;
  children?: React.ReactNode;
};

const DemoComponent = ({
  title = "Default title",
  content,
  children,
}: DemoComponentProps) => {
  console.log("coucou");
  return (
    <>
      <h1>{title}</h1>
      <p>{content.content}</p>
      {children}
    </>
  );
};

export default DemoComponent;
