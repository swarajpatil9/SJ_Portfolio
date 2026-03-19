import { locations } from "#constants";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";


const projects = locations.work?.children ?? [];

const Home = () => {
    useGSAP(() => {
        Draggable.create(".folder")
    }, []);

  return (
    <section>
        <ul>
            {projects.map((project) => (
                <li key={project.id} className={clsx("group folder" , project.windowPosition)}>
                    <img src="/images/folder.png" alt={project.name}/>
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home
