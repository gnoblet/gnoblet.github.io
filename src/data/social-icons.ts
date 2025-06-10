/* src/types/social-icons.ts */
import { FaGithub, FaLinkedin, FaEnvelope, FaBluesky } from "react-icons/fa6";
import { SocialIcon } from "../types/social-icons";

export const socialIcons: SocialIcon[] = [
  {
    href: "https://bsky.app/profile/gnoblet.bsky.social",
    ariaLabel: "Bluesky",
    Icon: FaBluesky,
  },
  {
    href: "https://github.com/gnoblet",
    ariaLabel: "GitHub",
    Icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/gnoblet/",
    ariaLabel: "LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "mailto:gnoblet@zaclys.net",
    ariaLabel: "Email",
    Icon: FaEnvelope,
  },
];