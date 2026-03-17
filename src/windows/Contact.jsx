import { socials } from "#constants";
import { WindowControls } from "#components"; 
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
        <div id="window-header">
            <WindowControls target="contact"/>
            <h2>Contact Me</h2>
        </div>

        <div className="p-5 space-y-5">
            <img src="/images/adrian.jpg" alt="Adrian" className="w-20 rounded-full"/>
            <h3>Let's Connect!</h3>
            <p>Got an idea? Want to collaborate? Or just say hello? I'm in!</p>
        </div>

        <ul>
            {socials.map(({ id, bg, link, icon, text }) => (
                <li key={id} style={{ backgroundColor: bg }} >
                    <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                        <img src={icon} alt={text} className="size-5"/>
                        <p>{text}</p>
                    </a>
                </li>
            ))}

        </ul>
    </>
    );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
