import React from "react"
import {
    siApachemaven,
    siBootstrap,
    siCss,
    siGit,
    siGithub,
    siGithubactions,
    siHtml5,
    siIntellijidea,
    siJavascript,
    siJquery,
    siMysql,
    siNextdotjs,
    siOpenjdk,
    siPostgresql,
    siPostman,
    siReact,
    siSpring,
    siSpringsecurity,
    siSwagger,
    siTailwindcss,
    siTanstack,
    siTypescript,
    siWebstorm,
    type SimpleIcon,
} from "simple-icons"

// Common icon container style
const IconWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => (
    <div
        className={`flex h-full w-full items-center justify-center transition-all duration-300 group-hover:scale-110 ${className || ""}`}
    >
        {children}
    </div>
)

function SimpleBrandIcon({
    icon,
    lightTile = false,
}: {
    icon: SimpleIcon
    lightTile?: boolean
}) {
    return (
        <IconWrapper>
            <svg
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                fill="currentColor"
                aria-hidden="true"
                className={lightTile ? "rounded-[4px] bg-white p-1" : undefined}
                style={{ color: `#${icon.hex}` }}
            >
                <path d={icon.path} />
            </svg>
        </IconWrapper>
    )
}

const simpleBrand = (icon: SimpleIcon, lightTile = false): React.FC => {
    const BrandIcon: React.FC = () => (
        <SimpleBrandIcon icon={icon} lightTile={lightTile} />
    )
    BrandIcon.displayName = `${icon.title}Icon`
    return BrandIcon
}

// Next.js Icon
export const NextJsIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_nextjs"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="180"
                height="180"
            >
                <circle cx="90" cy="90" r="90" fill="black" />
            </mask>
            <g mask="url(#mask0_nextjs)">
                <circle
                    cx="90"
                    cy="90"
                    r="87"
                    fill="black"
                    stroke="#333"
                    strokeWidth="6"
                />
                <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="white"
                />
                <rect x="115" y="54" width="12" height="72" fill="white" />
            </g>
        </svg>
    </IconWrapper>
)

// React Icon
export const ReactIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 569 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M285.5,201 C255.400481,201 231,225.400481 231,255.5 C231,285.599519 255.400481,310 285.5,310 C315.599519,310 340,285.599519 340,255.5 C340,225.400481 315.599519,201 285.5,201 M568.959856,255.99437 C568.959856,213.207656 529.337802,175.68144 466.251623,150.985214 C467.094645,145.423543 467.85738,139.922107 468.399323,134.521063 C474.621631,73.0415145 459.808523,28.6686204 426.709856,9.5541429 C389.677085,-11.8291748 337.36955,3.69129898 284.479928,46.0162134 C231.590306,3.69129898 179.282771,-11.8291748 142.25,9.5541429 C109.151333,28.6686204 94.3382249,73.0415145 100.560533,134.521063 C101.102476,139.922107 101.845139,145.443621 102.708233,151.02537 C97.4493791,153.033193 92.2908847,155.161486 87.3331099,157.39017 C31.0111824,182.708821 0,217.765415 0,255.99437 C0,298.781084 39.6220545,336.307301 102.708233,361.003527 C101.845139,366.565197 101.102476,372.066633 100.560533,377.467678 C94.3382249,438.947226 109.151333,483.32012 142.25,502.434597 C153.629683,508.887578 166.52439,512.186771 179.603923,511.991836 C210.956328,511.991836 247.567589,495.487529 284.479928,465.972527 C321.372196,495.487529 358.003528,511.991836 389.396077,511.991836 C402.475265,512.183856 415.36922,508.884856 426.75,502.434597 C459.848667,483.32012 474.661775,438.947226 468.439467,377.467678 C467.897524,372.066633 467.134789,366.565197 466.291767,361.003527 C529.377946,336.347457 569,298.761006 569,255.99437"
                fill="#58C4DC"
            />
        </svg>
    </IconWrapper>
)

// TanStack Icon
export const TanStackIcon = () => (
    <IconWrapper>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 633 633"
        >
            <circle cx="316.5" cy="316.5" r="316.5" fill="#FF4154" />
            <path d="M316.5 150L450 450H183L316.5 150Z" fill="white" />
        </svg>
    </IconWrapper>
)

// CSS icon
export const CssIcon = () => (
    <IconWrapper>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 512 512"
        >
            <path
                fill="#264de4"
                d="M71.357 460.819 30.272 0h451.456l-41.129 460.746L255.724 512z"
            />
            <path
                fill="#2965f1"
                d="m405.388 431.408 35.148-393.73H256v435.146z"
            />
            <path
                fill="#fff"
                d="M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z"
            />
        </svg>
    </IconWrapper>
)

// JavaScript icon
export const JavaScriptIcon = () => (
    <IconWrapper>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 1052 1052"
        >
            <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
            <path
                d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101z"
                fill="#323330"
            />
        </svg>
    </IconWrapper>
)

// TypeScript icon
export const TypeScriptIcon = () => (
    <IconWrapper>
        <svg
            viewBox="0 0 256 256"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
                fill="#3178C6"
            />
            <path
                d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
                fill="#FFF"
            />
        </svg>
    </IconWrapper>
)

// HTML icon
export const HtmlIcon = () => (
    <IconWrapper>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 452 520"
        >
            <path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52" />
            <path fill="#ef652a" d="M226 472l149-41 35-394H226" />
            <path
                fill="#ecedee"
                d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"
            />
            <path
                fill="#fff"
                d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"
            />
        </svg>
    </IconWrapper>
)

// Java icon
export const JavaIcon = () => (
    <IconWrapper>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 256 346"
        >
            <path
                d="M83 267s-14 8 9 11c27 3 41 2 71-3 0 0 8 5 19 9-67 29-153-2-99-17M74 230s-15 11 8 13c29 3 52 3 92-4 0 0 6 5 15 8-82 24-173 2-115-17"
                fill="#5382A1"
            />
            <path
                d="M144 166c17 19-4 36-4 36s42-22 22-49c-18-26-32-38 44-82 0 0-119 29-62 95"
                fill="#E76F00"
            />
            <path
                d="M233 295s10 8-10 15c-39 12-163 15-197 0-12-5 11-13 18-14l12-2c-14-9-89 19-38 28 138 22 251-10 215-27M89 190s-63 15-22 21c17 2 51 2 83-1 26-2 52-7 52-7l-16 9c-64 16-187 8-151-9 30-14 54-13 54-13M202 253c64-33 34-66 13-61l-7 2s2-3 6-5c41-14 73 43-14 66l2-2"
                fill="#5382A1"
            />
            <path
                d="M162 0s36 36-34 91c-56 45-12 70 0 99-32-30-56-56-40-80 23-35 89-53 74-110"
                fill="#E76F00"
            />
            <path
                d="M95 345c62 4 158-3 160-32 0 0-4 11-51 20-53 10-119 9-158 2 0 0 8 7 49 10"
                fill="#5382A1"
            />
        </svg>
    </IconWrapper>
)

// Spring Icon
export const SpringIcon = () => (
    <IconWrapper>
        <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <path
                d="M58.2 3.365a29.503 29.503 0 0 1-3.419 6.064A32.094 32.094 0 1 0 9.965 55.372l1.186 1.047a32.08 32.08 0 0 0 52.67-22.253c.875-8.17-1.524-18.51-5.62-30.8zM14.53 55.558a2.744 2.744 0 1 1-.404-3.857 2.744 2.744 0 0 1 .404 3.857zm43.538-9.61c-7.92 10.55-24.83 6.99-35.672 7.502 0 0-1.922.113-3.857.43 0 0 .73-.31 1.663-.663 7.614-2.65 11.213-3.16 15.838-5.54 8.708-4.427 17.322-14.122 19.112-24.2-3.313 9.695-13.373 18.032-22.53 21.418-6.276 2.313-17.614 4.566-17.614 4.566l-.457-.245c-7.714-3.75-7.952-20.457 6.077-25.845 6.143-2.366 12.02-1.067 18.654-2.65 7.084-1.683 15.28-6.99 18.615-13.916 3.73 11.08 8.224 28.422.166 39.15z"
                fill="#68bd45"
            />
        </svg>
    </IconWrapper>
)

// Spring Security Icon — Spring-green shield so it reads as part of the Spring
// family while keeping a silhouette distinct from the plain leaf.
export const SpringSecurityIcon = () => (
    <IconWrapper>
        <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <path
                d="M32 4 6 13v18c0 14.6 10.6 24.6 26 29 15.4-4.4 26-14.4 26-29V13L32 4z"
                fill="#68bd45"
            />
            <circle cx="32" cy="26" r="6" fill="#fff" />
            <path d="M29 30h6l2 14H27l2-14z" fill="#fff" />
        </svg>
    </IconWrapper>
)

// Spring Data JPA Icon — Spring-green datastore, distinct from the plain leaf.
export const SpringDataIcon = () => (
    <IconWrapper>
        <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
        >
            <path
                d="M12 16v30c0 4.4 9 8 20 8s20-3.6 20-8V16H12z"
                fill="#68bd45"
            />
            <ellipse cx="32" cy="16" rx="20" ry="8" fill="#8fd46f" />
            <path
                d="M12 28c3.6 3.3 11 5.5 20 5.5S48.4 31.3 52 28M12 40c3.6 3.3 11 5.5 20 5.5S48.4 43.3 52 40"
                stroke="#fff"
                strokeWidth="2.5"
                fill="none"
            />
        </svg>
    </IconWrapper>
)

// PostgreSQL Icon
export const PostgreSQLIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 264 264"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M237.906 160.722c-29.74 6.135-31.785-3.934-31.785-3.934 31.4-46.593 44.527-105.736 33.2-120.211-30.904-39.485-84.399-20.811-85.292-20.327l-.287.052c-5.876-1.22-12.451-1.946-19.842-2.067-13.456-.22-23.664 3.528-31.41 9.402 0 0-95.43-39.314-90.991 49.444.944 18.882 27.064 142.873 58.218 105.422 11.387-13.695 22.39-25.274 22.39-25.274 5.464 3.63 12.006 5.482 18.864 4.817l.533-.452c-.166 1.7-.09 3.363.213 5.332-8.026 8.967-5.667 10.541-21.711 13.844-16.235 3.346-6.698 9.302-.471 10.86 7.549 1.887 25.013 4.561 36.813-11.958l-.47 1.885c3.144 2.519 5.352 16.383 4.982 28.952-.37 12.568-.617 21.197 1.86 27.937 2.479 6.74 4.948 21.905 26.04 17.386 17.623-3.777 26.756-13.564 28.027-29.89.901-11.606 2.942-9.89 3.07-20.267l1.637-4.912c1.887-15.733.3-20.809 11.157-18.448l2.64.232c7.99.363 18.45-1.286 24.589-4.139 13.218-6.134 21.058-16.377 8.024-13.686h.002"
                fill="#336791"
            />
        </svg>
    </IconWrapper>
)

// MySQL Icon
export const MySqlIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                fill="#00758F"
            />
            <path
                d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
                fill="#F29111"
            />
        </svg>
    </IconWrapper>
)

// Oracle Icon
export const OracleIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 6.341c-7.382 0-13.385 4.312-13.385 9.63 0 5.319 6.002 9.63 13.385 9.63 7.382 0 13.385-4.311 13.385-9.63 0-5.318-6.003-9.63-13.385-9.63zm0 15.19c-4.249 0-7.706-2.484-7.706-5.56s3.457-5.56 7.706-5.56c4.25 0 7.708 2.484 7.708 5.56s-3.458 5.56-7.708 5.56z"
                fill="#F80000"
            />
        </svg>
    </IconWrapper>
)

// Bootstrap Icon
export const BootstrapIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.417 12c0 1.583-1.25 2.583-2.917 2.583H9.5V9.417h3.333c1.5 0 2.584.833 2.584 2.583zm-3.334-5.25H9.5V4h2.917c1.333 0 2.333.667 2.333 1.917 0 1.25-1 1.833-2.333 1.833M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.833 15.583c0 2.417-2.083 3.667-5 3.667H7.333V2.75h5c2.584 0 4.584 1 4.584 3.25 0 1.583-1 2.583-2.334 3 1.834.417 3.25 1.583 3.25 3.583z"
                fill="#7952B3"
            />
        </svg>
    </IconWrapper>
)

// MyBatis does not currently have a Simple Icons entry, so keep a compact
// database-mapper mark instead of showing a text-only placeholder.
export const MyBatisIcon = () => (
    <IconWrapper>
        <svg
            viewBox="0 0 64 64"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 16c0-4.4 9-8 20-8s20 3.6 20 8v32c0 4.4-9 8-20 8s-20-3.6-20-8V16Z"
                fill="#2F6DB2"
            />
            <ellipse cx="32" cy="16" rx="20" ry="8" fill="#5C9BD5" />
            <path
                d="M12 28c0 4.4 9 8 20 8s20-3.6 20-8M12 40c0 4.4 9 8 20 8s20-3.6 20-8"
                stroke="#fff"
                strokeWidth="3"
            />
            <path
                d="m23 22 5 6 6-8 7 9"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </IconWrapper>
)

// Tailwind Icon
export const TailwindIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.001 6.338c-2.446 0-3.669 1.223-3.669 3.669 0 2.446 1.223 3.669 3.669 3.669 2.446 0 3.669-1.223 3.669-3.669 0-2.446-1.223-3.669-3.669-3.669z"
                fill="#38BDF8"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14z"
                fill="#38BDF8"
            />
        </svg>
    </IconWrapper>
)

// Git Icon
export const GitIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.325 10.56l8.108-8.108a1.53 1.53 0 012.164 0l8.108 8.108a1.53 1.53 0 010 2.164l-8.108 8.108a1.53 1.53 0 01-2.164 0l-8.108-8.108a1.53 1.53 0 010-2.164z"
                fill="#F05032"
            />
            <circle cx="12" cy="12" r="3" fill="white" />
        </svg>
    </IconWrapper>
)

// GitHub Icon
export const GitHubIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.44-1.304.806-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    </IconWrapper>
)

// IntelliJ Icon
export const IntellijIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M256 68.2l-4.6 148.3-98.6 39.5-53.7-34.7z"
                fill="#087CFA"
            />
            <path d="M49.1 48h160v160h-160z" fill="black" />
            <path
                d="M69 177.8h60v10H69v-10ZM99 79V68H69.2v11h8.4v37.7h-8.4v11H99v-11h-8.3V79H99Zm28.5 49.4.2.1c-4.1.2-8.1-.8-11.8-2.6a27 27 0 0 1-7.7-6.3l8.2-9.2c1.5 1.7 3.2 3.1 5.2 4.3 1.7 1.1 3.7 1.7 5.7 1.6 2.2.2 4.3-.7 5.8-2.3a11 11 0 0 0 2.2-7.5V68h13.3v39a27 27 0 0 1-1.5 9.4c-1.7 5-5.7 9-10.8 10.6-2.8 1-5.8 1.5-8.8 1.4Z"
                fill="#FFF"
            />
        </svg>
    </IconWrapper>
)

// WebStorm Icon
export const WebStormIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect fill="#000000" x="48" y="48" width="160" height="160" />
            <path
                d="M63.2,178 L123.2,178 L123.2,188 L63.2,188 L63.2,178 Z M141.6,125.6 L150,115.2 C156,120 162,123.2 169.6,123.2 C175.6,123.2 179.2,120.8 179.2,116.8 C179.2,113.2 176.8,111.2 166,108.4 C152.8,104.8 144.4,101.2 144.4,88 L144.4,87.6 C144.4,75.6 154,67.6 167.2,67.6 C176.04879,67.5627811 184.649333,70.5236236 191.6,76 L184,87.2 C179.170815,83.4261245 173.316089,81.1957528 167.2,80.8 C162,80.8 158.8,83.2 158.8,86.8 C158.8,91.2 161.6,92.8 172.8,95.6 C186,99.2 193.6,104 193.6,115.6 C193.6,128.8 183.6,136.4 169.6,136.4 C159.323641,136.02223 149.468301,132.220884 141.6,125.6 Z M128.8,68.8 L118.8,107.2 L107.6,68.8 L96.4,68.8 L85.2,107.2 L75.2,68.8 L59.6,68.8 L78.8,135.2 L91.2,135.2 L102,96.8 L112.8,135.2 L125.2,135.2 L144.4,68.8 L128.8,68.8 Z"
                fill="#FFFFFF"
            />
        </svg>
    </IconWrapper>
)

// Postman Icon
export const PostmanIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="12" fill="#FF6C37" />
            <path
                d="M17.813 8.427a5.897 5.897 0 1 0-9.632 6.79.396.396 0 0 1 .062.223v.75a.4.4 0 0 0 .4.4h1.363a.4.4 0 0 0 .4-.4v-.324a.15.15 0 0 1 .173-.148 5.9 5.9 0 0 0 7.234-7.291z"
                fill="#fff"
            />
            <path
                d="M10.606 13.44a.15.15 0 0 1-.212 0l-1.834-1.834a.15.15 0 0 1 0-.212l3.535-3.535a.15.15 0 0 1 .212 0l1.834 1.834a.15.15 0 0 1 0 .212l-3.535 3.535z"
                fill="#FF6C37"
            />
        </svg>
    </IconWrapper>
)

// Swagger Icon
export const SwaggerIcon = () => (
    <IconWrapper>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="12" fill="#85EA2D" />
            <path
                d="M12 4.5c-3.5 0-5.2 1.9-5.2 4.4 0 1.7.9 2.9 2.5 3.5-1.3.4-1.9 1.2-1.9 2.3 0 1.5 1.2 2.4 3.1 2.4.6 0 1.2-.1 1.7-.3v-1.4c-.4.2-.9.3-1.4.3-1 0-1.6-.4-1.6-1.2 0-.9.7-1.4 2.1-1.4h.9v-1.4h-.8c-1.3 0-2-.6-2-1.7 0-1.2.9-1.9 2.4-1.9.6 0 1.1.1 1.5.3V6.6a5 5 0 0 0-1.3-.2z"
                fill="#1a1a1a"
            />
            <circle cx="12" cy="18.2" r="1" fill="#1a1a1a" />
        </svg>
    </IconWrapper>
)

// Compact brand marks used by the icon-only skills carousel.
export const JQueryIcon = () => (
    <IconWrapper>
        <svg
            viewBox="0 0 64 64"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 13c-4 17 7 33 25 35 8 1 15-1 20-5-6 8-17 12-28 10C9 50-1 33 5 18c1-2 3-4 5-5Z"
                fill="#0769AD"
            />
            <path
                d="M18 9c-3 12 5 24 18 27 7 1 13 0 18-3-5 6-13 9-21 7C19 37 11 24 15 13l3-4Z"
                fill="#7ACEF4"
            />
            <path
                d="M29 7c-2 8 4 16 13 18 5 1 9 0 12-2-3 5-9 7-15 5-9-2-15-10-13-18l3-3Z"
                fill="#0769AD"
            />
        </svg>
    </IconWrapper>
)

export const RestApiIcon = () => (
    <IconWrapper className="text-sky-400">
        <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="5" cy="12" r="2.5" />
            <circle cx="19" cy="6" r="2.5" />
            <circle cx="19" cy="18" r="2.5" />
            <path d="m7.3 11 9.3-4M7.3 13l9.3 4" />
        </svg>
    </IconWrapper>
)

export const MavenIcon = () => (
    <IconWrapper>
        <svg
            viewBox="0 0 64 64"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="maven-gradient"
                    x1="8"
                    y1="6"
                    x2="54"
                    y2="58"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F05A28" />
                    <stop offset=".5" stopColor="#B51F5A" />
                    <stop offset="1" stopColor="#6D308A" />
                </linearGradient>
            </defs>
            <path
                d="M8 50 17 9h11l5 25L45 9h11l-9 41h-9l5-25-11 25h-8l-4-25-5 25H8Z"
                fill="url(#maven-gradient)"
            />
        </svg>
    </IconWrapper>
)

export const SqlIcon = () => (
    <IconWrapper className="text-cyan-400">
        <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        >
            <ellipse cx="12" cy="5" rx="7.5" ry="3" />
            <path d="M4.5 5v7c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5M4.5 12v7c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-7" />
        </svg>
    </IconWrapper>
)

// Fallback Icon (Code icon)
export const CodeIcon = () => (
    <IconWrapper className="text-zinc-400">
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
    </IconWrapper>
)

export const TechIcons: Record<string, React.FC> = {
    HTML: simpleBrand(siHtml5),
    CSS: simpleBrand(siCss),
    JavaScript: simpleBrand(siJavascript),
    jQuery: simpleBrand(siJquery),
    TypeScript: simpleBrand(siTypescript),
    React: simpleBrand(siReact),
    "Next.js": simpleBrand(siNextdotjs, true),
    "TanStack Query": simpleBrand(siTanstack),
    "Tailwind CSS": simpleBrand(siTailwindcss),
    Java: simpleBrand(siOpenjdk),
    "Java 8+": simpleBrand(siOpenjdk),
    "Spring Boot": simpleBrand(siSpring),
    "Spring Security": simpleBrand(siSpringsecurity),
    "Spring Data JPA": SpringDataIcon,
    MyBatis: MyBatisIcon,
    "REST APIs": RestApiIcon,
    Maven: simpleBrand(siApachemaven),
    SQL: SqlIcon,
    PostgreSQL: simpleBrand(siPostgresql),
    MySQL: simpleBrand(siMysql),
    Oracle: OracleIcon,
    Bootstrap: simpleBrand(siBootstrap),
    Git: simpleBrand(siGit),
    GitHub: simpleBrand(siGithub, true),
    "DevOps Fundamentals": simpleBrand(siGithubactions),
    "IntelliJ IDEA": simpleBrand(siIntellijidea),
    WebStorm: simpleBrand(siWebstorm),
    Postman: simpleBrand(siPostman),
    Swagger: simpleBrand(siSwagger),
}
