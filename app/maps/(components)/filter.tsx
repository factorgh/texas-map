import React from "react";

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

function Filter({ setSelectedCategory }: Props) {
  const categories = ["Pit", "Trench", "Well"];
  // const [theme, setTheme] = React.useState("dark-theme");

  // React.useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);

  // const changeTheme = () => {
  //   setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  // };

  return (
    <div className="flex items-center space-x-4">
      {/* Category Select */}
      <div className="relative inline-block">
        <select
          title="Select"
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none w-full bg-slate-700 text-white border border-gray-600 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Filter;
