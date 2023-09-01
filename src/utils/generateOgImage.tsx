import satori, { SatoriOptions } from "satori";
import { SITE } from "@config";
import { writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

const fetchFonts = async () => {
    // Regular Font
    const fontFileRegular = await fetch(
        "https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf"
    );

    const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

    const fontFileBold = await fetch(
        "https://api.fontsource.org/v1/fonts/roboto-mono/latin-700-normal.ttf"
    );
    const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

    return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const ogImage = (text: string) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                background: "#f5f5f5",
                color: "#c9acc"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: "1",
                    width: "100%",
                    padding: "40px",
                    justifyContent: "center"
                }}
            >
                <h1
                    style={{
                        fontSize: "60px",
                        fontWeight: "bold",
                        color: "black"
                    }}
                >
                    {text}
                </h1>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "40px",
                    borderTop: "1px solid",
                    borderColor: "#737373",
                    fontSize: "20px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <svg
                        style={{
                            width: "60px",
                            height: "60px"
                        }}
                        width="260"
                        height="260"
                        viewBox="0 0 260 260"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M44.1732 158.636L30 200.915H58.084L48.1103 230H95.0919L104.541 200.915H58.084L72.2572 158.636H44.1732ZM162.546 30H121.339L162.021 158.636H118.451L104.541 200.915H173.832L183.018 230H230L162.546 30Z"
                            fill="#000"
                        ></path>
                    </svg>

                    <p
                        style={{
                            marginLeft: "12px",
                            fontWeight: "600"
                        }}
                    >
                        {SITE.title}
                    </p>
                </div>
                <p>by {SITE.author}</p>
            </div>
        </div>
    );
};

const options: SatoriOptions = {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: [
        {
            name: "Roboto Mono",
            data: fontRegular,
            weight: 400,
            style: "normal"
        },
        {
            name: "Roboto Mono",
            data: fontBold,
            weight: 600,
            style: "normal"
        }
    ]
};

const generateOgImage = async (mytext = SITE.title) => {
    const svg = await satori(ogImage(mytext), options);

    // render png in production mode
    if (import.meta.env.MODE === "production") {
        const resvg = new Resvg(svg);
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();

        const title = mytext.replace(/\s+/g, "-").toLowerCase();

        console.info("Output PNG Image  :", `${title}.png`);

        await writeFile(`./dist/${title}.png`, pngBuffer);
    }

    return svg;
};

export default generateOgImage;
