import React, { useRef, useEffect } from "react";
import { Eye, Pencil, Mail, Trash2, MoreHorizontal } from "lucide-react";

const iconMap = {
  view: Eye,
  edit: Pencil,
  email: Mail,
  delete: Trash2,
};

export default function ActionsMenu({ isOpen, onToggle, actions, showIcons = true, customTrigger }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (isOpen) onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={menuRef}>
      {customTrigger ? (
        <div onClick={onToggle} className="cursor-pointer">{customTrigger}</div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 
            ${isOpen 
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 ring-2 ring-blue-100 dark:ring-blue-900/50' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300'
            }`}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <div className="py-1">
            {actions.map((action, index) => {
              let Icon = null;
              if (showIcons && action.icon) {
                 if (typeof action.icon === 'string') {
                     Icon = iconMap[action.icon];
                 } else {
                     Icon = action.icon;
                 }
              }

              const isDestructive = action.danger;
              
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                    onToggle();
                  }}
                  className={`group flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150
                    ${action.className || ''}
                    ${isDestructive
                      ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400"
                    }
                  `}
                >
                  {Icon && (
                    <span className={`flex items-center justify-center ${
                      isDestructive 
                        ? "text-red-500 group-hover:text-red-600 dark:text-red-400" 
                        : "text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400"
                    }`}>
                      {React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
                    </span>
                  )}
                  <span className="font-medium">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
