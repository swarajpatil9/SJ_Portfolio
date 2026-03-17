import { WindowControls } from "#components"
import { Search } from "lucide-react"
import WindowWrapper from "#hoc/WindowWrapper"
import { locations } from "#constants/index.js"
import useLocationStore from "#store/location.jsx"
import useWindowStore from "#store/window.jsx"
import clsx from "clsx"

const Finder = () => {
    const { openWindow } = useWindowStore();

    const { activeLocation, setActiveLocation } = useLocationStore();

    const openItem = (item) => {
        if (item.fileType === "pdf") return openWindow("resume");
        if (item.kind === "folder") return setActiveLocation(item);
        if (["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "_blank");

        const windowKey = `${item.fileType}${item.kind}`;
        return openWindow(windowKey, item)
    };

    const renderList = (title, items) => (
        <div>
            <h3>{title}</h3>
            <ul>
            {items.map((item) => (
                <li key={item.id} onClick={() => setActiveLocation(item)} className={clsx( item.id ===activeLocation.id ? "active" : "not-active" ,)}>
                    <img src={item.icon} className="w-4" alt = {item.name}  />
                    <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
            ))}
            </ul>
        </div>
    );

    return (
    <>
        <div id="window-header">
            <WindowControls target="finder" />
            <Search className="icon" />
        </div>

        <div className="bg-white flex h-full">
            <div className="sidebar">
                {renderList("Locations", Object.values(locations))}
                {renderList("Work", locations.work.children)}
            </div>

            <ul className="content">
                {activeLocation?.children.map((item) => (
                    <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                        <img src={item.icon} alt = {item.name} className="w-6" />
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
}
 

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
