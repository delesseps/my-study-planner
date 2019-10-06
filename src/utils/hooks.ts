import { useState } from "react";

export const useToggle = () => {
    const [toggled, setToggled] = useState(false);
    function toggle() {
        setToggled(!toggled);
    }
    return { toggled, toggle };
}