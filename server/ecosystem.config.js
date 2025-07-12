module.exports = {
    apps: [
        {
            name: "miro",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
            }
        }
    ]
}