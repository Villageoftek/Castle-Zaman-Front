
import { useEffect, useState } from "react";

type SwitchButtonProps = {
  className?: string;
  value?: boolean;
  onChange?: (value: boolean, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function SwitchButton({ className = "", value, onChange, onClick }: SwitchButtonProps) {
  // Use internal state only if value prop is undefined (uncontrolled mode)
  const [toggle, setToggle] = useState(value ?? false);

  // Sync internal state with value prop when it changes (for controlled mode)
  useEffect(() => {
    if (value !== undefined) {
      setToggle(value);
    }
  }, [value]);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newToggle = !toggle;
    // Update internal state only in uncontrolled mode
    if (value === undefined) {
      setToggle(newToggle);
    }
    // Call onChange with the new toggle state if provided
    if (onChange) {
      onChange(newToggle, event);
    }
    // Call onClick if provided
    if (onClick) {
      onClick(event);
    }
  };
  // console.log("toggle state:", toggle, "value:", value);
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          className={
            "w-11 h-6 rounded-full bg-green-500 relative after:absolute after:left-1/2 after:top-1/2 after:inline-block after:size-5 after:rounded-full after:bg-white after:transition-all after:-translate-y-1/2 " +
            (toggle ? "after:-translate-x-0" : "after:-translate-x-full") + className
            // (className ? ` ${className}` : "")
          }
          onClick={handleToggle}
        />
        <span
          className={` text-gray-700 dark:text-white text-md font-bold`}>
          {toggle ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </>
  );
};
