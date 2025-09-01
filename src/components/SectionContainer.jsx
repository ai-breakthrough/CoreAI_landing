export default function SectionContainer({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-[1040px] px-5 ${className}`}>
      {children}
    </div>
  );
}
