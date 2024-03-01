const esbuild = require("esbuild");

esbuild
    .build({
        entryPoints: ["./dist/index.js"], // Your entry file
        bundle: true,
        platform: "node",
        minify: true,
        outdir: "out", // Output directory
        plugins: [], // Add any plugins you need
        logLevel: "info", // Adjust log level as needed
        write: true, // Write to outdir
        external: [],
    })
    .catch(() => process.exit(1));
