import satori, { type SatoriOptions } from "satori";
import { SITE } from "@config";
import { writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

const fetchFonts = async () => {
    const fontFileRegular = await fetch(
        "https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf",
    );
    const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

    const fontFileBold = await fetch(
        "https://api.fontsource.org/v1/fonts/roboto-mono/latin-700-normal.ttf",
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
                color: "#c9acc",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: "1",
                    width: "100%",
                    padding: "40px",
                    justifyContent: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "60px",
                        fontWeight: "bold",
                        color: "black",
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
                    fontSize: "20px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ fontWeight: "600" }}>{SITE.title}</p>
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
            style: "normal",
        },
        {
            name: "Roboto Mono",
            data: fontBold,
            weight: 600,
            style: "normal",
        },
    ],
};

const generateOgImage = async (mytext = SITE.title) => {
    const svg = await satori(ogImage(mytext), options);

    if (import.meta.env.MODE === "production") {
        const resvg = new Resvg(svg);
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();
        const title = mytext.replace(/\s+/g, "-").toLowerCase();
        await writeFile(`./dist/${title}.png`, pngBuffer);
    }

    return svg;
};

export default generateOgImage;
