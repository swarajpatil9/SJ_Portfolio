import { socials } from "#constants";
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper";
import { WINDOW_IDS } from "../config/windowIds";

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target={WINDOW_IDS.CONTACT} />
                <h2>Contact Me</h2>
            </div>

            <div className="px-4 pt-4 pb-3 space-y-2">
                <img src="/images/adrian.jpg" alt="Adrian" className="w-14 rounded-full" loading="lazy" />
                <h3>Let's Connect!</h3>
                <p>Got an idea? Want to collaborate? Or just say hello? I'm in!</p>
            </div>

            <ul>
                {socials.map(({ id, bg, link, icon, text }) => (
                    <li key={id} style={{ backgroundColor: bg }}>
                        <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                            <img src={icon} alt={text} className="size-5" />
                            <p>{text}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, WINDOW_IDS.CONTACT);
export default ContactWindow;
