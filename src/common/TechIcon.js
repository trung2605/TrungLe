import {
  SiSpringboot, SiMysql, SiRedis, SiMongodb, SiDocker, SiNodedotjs,
  SiExpress, SiVite, SiTailwindcss, SiTypescript, SiFirebase, SiFlutter, SiDart,
  SiPostgresql, SiRabbitmq, SiFastapi, SiPython, SiExpo, SiThreedotjs, SiDotnet,
  SiVercel, SiCloudinary, SiJsonwebtokens, SiNestjs, SiNextdotjs, SiFramer,
  SiGooglemaps, SiReact, SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub,
  SiSwagger, SiReactrouter, SiGooglecloud, SiGooglegemini, SiCplusplus, SiN8N,
} from 'react-icons/si';
import { FaJava, FaDatabase, FaServer, FaCode, FaProjectDiagram, FaUsers, FaTools, FaMobileAlt, FaChartLine, FaSitemap, FaMicrochip, FaComments, FaBook } from 'react-icons/fa';

const RULES = [
  [/c\s*\/\s*c\+\+|c\+\+/i, SiCplusplus],
  [/spring/i, SiSpringboot],
  [/java website|servlets?|jsp/i, FaJava],
  [/^java(\s|$|\s21)/i, FaJava],
  [/mysql/i, SiMysql],
  [/sql server/i, FaDatabase],
  [/redis/i, SiRedis],
  [/mongo/i, SiMongodb],
  [/database visualization/i, FaChartLine],
  [/data visualization|data analysis|scientific computing/i, FaChartLine],
  [/neon|postgres|relational db/i, SiPostgresql],
  [/docker/i, SiDocker],
  [/node\.?js/i, SiNodedotjs],
  [/express/i, SiExpress],
  [/vite/i, SiVite],
  [/tailwind/i, SiTailwindcss],
  [/typescript/i, SiTypescript],
  [/firebase|firestore|fcm/i, SiFirebase],
  [/flutter/i, SiFlutter],
  [/riverpod|dart/i, SiDart],
  [/rabbitmq/i, SiRabbitmq],
  [/fastapi/i, SiFastapi],
  [/python/i, SiPython],
  [/expo|react native/i, SiExpo],
  [/three\.?js/i, SiThreedotjs],
  [/\.net/i, SiDotnet],
  [/vercel/i, SiVercel],
  [/cloudinary/i, SiCloudinary],
  [/jwt/i, SiJsonwebtokens],
  [/nestjs/i, SiNestjs],
  [/next\.js/i, SiNextdotjs],
  [/framer/i, SiFramer],
  [/google maps/i, SiGooglemaps],
  [/react router/i, SiReactrouter],
  [/react/i, SiReact],
  [/javascript|\bes6\b/i, SiJavascript],
  [/html/i, SiHtml5],
  [/css/i, SiCss3],
  [/git\b/i, SiGit],
  [/github/i, SiGithub],
  [/swagger|openapi/i, SiSwagger],
  [/gemini|openai|ai (chatbot|agent)/i, SiGooglegemini],
  [/aws|s3|cloudfront/i, SiGooglecloud],
  [/rest(ful)? api/i, FaServer],
  [/websocket|stomp/i, FaServer],
  [/typeorm|mapstruct|data model|monaco/i, FaCode],
  [/tanstack|recharts|zustand|i18next|hook form|dompurify|gsap|pixi/i, FaCode],
  [/mobile|expo/i, FaMobileAlt],
  [/team|leadership|management|community|event production/i, FaUsers],
  [/n8n|make\.com/i, SiN8N],
  [/low-?code|outsystems|automation|scripting|devops/i, FaTools],
  [/data modeling|ui flows|project/i, FaProjectDiagram],
  [/data structure|algorithm|hàm trong code/i, FaSitemap],
  [/phỏng vấn|interview/i, FaComments],
  [/kiến thức khác|intro to web/i, FaBook],
  [/robotics|microchip|sensor/i, FaMicrochip],
];

const cache = new Map();

export const resolveTechIcon = (tech) => {
  if (cache.has(tech)) return cache.get(tech);
  const match = RULES.find(([re]) => re.test(tech));
  const Icon = match ? match[1] : FaCode;
  cache.set(tech, Icon);
  return Icon;
};

const TechIcon = ({ tech, size = 14, style }) => {
  const Icon = resolveTechIcon(tech);
  return <Icon size={size} style={style} aria-hidden="true" />;
};

export default TechIcon;
