import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export  const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ||"light");
    useEffect(()=>{
        const htmlElement = document.documentElement;
        htmlElement.setAttribute("data-theme", theme);
        const body = document.body;
        theme === "dark" ? body.classList.add("dark"):body.classList.remove("dark");
        localStorage.setItem("theme", theme);
    },[theme]);
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <ThemeContext.Provider value={{ theme,  toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export default ThemeProvider;