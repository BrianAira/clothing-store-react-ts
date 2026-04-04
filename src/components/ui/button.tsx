import {Loader2} from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: "primary"|"secondary"| "danger"|"ghost"|"default"|"special";
    isLoading?:boolean;
}

export function Button({
    children, 
    variant="primary", 
    isLoading=false,
    className="",
    ...props
}:ButtonProps){
    const base="inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";
     
    const variants={
        special:"bg-red-500 text-gray-100 w-max py-4 px-12 rounded-full",
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        default:"hover:text-indigo-600 transition focus:outline-none",
        // ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
        ghost: "text-gray-600 hover:text-indigo-600",
  };
    return(
        <button
      
        className={`${base} ${variants[variant]} ${className}`}
        {...props}>

            {isLoading&&<Loader2 className="mr-2 h-5 w-5 animate-spin "/>}
            {children}
        </button>
    )
}