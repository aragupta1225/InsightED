const StatCard = ({ icon: Icon, title, value, subValue, subLabel, iconBgClass, iconColorClass, badge }) => {
  return (
    <div className="card-glass card-hover p-5 flex flex-col justify-between min-h-[140px]">
      <div className="flex items-start justify-between">
        <h3 className="text-[13px] font-bold text-text-secondary w-full text-center tracking-wide">{title}</h3>
      </div>
      
      <div className="flex items-center gap-5 mt-3 self-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconBgClass}`}>
          <Icon className={iconColorClass} size={26} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-extrabold text-navy tracking-tight">{value}</p>
          <div className="flex items-center gap-1.5 mt-1">
             {subValue && (
                <span className="text-[11px] font-bold text-success flex items-center gap-0.5">
                  <span className="text-sm leading-none">↗</span> {subValue}
                </span>
             )}
             {subLabel && (
                <span className="text-[11px] font-medium text-text-muted">{subLabel}</span>
             )}
          </div>
        </div>
      </div>

      {badge && (
        <div className="mt-3 flex justify-end w-full">
           <button className="text-[11px] font-bold text-danger bg-danger-light hover:bg-[#F3D5D7] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
            Need attention <span className="text-sm leading-none">&rsaquo;</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default StatCard;
