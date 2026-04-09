import { locations } from "#constants";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/draggable";
import gsap from "gsap";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

gsap.registerPlugin(Draggable);

const projects = locations.work?.children ?? [];
const DESKTOP_POSITIONS_KEY = "desktop-project-positions";

const getSavedPositions = () => {
    if (typeof window === "undefined") return {};

    try {
        const raw = window.localStorage.getItem(DESKTOP_POSITIONS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

const savePosition = (projectId, x, y) => {
    if (typeof window === "undefined") return;

    const saved = getSavedPositions();
    saved[projectId] = { x, y };
    window.localStorage.setItem(DESKTOP_POSITIONS_KEY, JSON.stringify(saved));
};

const Home = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocation } = useLocationStore();

    const openProject = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    };

    useGSAP(() => {
        const savedPositions = getSavedPositions();
        const draggables = Draggable.create(".desktop-folder", {
            bounds: "body",
            dragClickables: false,
            onPress() {
                this.target.style.zIndex = "20";
            },
            onRelease() {
                this.target.style.zIndex = "0";
            },
            onDragEnd() {
                const { projectId } = this.target.dataset;
                if (!projectId) return;
                savePosition(projectId, this.x, this.y);
            },
        });

        draggables.forEach((draggable) => {
            const { projectId } = draggable.target.dataset;
            const saved = projectId ? savedPositions[projectId] : null;

            if (!saved) return;
            gsap.set(draggable.target, { x: saved.x, y: saved.y });
            draggable.update();
        });

        return () => {
            draggables.forEach((draggable) => draggable.kill());
        };
    }, []);

  return (
    <section id="home">
        <ul>
            {projects.map((project) => (
                <li
                    key={project.id}
                    data-project-id={project.id}
                    className={clsx("group desktop-folder", project.position)}
                    onDoubleClick={() => openProject(project)}
                >
                    <img src="/images/folder.png" alt={project.name}/>
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home
