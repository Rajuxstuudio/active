import { TemplateDB } from "./type";
import Qilixlogo from "@/assets/qilix/QilixLogo.png";
import QilixMockup from "@/assets/qilix/QilixMockup.png";
import QilixTemplete from "@/assets/qilix/QilixTemplete.png";

import Bumpermandi from "@/assets/illustration/BumperMandi.png";
import banking from "@/assets/illustration/Banking.png";
import utility from "@/assets/illustration/utilitygrid.png";

import RecruitEase from "@/assets/logoBento/RecruitEase.png";
import w2wd from "@/assets/logoBento/W2WD.png";
import lenss from "@/assets/logoBento/LENSS.png";

export const templatesDB: TemplateDB[] = [
  {
    name: "Qilix Logo & Branding Kit",
    image: [QilixMockup,Qilixlogo, QilixTemplete],
    colors: ["#A7F3D0", "#6EE7B7"],
    tools: ["figma", "photoshop"],
  },
  {
    name: "LOGO Design",
    image: [RecruitEase, lenss, w2wd],
    colors: ["#BFDBFE", "#383f47ff"],
    tools: ["figma", "canva"],
  },
  {
    name: "Illustration + landing page",
    image: [Bumpermandi, banking, utility],
    colors: ["#FED7AA", "#FDBA74"],
    tools: ["figma", "illustrator"],
  },

];
