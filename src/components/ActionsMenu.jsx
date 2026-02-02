import React, { useState } from "react";
import { Eye, Pencil, Mail, Trash2, MoreHorizontal } from "lucide-react";

const iconMap = {
  view: Eye,
  edit: Pencil,
  email: Mail,
  delete: Trash2,
};

export default function ActionsMenu({ isOpen, onToggle, actions, showIcons = true }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          {actions.map((action, index) => {
            const Icon = showIcons && action.icon ? iconMap[action.icon] : null;
            return (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  onToggle();
                }}
                className={`flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  action.danger ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" : ""
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
