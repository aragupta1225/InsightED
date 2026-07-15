import { LogoIcon } from '../../assets/LogoIcon';

const Logo = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-[46px] h-[54px]",
    lg: "w-16 h-20"
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className="flex items-center gap-2">
      <LogoIcon className={sizeClasses[size]} />
      <h1 className={`font-extrabold tracking-tight text-navy ${textClasses[size]}`}>
        InsightED
      </h1>
    </div>
  );
};

export default Logo;
